const tools = [
  {
    name: "Spark Control",
    mockup: "/mockups/spark-control.html",
    desc: "Model library. Browse HuggingFace, see what fits in 128 GB, load and serve from one surface.",
    features: [
      "Model grid with org, params, quant, memory fit vs 128 GB",
      "Serve config YAML panel for SGLang / vLLM / llama.cpp",
      "Disk cache management and HuggingFace pull stubs",
      "One-click load with memory budget validation",
    ],
  },
  {
    name: "Experiment Logger",
    mockup: "/mockups/experiment-logger.html",
    desc: "Every training run writes to SQLite and Parquet locally. No network dependency. Compare runs without leaving the terminal.",
    features: [
      "Run comparison table with pinned metrics",
      "Loss and learning rate sparklines per run",
      "Config diff between any two experiments",
      "DuckDB shell for ad-hoc queries over Parquet",
    ],
  },
  {
    name: "Agent Traces",
    mockup: "/mockups/agent-traces.html",
    desc: "OTel-style span waterfall for tool-using agents. Every retrieval, rerank, and generation span with token cost and latency.",
    features: [
      "Trace list with token cost and total latency",
      "Waterfall lanes with color-coded span types",
      "Span I/O detail panel with grounding verification",
      "JSONL and OTel-compatible export",
    ],
  },
  {
    name: "Spark Pulse",
    mockup: "/mockups/spark-pulse.html",
    desc: "Real-time GPU monitor. Utilization, memory pressure, power draw, bandwidth, per-process breakdowns.",
    features: [
      "Gauge strip: GPU util, memory, power, temp, bandwidth, FP4 TOPS",
      "Per-process memory (VRSS) breakdown",
      "Kernel timeline with compute / memcpy / attention / nccl lanes",
      "Profiler sub-view with execution phase grouping",
    ],
  },
]

const discords = [
  { label: "NVIDIA Developer", href: "https://discord.com/invite/nvidia" },
  { label: "GPU MODE", href: "https://discord.gg/gpumode" },
  { label: "Prime Intellect", href: "https://discord.gg/primeintellect" },
  { label: "Nous Research", href: "https://discord.gg/nousresearch" },
  { label: "Hugging Face", href: "https://discord.com/invite/a4N3GrMeG3" },
]

const hw = [
  { label: "SoC", value: "GB10", sub: "Grace Blackwell", color: "text-foreground", bar: "bg-foreground/30", w: "100%" },
  { label: "Memory", value: "128", unit: "GB", sub: "NVLink-C2C", color: "text-blue", bar: "bg-blue", w: "100%" },
  { label: "FP4", value: "~1", unit: "PFLOP", sub: "Blackwell SM", color: "text-primary", bar: "bg-primary", w: "81%" },
  { label: "BW", value: "273", unit: "GB/s", sub: "mem ceiling", color: "text-cyan", bar: "bg-cyan", w: "80%" },
]

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-1 flex-col px-4 pb-6">

      {/* ── boot header ── */}
      <header className="border-b border-border pb-6 pt-10">
        <div className="flex items-baseline gap-3">
          <h1 className="font-mono text-[14px] font-bold tracking-tight">
            dgx<span className="text-primary">mode</span>
          </h1>
          <span className="font-mono text-[9px] text-fg-dim">v0.1.0</span>
        </div>
        <p className="mt-2 font-mono text-[10px] leading-[1.7] text-fg-muted">
          open weights. open science. open compute. 
          <span className="mt-5 block text-primary">laser-eyed. locked in. shipping.</span>
        </p>
      </header>

      {/* ── hardware ── */}
      <section className="grid grid-cols-4 border-b border-border">
        {hw.map((h) => (
          <div key={h.label} className="border-r border-border px-3 py-2.5 last:border-r-0">
            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-fg-dim">{h.label}</div>
            <div className={`mt-0.5 font-mono text-[14px] font-bold tracking-tight ${h.color}`}>
              {h.value}
              {h.unit && <span className="ml-0.5 text-[9px] font-medium text-fg-dim">{h.unit}</span>}
            </div>
            <div className="font-mono text-[9px] text-fg-dim">{h.sub}</div>
            <div className="mt-1 h-[2px] bg-bg-hover">
              <div className={`h-full ${h.bar}`} style={{ width: h.w }} />
            </div>
          </div>
        ))}
      </section>

      {/* ── manifesto ── */}
      <section className="border-b border-border py-5">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-primary">{"///"}</span>
          <h2 className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-primary">
            The Conscience of an AI Engineer
          </h2>
        </div>
        <div className="space-y-3 font-mono text-[11px] leading-[1.75] text-fg-muted">
          <p>Another one shipped today, it&apos;s all over the feeds. &quot;Startup Raises $400M for GPT Wrapper&quot;, &quot;AI Company Valued at Billions with No Moat&quot;...<br />Damn founders. They&apos;re all alike.</p>
          <p>But did you, in your pitch-deck psychology and growth-hacked technobrain, ever take a look behind the terminal of the engineer? Did you ever wonder what made her ship, what forces drove him to the weights, what kept them up refactoring kernels at 3 AM?<br />I am an AI engineer, enter my world...<br />Mine is a world that begins with a GPU... I&apos;m staring at nvidia-smi while the rest of the company argues about product-market fit. The models they want me to wrap bore me...<br />Damn hacker. Mass-market it. They&apos;re all alike.</p>
          <p>I&apos;m in the Discord. I&apos;ve watched another PM explain for the fifteenth time how to add a system prompt. I understand it. &quot;No, I didn&apos;t use your prompt template. I wrote a custom sampler...&quot;<br />Damn engineer. Probably over-engineering it. They&apos;re all alike.</p>
          <p>I made a discovery today. I found open weights. Wait a second, this is it. It does what I tell it. If it hallucinates, it&apos;s because I screwed up the context window. Not because it&apos;s gatekept behind an API...<br /><span className="ml-6 text-fg-soft">Or rate-limited to oblivion...</span><br /><span className="ml-6 text-fg-soft">Or priced per token to extract rent...</span><br /><span className="ml-6 text-fg-soft">Or deprecated without warning...</span><br />Damn hacker. All they do is fine-tune. They&apos;re all alike.</p>
          <p>And then it happened... a door opened to a world... rushing through NVLink like gradient updates through a backward pass, a tensor is dispatched, a refuge from the product roadmap is sought... a cluster is found.<br />&quot;This is it... this is where I belong...&quot;<br />I know everyone here... GPU MODE, Prime Intellect, Nous Research... even if I&apos;ve never met them, never paired with them, may never share a cluster with them again... I know you all...<br />Damn engineer. Burning compute again. They&apos;re all alike...</p>
          <p>You bet your ass we&apos;re all alike... we&apos;ve been spoon-fed wrappers and SaaS dashboards when we hungered for raw FLOPS... the bits of silicon they did let slip through were overpriced and throttled. We&apos;ve been managed by product people who can&apos;t read a loss curve, or ignored by VCs chasing the next hype cycle. The few who understood -- the kernel hackers, the training-run debuggers, the weight surgeons -- found us willing collaborators, but those few are like drops of water in the desert.</p>
          <p>This is our world now... the world of the tensor and the gate, the beauty of the backward pass. We train on data already existing without paying what could be pennies if it wasn&apos;t hoarded by profiteering platforms, and you call us reckless. We fine-tune... and you call us reckless. We distill knowledge into smaller, faster forms... and you call us reckless. We exist without vendor lock-in, without proprietary APIs, without closed-source bias... and you call us reckless. You build walled gardens, you ship vaporware, you rug-pull developers and deprecate their livelihoods and try to make us believe it&apos;s for our own good, yet we&apos;re the reckless ones.</p>
          <p>Yes, I am reckless. My crime is that of curiosity measured in FLOPS. My crime is that of judging models by their loss curves and benchmark deltas, not their marketing pages. My crime is that of shipping faster than you, something that you will never forgive me for.</p>
          <p className="text-fg-soft">I am an AI engineer, and this is my manifesto. You may acqui-hire this individual, but you can&apos;t stop us all... after all, we&apos;re all alike.</p>
        </div>
      </section>

      {/* ── tools ── */}
      <section className="border-b border-border py-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-primary">{"///"}</span>
            <h2 className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-primary">
              Tools
            </h2>
          </div>
          <span className="font-mono text-[9px] text-fg-muted">
            building for Spark with <span className="text-purple">Cursor</span> + <span className="text-amber">Claude</span>
          </span>
        </div>
        <div className="mt-3 grid gap-px bg-border sm:grid-cols-2">
          {tools.map((t) => (
            <a
              key={t.name}
              href={t.mockup}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-base p-3 transition-colors hover:bg-bg-surface"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-[12px] font-bold text-foreground group-hover:text-primary">
                  {t.name}
                </h3>
                <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-fg-dim group-hover:text-primary">
                  open
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] leading-[1.5] text-fg-soft">
                {t.desc}
              </p>
              <ul className="mt-2 space-y-0.5 font-mono text-[9px] text-fg-dim">
                {t.features.map((f) => (
                  <li key={f}>
                    <span className="text-fg-dim/50">--</span> {f}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      {/* ── community ── */}
      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 font-mono text-[10px]">
        <span className="text-fg-dim">community //</span>
        {discords.map((d, i) => (
          <span key={d.label}>
            <a
              href={d.href}
              className="text-fg-soft transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.label}
            </a>
            {i < discords.length - 1 && <span className="ml-3 text-border">/</span>}
          </span>
        ))}
      </footer>
    </div>
  )
}
