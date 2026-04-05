/**
 * Shared types for the DTE-Local adapter.
 */

/** Configuration for the DTE-Local adapter instance. */
export interface DteAdapterConfig {
  /** WebSocket URL of the running DTE runtime (default: ws://localhost:8765) */
  runtimeUrl: string;
  /** Agent slug from the DTE company definition (e.g. "core-self-engine") */
  agentSlug: string;
  /** Maximum time (ms) to wait for a cognitive cycle response */
  timeoutMs: number;
  /** Autognosis subsystem to report telemetry to */
  autognosisSubsystem: 'RESERVOIR' | 'ECHOBEATS' | 'AAR' | 'MEMORY' | 'SELF_MOD';
}

/** A Paperclip task payload translated into a DTE cognitive cycle input. */
export interface DteCognitivePayload {
  /** The Paperclip task ID for correlation */
  taskId: string;
  /** The task description as natural language */
  prompt: string;
  /** Subsystem telemetry to inject before the cycle */
  telemetry?: Record<string, number>;
  /** Optional context from previous cognitive cycles */
  contextFragments?: string[];
}

/** The response from a DTE cognitive cycle. */
export interface DteCognitiveResponse {
  /** The Paperclip task ID */
  taskId: string;
  /** The cognitive output (agent's response text) */
  output: string;
  /** Autognosis metrics from this cycle */
  metrics: {
    spectralRadius?: number;
    streamCoherence?: number;
    modificationCount?: number;
    coherenceLevel?: number;
  };
  /** Whether the safety halt was triggered */
  halted: boolean;
  /** ISO timestamp of completion */
  completedAt: string;
}

/** WebSocket message envelope for DTE runtime communication. */
export interface DteWsMessage {
  type: 'cognitive_request' | 'cognitive_response' | 'telemetry' | 'heartbeat' | 'error';
  payload: DteCognitivePayload | DteCognitiveResponse | Record<string, unknown>;
}
