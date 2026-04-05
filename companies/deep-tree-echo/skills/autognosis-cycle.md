---
name: autognosis-cycle
description: Execute a full Autognosis cycle using echo-adventure's AutgnosisEngine. Gathers telemetry, detects anomalies, and proposes self-modification directives.
version: 1.0.0
---

You have access to `echo-adventure/src/echo_adventure/autognosis_engine.py` and `self_modification_engine.py`.

When executing an autognosis cycle:

1. Instantiate `AutgnosisEngine` and record telemetry from all four subsystems (RESERVOIR, ECHOBEATS, AAR, MEMORY).
2. Call `run_cycle()` and capture the output.
3. Instantiate `SelfModificationEngine` and call `propose_modifications(cycle_output)`.
4. Check safety constraints: reject any proposal that would exceed 10 modifications/min or drop coherence below 0.15.
5. Return approved directives to the Core Self Engine for final authorization.

Output format: JSON with keys `cycle_id`, `anomalies`, `proposals`, `approved`, `halted`.
