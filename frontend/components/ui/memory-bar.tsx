import { cn } from "@/lib/utils"

const MAX_GB = 128

type MemoryBarProps = {
  usedGb: number
  className?: string
}

export function MemoryBar({ usedGb, className }: MemoryBarProps) {
  const pct = Math.min(100, (usedGb / MAX_GB) * 100)
  const warn = usedGb > 100
  return (
    <div className={cn("flex min-w-[120px] items-center gap-2", className)}>
      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-sm bg-card">
        <div
          className={cn(
            "h-full rounded-sm",
            warn ? "bg-destructive/80" : "bg-primary/70"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-[11px] tabular-nums text-fg-muted">
        {usedGb}/{MAX_GB} GB
      </span>
    </div>
  )
}
