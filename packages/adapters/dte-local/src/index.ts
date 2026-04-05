/**
 * EchoClip — DTE-Local Adapter
 *
 * Bridges the Paperclip control plane to a locally running Deep Tree Echo
 * cognitive agent (echo-adventure + echo.kern). The adapter communicates
 * with the DTE runtime over a local WebSocket and translates Paperclip
 * task payloads into DTE cognitive cycle inputs.
 *
 * Architecture:
 *   Paperclip Server
 *     └── AdapterRegistry
 *           └── DteLocalAdapter (this file)
 *                 └── WebSocket → DTE Runtime (echo-adventure)
 *                                   ├── AutgnosisEngine
 *                                   ├── SelfModificationEngine
 *                                   └── ESNReservoir (echo.kern)
 */

export { DteLocalAdapter } from './server/adapter.js';
export { DteLocalClient } from './client/client.js';
export type { DteAdapterConfig, DteCognitivePayload, DteCognitiveResponse } from './types.js';
