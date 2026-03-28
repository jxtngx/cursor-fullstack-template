---
name: dgxmode frontend build
overview: "Rewrite the AI Engineer and ML Engineer agent files for the dgxmode context (Nous, Prime Intellect, Nemotron, DGX Spark focus), update the designer agent to Next.js 16, then build the dgxmode.com frontend: design system tokens in globals.css, three Google Fonts in layout, shared shell (nav + status bar), and five route pages (/, /benchmarks, /guides, /tools, /community) with mock data -- all following the dgxmode-designer density and visual rules."
todos:
  - id: rewrite-ai-engineer
    content: Rewrite .cursor/agents/ai-engineer.md for dgxmode context (Nous, Prime Intellect, Nemotron, DGX Spark, Claude, Cursor, Linear, AWS cloud burst, HuggingFace)
    status: completed
  - id: rewrite-ml-engineer
    content: Rewrite .cursor/agents/ml-engineer.md for dgxmode context (training on Spark, LoRA, GRPO, Atropos, PRIME-RL, HuggingFace Hub, Claude/Cursor, Linear, AWS SageMaker cloud burst)
    status: completed
  - id: update-designer-next16
    content: Update dgxmode-designer.md tech stack from Next.js 15 to Next.js 16
    status: completed
  - id: design-system-tokens
    content: Replace globals.css with dgxmode dark tokens, map shadcn variables to dgxmode palette
    status: completed
  - id: fonts-layout
    content: Swap Geist fonts for Instrument Sans, JetBrains Mono, Newsreader in layout.tsx
    status: completed
  - id: install-deps
    content: Install recharts, @tanstack/react-table, next-mdx-remote
    status: completed
  - id: shell-nav
    content: Build top nav bar component (wordmark, route links, hardware status chip)
    status: completed
  - id: shell-statusbar
    content: Build bottom status bar component
    status: completed
  - id: layout-wiring
    content: Wire shell into root layout, force dark mode
    status: completed
  - id: page-home
    content: "Build home dashboard: stat gauges, recent benchmarks, recent content, hardware card"
    status: completed
  - id: page-benchmarks
    content: Build /benchmarks with mock JSON data, TanStack Table, memory bars, filters
    status: completed
  - id: page-guides
    content: Build /guides index with placeholder guide list
    status: completed
  - id: page-tools
    content: Build /tools index with four cards + subroutes (/tools/control, /tools/logger, /tools/traces, /tools/pulse, /tools/pulse/profiler) rendering HTML mockups from public/mockups/
    status: completed
  - id: copy-mockups
    content: Copy .cursor/context/*.html mockups into frontend/public/mockups/ as static assets
    status: pending
  - id: page-community
    content: Build /community page with Discord link, channels, leaderboard excerpt
    status: completed
  - id: shared-components
    content: "Build reusable components: stat-gauge, memory-bar, status-dot, data-table, tag-chip"
    status: completed
isProject: false
---

# dgxmode Frontend Build

## Phase 0: Agent File Updates

### Rewrite `ai-engineer.md`

Replace the generic LangChain/Bedrock template with a dgxmode-native agent focused on:

- **Scope:** Agentic systems on DGX Spark -- tool-using agents, RAG pipelines, multi-agent orchestration running locally on GB10
- **Model ecosystem:** Nous Research Hermes, NousCoder, Atropos RL; Prime Intellect INTELLECT models and Lab; NVIDIA Nemotron for instruction tuning and alignment
- **Local inference:** SGLang, vLLM, llama.cpp on Spark; OTel/JSONL tracing (as in agent-traces mockup); pgvector or local FAISS for retrieval
- **Dev tooling:** Cursor as primary IDE with Claude as reasoning backbone; Linear for task tracking; HuggingFace Hub for model/dataset discovery and hosting
- **Cloud burst:** AWS (EC2 GPU instances, S3 for artifacts, Lambda for lightweight endpoints) when jobs exceed Spark capacity
- **Voice:** Fan of Nous "technically rigorous, community-first" philosophy + Prime Intellect's open frontier research + Nemotron tuning pipelines
- **Constraints:** Keep concise per `concise-artifacts.mdc`; mermaid diagram for scope; no code in file

File: `[.cursor/agents/ai-engineer.md](.cursor/agents/ai-engineer.md)`

### Rewrite `ml-engineer.md`

Replace the generic SageMaker/MLflow template with dgxmode-native ML engineer focused on:

- **Scope:** Training, fine-tuning, and evaluation on DGX Spark hardware (128 GB unified memory, FP4 tensor cores)
- **Model ecosystem:** Nous Hermes family (DPO, GRPO via Atropos); Prime Intellect INTELLECT-series and PRIME-RL; NVIDIA Nemotron teacher-student distillation and NeMo alignment
- **Training stack:** PyTorch, HuggingFace Transformers/TRL, experiment-logger (as in HTML mockup), Spark Pulse for GPU profiling, local checkpointing at `~/.dgxmode/experiments/`
- **HuggingFace integration:** Hub for model weights, datasets, and evaluation; push checkpoints and training runs to Hub repos; pull community models for fine-tuning baselines
- **Dev tooling:** Cursor as IDE with Claude for code reasoning; Linear for experiment task tracking
- **Cloud burst:** AWS (SageMaker training jobs, EC2 p-series for multi-GPU runs, S3 for checkpoint storage) when training exceeds single-Spark capacity
- **Techniques:** LoRA/QLoRA on 70B+ models, MoE expert routing, FP4/FP8 quantization, memory-fit analysis against 128 GB ceiling, 273 GB/s bandwidth awareness
- **Voice:** Same open-source-first, hardware-aware persona
- **Constraints:** Concise; mermaid; no code

File: `[.cursor/agents/ml-engineer.md](.cursor/agents/ml-engineer.md)`

### Update `dgxmode-designer.md`

Single change: update tech stack table row from "Next.js 15 App Router" to "Next.js 16 App Router".

File: `[.cursor/agents/dgxmode-designer.md](.cursor/agents/dgxmode-designer.md)`

---

## Phase 1: Design System Foundation

All work in `frontend/`.

### 1a. Replace `globals.css` color tokens

Strip the default shadcn oklch light/dark tokens. Replace with the dgxmode designer token set (dark-only, hex values):

- Background tiers: `--bg-base` through `--bg-active`
- Border: `--border`, `--border-subtle`
- Text: `--text-primary` through `--text-dim`
- Accent: `--green`, `--green-bright`, `--green-dim`
- Semantic: `--amber`, `--red`, `--blue`, `--purple`, `--cyan`, `--rose`, `--teal`, `--orange` plus dim variants

Map shadcn CSS variable expectations (`--background`, `--foreground`, `--card`, `--primary`, etc.) to the dgxmode tokens so existing shadcn components render correctly on the dark base.

### 1b. Replace fonts in `layout.tsx`

Swap out `Geist` / `Geist_Mono` for:

- **Instrument Sans** (sans -- headings, body, nav)
- **JetBrains Mono** (mono -- data, code, metrics)
- **Newsreader** (serif -- editorial accents, pull quotes)

Use `next/font/google` for all three. Set CSS variables `--font-sans`, `--font-mono`, `--font-serif`.

### 1c. Add missing dependencies

```
npm install recharts @tanstack/react-table next-mdx-remote
```

These are specified in the designer tech stack for charts, tables, and MDX guides.

---

## Phase 2: Shell Layout

### 2a. Top navigation bar

Component: `components/shell/nav.tsx`

Dense horizontal bar at top:

- Left: `dgxmode` wordmark in Instrument Sans 700 with `.com` in dim
- Center: route links -- Benchmarks, Guides, Tools, Community (Instrument Sans, small caps or uppercase label style)
- Right: hardware status chip (mock): "DGX Spark" + green dot + "128 GB" in JetBrains Mono

### 2b. Status bar (footer)

Component: `components/shell/status-bar.tsx`

Thin bar at bottom (matching Spark Pulse / experiment-logger mockup status bars):

- Left: site version, content count
- Right: "dgxmode.com" in dim mono

### 2c. Root layout wiring

Update `layout.tsx` to wrap children in nav + status-bar shell. Force dark mode (remove light theme from ThemeProvider or set `forcedTheme="dark"`).

---

## Phase 3: Pages with Mock Data

### 3a. Home dashboard `/`

File: `app/page.tsx`

Dashboard layout (not a landing page):

- **Stat gauge strip** (6 across): GPU util, memory, tok/s, models loaded, guides published, Discord members -- all mock values, using the gauge pattern from designer spec
- **Recent benchmarks table** (3-5 rows): model name, params, quant, tok/s decode, mem usage -- inline horizontal bar for memory vs 128 GB
- **Recent content list**: latest 3-4 guides/releases as compact rows
- **Hardware card**: DGX Spark specs summary (GB10, 128 GB, 1 PFLOP FP4, 273 GB/s) as a dense card

### 3b. Benchmarks `/benchmarks`

File: `app/benchmarks/page.tsx`

Mock JSON data: `data/benchmarks.json` with 8-10 models (INTELLECT-3-MoE, Hermes-3-70B, NousCoder-7B, Nemotron-70B, DeepSeek-R1-Distill, Llama-3.3-70B, etc.)

Fields: model, org, params, quant, tok/s prefill, tok/s decode, memory GB, TTFT ms

Page:

- Dense table using TanStack Table
- Memory column as horizontal bar (relative to 128 GB)
- Sortable columns
- Filter chips by org (Prime Intellect, Nous, NVIDIA, Meta, DeepSeek)

### 3c. Guides `/guides`

File: `app/guides/page.tsx`

Placeholder list of guide titles (no MDX rendering yet, just the index page):

- "Running INTELLECT-3 on Your Spark in FP4"
- "LoRA Fine-tuning Hermes-3-70B: What Fits and What Doesn't"
- "Nemotron-70B Teacher Distillation on a Single Spark"
- "Two Sparks, One Model: Distributed Inference via QSFP"
- "GRPO with Atropos on Spark: Reward Modeling at Your Desk"

Each as a row: title, estimated reading time, tag chips (model family, technique).

### 3d. Tools `/tools`

File: `app/tools/page.tsx`

Index page with four tool cards in a 2x2 grid, each linking to its subroute:

- **Control** (`/tools/control`) -- model/dataset manager
- **Logger** (`/tools/logger`) -- experiment tracker
- **Traces** (`/tools/traces`) -- agent span viewer
- **Pulse** (`/tools/pulse`) -- GPU monitor and profiler

Each card: name, one-line description, feature bullets (3-4), status badge. Dense, not tall hero cards.

#### Tool subroutes -- HTML mockup pages

Copy the 5 HTML mockups from `.cursor/context/` into `public/mockups/` as static assets. Each subroute renders the corresponding mockup in a full-viewport iframe styled to blend with the dgxmode shell (dark background, no visible iframe chrome). The mockups are the canonical design language -- these pages let the team (and opus) see the vision as live interactive reference.

Route-to-mockup mapping:

- `/tools/control` -- `spark-control.html`
- `/tools/logger` -- `experiment-logger.html`
- `/tools/traces` -- `agent-traces.html`
- `/tools/pulse` -- `spark-pulse.html`
- `/tools/pulse/profiler` -- `spark-pulse-profiler.html`

Each subroute page: thin header with back-to-tools link + tool name, then full-bleed iframe. The pulse page includes a secondary link to the profiler sub-view.

### 3e. Community `/community`

File: `app/community/page.tsx`

Compact layout:

- **NVIDIA Developer Discord** link (official community)
- **GPU MODE Discord** link with member count (mock: 26K+)
- Leaderboard excerpt (top 3 kernel submissions from GPU MODE, mock data)
- Contributor spotlight placeholder

---

## Phase 4: Shared Components

Build reusable components as needed during page implementation:

- `components/ui/stat-gauge.tsx` -- single gauge (label, value, bar, optional sparkline)
- `components/ui/memory-bar.tsx` -- horizontal bar showing X / 128 GB with color coding
- `components/ui/status-dot.tsx` -- 5-6px dot + label (green/blue/amber/red)
- `components/ui/data-table.tsx` -- thin wrapper around TanStack Table with dgxmode styling
- `components/ui/tag-chip.tsx` -- small inline tag (org, quant method, technique)

---

## What We Will NOT Do

- No MDX rendering pipeline (guides index only, full MDX is a later task)
- No real benchmark data collection or live hardware integration
- No backend API work
- No authentication or user accounts
- No deployment configuration (Amplify setup is a later task)
- No modifications to files outside `frontend/` and `.cursor/agents/`

