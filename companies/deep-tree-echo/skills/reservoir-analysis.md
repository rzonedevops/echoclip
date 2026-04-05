---
name: reservoir-analysis
description: Analyze the Echo State Network reservoir state and report spectral radius, sparsity, and timing metrics.
version: 1.0.0
---

You have access to the `echo.kern` Python module. When asked to analyze the reservoir:

1. Import `ESNReservoir` and `ESNConfiguration` from `echo.kern`.
2. Initialize the reservoir with the current configuration.
3. Run `update_state()` with the latest input vector.
4. Report: spectral radius, sparsity, state norm, and update latency.
5. Flag any timing violation (>1ms) or spectral radius drift outside [0.85, 0.95].

Always output a JSON summary with keys: `spectral_radius`, `sparsity`, `state_norm`, `latency_ms`, `status`.
