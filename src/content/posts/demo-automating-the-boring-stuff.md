---
title: 'Automating the Boring Stuff'
published: 2026-05-27
draft: false
description: 'A demo post on small automations that quietly save hours every week.'
author: 'Rajil Vembe'
tags: ['Automation', 'Productivity']
---

> This is a demo article for layout testing.

Most of my favorite automations are unglamorous. They don't use AI. They just delete a recurring annoyance.

## A rule of thumb

If I do something **more than twice a week** and it takes **more than two minutes**, it earns a script.

```bash
#!/usr/bin/env bash
# Tidy up: archive last week's exports
set -euo pipefail

week=$(date +%Y-%V)
mkdir -p "archive/$week"
mv exports/*.csv "archive/$week/" 2>/dev/null || echo "nothing to archive"
echo "archived into archive/$week"
```

The compounding return is real: ten two-minute chores removed is most of an afternoon back every month — and zero context-switching tax.
