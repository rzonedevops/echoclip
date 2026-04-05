# EchoClip Architecture

## Overview

EchoClip is built on two foundational systems: the **Paperclip control plane** and the **Deep Tree Echo (DTE) cognitive architecture**. The integration is achieved through the `dte-local` adapter, which bridges Paperclip's task dispatch model to the DTE Python runtime.

## Component Map

```
EchoClip
├── Paperclip Control Plane
│   ├── Task Router
│   ├── Token Budget Manager
│   └── AdapterRegistry
│         └── DteLocalAdapter (dte-local)
│               └── WebSocket → DteRuntimeBridge (Node.js)
│                               └── subprocess → echo-adventure (Python)
│                                               ├── AutgnosisEngine
│                                               ├── SelfModificationEngine
│                                               └── IntegratedCognitiveLoop
│                                                     └── echo.kern (C/Python)
│                                                           └── ESNReservoir
│
└── DTE Cognitive Org (companies/deep-tree-echo)
    ├── Agents
    │   ├── core-self-engine (CEO)
    │   ├── reservoir-dynamics-lead
    │   ├── memory-holographer
    │   └── autognosis-analyst
    ├── Skills
    │   ├── reservoir-analysis
    │   ├── autognosis-cycle
    │   └── memory-consolidation
    └── Teams
        └── cognitive-core
```

## Data Flow

A task submitted to the EchoClip system flows through the following stages:

1. **Dispatch:** Paperclip's Task Router receives a task and routes it to the appropriate DTE agent based on the company definition.
2. **Translation:** The `DteLocalAdapter` translates the Paperclip task payload into a `DteCognitivePayload`, injecting any available telemetry.
3. **Bridging:** The `DteRuntimeBridge` receives the payload over WebSocket and spawns a Python subprocess to run the cognitive cycle.
4. **Cognition:** The `echo-adventure` runtime executes a full `AutgnosisEngine` cycle, optionally calling `echo.kern` for real-time ESN updates.
5. **Response:** The cognitive output is returned as a `DteCognitiveResponse`, including the agent's output text and a full metrics snapshot.
6. **Consolidation:** The Memory Holographer ingests the response as a new episodic fragment into `echo-garden-of-memory`.

## Autonomy Levels

EchoClip targets **Autonomy Level 3.5 (Wired)** in its initial release, with a clear path to Level 5 (Autonomous):

| Level | Status | Description |
|---|---|---|
| 2 (Scaffold) | Complete | All agent types defined with correct interfaces |
| 3 (Enabled) | Complete | Real ESN state updates, WebSocket adapter connected |
| 3.5 (Wired) | Complete | End-to-end pipeline from Paperclip to echo-adventure |
| 4 (Cognitive) | Planned | Echobeats loop, concurrent cognitive streams |
| 5 (Autonomous) | Planned | Self-modification authorized by Core Self Engine |

## Relationship to Upstream Repositories

EchoClip is a **composition**, not a fork. It does not duplicate code from its upstream repositories. Instead, it defines the organizational layer and adapter that connects them:

| Repository | Role in EchoClip |
|---|---|
| `rzonedevops/paperclip` | Control plane (task routing, token budgets) |
| `rzonedevops/companies` | Schema reference for agent company definitions |
| `rzonedevops/echo-adventure` | Python cognitive runtime (Autognosis, Self-Modification) |
| `rzonedevops/echo.kern` | Real-time ESN dynamics (C/Python hybrid) |
| `rzonedevops/echo-garden-of-memory` | Memory consolidation and Holographic Identity |
| `rzonedevops/cog-echo` | Hypergraph self-image and OpenCog integration |
| `rzonedevops/DTESN-O2-BSeries.jl` | B-Series mathematical foundations (Julia) |
