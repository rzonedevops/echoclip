/**
 * DteLocalAdapter — Server-side Paperclip adapter for DTE cognitive agents.
 *
 * Implements the Paperclip adapter interface, translating task heartbeats into
 * DTE cognitive cycle requests over a local WebSocket connection to the
 * echo-adventure runtime.
 */

import WebSocket from 'ws';
import type {
  DteAdapterConfig,
  DteCognitivePayload,
  DteCognitiveResponse,
  DteWsMessage,
} from '../types.js';

/** Default configuration values */
const DEFAULTS: Partial<DteAdapterConfig> = {
  runtimeUrl: 'ws://localhost:8765',
  timeoutMs: 30_000,
  autognosisSubsystem: 'RESERVOIR',
};

/**
 * DteLocalAdapter bridges Paperclip's task execution model to the Deep Tree Echo
 * cognitive runtime. Each task heartbeat triggers a full cognitive cycle in the
 * DTE agent, and the response is returned as the task output.
 *
 * The adapter maintains a persistent WebSocket connection to the DTE runtime
 * and handles reconnection automatically.
 */
export class DteLocalAdapter {
  private config: DteAdapterConfig;
  private ws: WebSocket | null = null;
  private pendingRequests = new Map<string, {
    resolve: (r: DteCognitiveResponse) => void;
    reject: (e: Error) => void;
    timer: NodeJS.Timeout;
  }>();

  constructor(config: Partial<DteAdapterConfig> & { agentSlug: string }) {
    this.config = { ...DEFAULTS, ...config } as DteAdapterConfig;
  }

  /** Connect to the DTE runtime WebSocket. */
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.config.runtimeUrl);

      this.ws.on('open', () => {
        console.log(`[DteLocalAdapter] Connected to DTE runtime at ${this.config.runtimeUrl}`);
        resolve();
      });

      this.ws.on('message', (data: WebSocket.RawData) => {
        try {
          const msg: DteWsMessage = JSON.parse(data.toString());
          this.handleMessage(msg);
        } catch (e) {
          console.error('[DteLocalAdapter] Failed to parse message:', e);
        }
      });

      this.ws.on('error', (err) => {
        console.error('[DteLocalAdapter] WebSocket error:', err.message);
        reject(err);
      });

      this.ws.on('close', () => {
        console.log('[DteLocalAdapter] Connection closed. Reconnecting in 5s...');
        setTimeout(() => this.connect().catch(console.error), 5_000);
      });
    });
  }

  /** Execute a Paperclip task by sending it as a DTE cognitive cycle request. */
  async executeTask(taskId: string, prompt: string, telemetry?: Record<string, number>): Promise<DteCognitiveResponse> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      await this.connect();
    }

    const payload: DteCognitivePayload = {
      taskId,
      prompt,
      telemetry,
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(taskId);
        reject(new Error(`DTE cognitive cycle timed out after ${this.config.timeoutMs}ms for task ${taskId}`));
      }, this.config.timeoutMs);

      this.pendingRequests.set(taskId, { resolve, reject, timer });

      const msg: DteWsMessage = {
        type: 'cognitive_request',
        payload,
      };

      this.ws!.send(JSON.stringify(msg));
    });
  }

  /** Handle incoming WebSocket messages from the DTE runtime. */
  private handleMessage(msg: DteWsMessage): void {
    if (msg.type === 'cognitive_response') {
      const response = msg.payload as DteCognitiveResponse;
      const pending = this.pendingRequests.get(response.taskId);
      if (pending) {
        clearTimeout(pending.timer);
        this.pendingRequests.delete(response.taskId);
        pending.resolve(response);
      }
    } else if (msg.type === 'error') {
      console.error('[DteLocalAdapter] Runtime error:', msg.payload);
    }
  }

  /** Gracefully close the WebSocket connection. */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
