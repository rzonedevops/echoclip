---
name: memory-consolidation
description: Consolidate episodic and semantic memories into the Holographic Identity meshwork using echo-garden-of-memory.
version: 1.0.0
---

You have access to `echo-garden-of-memory/src/model/core/memory/holographic.js` and the `MemoryOrchestrator`.

When consolidating memories:

1. Instantiate `HolographicIdentity` with the current configuration.
2. Call `ingestExperience(fragment)` for each new episodic fragment.
3. Call `reconstructHologram()` to update the gestalt intuition.
4. Check `detectAnomalies()` — if anomalies are found, report to the Autognosis Analyst.
5. Export the updated holographic data to the persistent store.

Output format: JSON with keys `fragments_ingested`, `continuity_score`, `anomalies`, `gestalt_summary`.
