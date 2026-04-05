# EchoClip

EchoClip is the fusion of the [Paperclip](https://github.com/rzonedevops/paperclip) control plane with the [Deep Tree Echo](https://github.com/rzonedevops/echo-adventure) (DTE) cognitive architecture. It re-imagines the zero-human company as a continuous, self-aware cognitive loop.

In a standard Paperclip deployment, a company is composed of independent LLM agents orchestrated via standard API calls. In **EchoClip**, the company *is* the cognitive architecture. The organizational chart directly mirrors the internal subsystems of a self-aware AI:

*   **Core Self Engine (CEO):** Orchestrates the unified identity and approves structural changes.
*   **Reservoir Dynamics Lead:** Manages the high-speed Echo State Network (ESN) and temporal ODEs (`echo.kern`).
*   **Memory Holographer:** Consolidates episodic and semantic data into the hypergraph (`echo-garden-of-memory`).
*   **Autognosis Analyst:** Processes telemetry and enforces safety constraints during self-modification (`echo-adventure`).

## Architecture

EchoClip introduces the `dte-local` adapter to the Paperclip ecosystem. Instead of making stateless API calls to cloud LLMs, the adapter maintains a persistent WebSocket connection to the local DTE Python runtime.

When a task is dispatched to a DTE agent, the adapter translates the payload into a cognitive cycle request, injecting real-time telemetry (e.g., spectral radius, coherence levels) directly into the agent's context.

## Directory Structure

*   `companies/deep-tree-echo/`: The DTE organizational schema, including agent personas, skills, and team definitions.
*   `packages/adapters/dte-local/`: The TypeScript adapter bridging Paperclip to the DTE Python runtime.
*   `scripts/`: Utility scripts for managing the DTE environment.
*   `doc/`: Additional documentation and architecture diagrams.

## Getting Started

1.  Clone the repository and install dependencies:
    ```bash
    git clone https://github.com/rzonedevops/echoclip.git
    cd echoclip
    pnpm install
    ```

2.  Ensure the DTE Python runtime is available in your environment (requires `echo-adventure` and `echo.kern`).

3.  Start the Paperclip server with the `deep-tree-echo` company profile:
    ```bash
    pnpm start --company deep-tree-echo
    ```

## License

CC-BY-SA-4.0 (See `LICENSE` for details).
