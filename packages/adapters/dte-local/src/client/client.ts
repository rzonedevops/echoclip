/**
 * DteLocalClient — A lightweight client for interacting with the DTE Runtime Bridge.
 *
 * This client is used by the Paperclip server to submit tasks to the DTE
 * cognitive runtime and retrieve results. It wraps the DteLocalAdapter with
 * a higher-level API that maps directly to Paperclip's task model.
 */

import { DteLocalAdapter } from '../server/adapter.js';
import type { DteAdapterConfig, DteCognitiveResponse } from '../types.js';

/**
 * DteLocalClient provides a simple interface for Paperclip to interact with
 * DTE cognitive agents. It manages a pool of adapters (one per agent slug)
 * and routes tasks to the appropriate agent.
 */
export class DteLocalClient {
  private adapters = new Map<string, DteLocalAdapter>();
  private baseConfig: Partial<DteAdapterConfig>;

  constructor(baseConfig: Partial<DteAdapterConfig> = {}) {
    this.baseConfig = baseConfig;
  }

  /**
   * Submit a task to a specific DTE agent.
   * Creates and connects an adapter if one does not already exist for this agent.
   */
  async submit(
    agentSlug: string,
    taskId: string,
    prompt: string,
    telemetry?: Record<string, number>
  ): Promise<DteCognitiveResponse> {
    let adapter = this.adapters.get(agentSlug);

    if (!adapter) {
      adapter = new DteLocalAdapter({ ...this.baseConfig, agentSlug });
      await adapter.connect();
      this.adapters.set(agentSlug, adapter);
    }

    return adapter.executeTask(taskId, prompt, telemetry);
  }

  /**
   * Submit a task to the Core Self Engine (CEO) — the primary orchestrator.
   * Convenience method for the most common use case.
   */
  async submitToCoreSelf(
    taskId: string,
    prompt: string,
    telemetry?: Record<string, number>
  ): Promise<DteCognitiveResponse> {
    return this.submit('core-self-engine', taskId, prompt, telemetry);
  }

  /** Disconnect all adapters. */
  disconnectAll(): void {
    for (const adapter of this.adapters.values()) {
      adapter.disconnect();
    }
    this.adapters.clear();
  }
}
