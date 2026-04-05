# EchoClip Agent Definitions

This document describes the cognitive agents that constitute the Deep Tree Echo Cognitive Org within the EchoClip framework. Each agent maps to a specific subsystem of the DTE architecture and is backed by the `dte-local` adapter.

## Organizational Model

The DTE Cognitive Org is not a traditional hierarchy of human roles. It is a **topological mapping** of the DTE cognitive architecture onto a Paperclip company structure. The "employees" are the subsystems of the architecture itself, each with a defined domain, responsibility, and communication protocol.

| Agent | Role | DTE Subsystem | Adapter Model |
|---|---|---|---|
| `core-self-engine` | CEO / Orchestrator | CoreSelfEngine + IdentityMesh | `dte-lucy-gguf` |
| `reservoir-dynamics-lead` | ESN Engineer | ESNReservoir (echo.kern) | `dte-esn-ode` |
| `memory-holographer` | Memory Engineer | HolographicIdentity (echo-garden-of-memory) | `dte-garden-transformer` |
| `autognosis-analyst` | Safety Auditor | AutgnosisEngine (echo-adventure) | `dte-autognosis-loop` |

## Agent Communication Protocol

Agents communicate via the `dte-local` WebSocket adapter. Each cognitive cycle follows this sequence:

1. **Perception:** The Reservoir Dynamics Lead updates the ESN state with the latest sensory input vector.
2. **Consolidation:** The Memory Holographer ingests the new state as an episodic fragment and reconstructs the hologram.
3. **Introspection:** The Autognosis Analyst runs a telemetry check across all subsystems and generates modification proposals.
4. **Authorization:** The Core Self Engine reviews proposals, enforces safety constraints, and authorizes or rejects changes.

## Safety Constraints

All self-modification proposals are subject to the following hard limits, enforced by the Autognosis Analyst:

- **Rate limit:** Maximum 10 modifications per minute.
- **Coherence halt:** If the stream coherence level drops below 0.15 (15%), all modifications are halted and the system awaits human oversight.
- **Delta clamp:** No single modification may change any parameter by more than 20%.
- **Rollback:** Any modification that causes a test failure is automatically rolled back.

## Adding New Agents

To add a new agent to the DTE Cognitive Org, create a new Markdown file in `companies/deep-tree-echo/agents/` with the following front matter:

```yaml
---
name: Agent Name
role: Role Title
reports_to: parent-agent-slug
adapter: dte-local
model: dte-model-name
temperature: 0.5
---
```

Then add the agent slug to the relevant team definition in `companies/deep-tree-echo/teams/`.
