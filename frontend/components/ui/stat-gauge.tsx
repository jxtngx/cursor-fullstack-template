import { cn } from "@/lib/utils"

type StatGaugeProps = {
  label: string
  value: string
  barPct: number
  valueClassName?: string
  spark?: number[]
}

export function StatGauge({
  label,
  value,
  barPct,
  valueClassName,
  spark,
}: StatGaugeProps) {
  const w = Math.min(100, Math.max(0, barPct))
  return (
    <div className="min-w-0 flex-1 border-r border-border px-2 py-1.5 last:border-r-0">
      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-fg-dim">
        {label}
      </div>
      <div
        className={cn(
          "font-mono text-xl font-semibold tabular-nums leading-tight",
          valueClassName ?? "text-foreground"
        )}
      >
        {value}
      </div>
      <div className="mt-1 h-0.5 w-full overflow-hidden rounded-sm bg-card">
        <div
          className="h-full rounded-sm bg-primary/80"
          style={{ width: `${w}%` }}
        />
      </div>
      {spark && spark.length > 0 ? (
        <div className="mt-1 flex h-3 items-end gap-px">
          {spark.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[1px] bg-fg-dim/40"
              style={{ height: `${Math.max(2, (h / 100) * 12)}px` }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
