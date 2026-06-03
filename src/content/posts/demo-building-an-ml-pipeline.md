---
title: 'Building a Reproducible ML Pipeline'
published: 2026-05-20
draft: false
description: 'A demo post walking through a clean, reproducible machine learning pipeline from data ingestion to deployment.'
author: 'Rajil Vembe'
tags: ['Machine Learning', 'MLOps', 'Automation']
---

> This is a demo article for layout testing.

A good machine learning pipeline is **reproducible**, **observable**, and **boring** — in the best way. Here's the skeleton I reach for.

## Stages

1. **Ingest** — pull raw data into a versioned store.
2. **Validate** — schema and distribution checks before anything else runs.
3. **Train** — deterministic runs with pinned seeds and tracked hyperparameters.
4. **Evaluate** — hold-out metrics plus slice-based fairness checks.
5. **Deploy** — ship behind a feature flag, watch, then ramp.

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class RunConfig:
    seed: int = 42
    lr: float = 3e-4
    epochs: int = 10


def train(cfg: RunConfig):
    print(f"training with {cfg}")
    # ... the fun part ...
    return {"val_loss": 0.123}
```

The trick isn't any single stage — it's making the whole thing runnable with one command and pinned inputs so results don't drift between machines.
