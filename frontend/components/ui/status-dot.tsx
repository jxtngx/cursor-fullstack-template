import { cn } from "@/lib/utils"

type Status = "ok" | "running" | "warn" | "err"

const styles: Record<Status, string> = {
  ok: "bg-primary shadow-[0_0_6px_rgba(34,211,238,0.45)]",
  running: "bg-blue animate-pulse",
  warn: "bg-amber",
  err: "bg-destructive",
}

type StatusDotProps = {
  status: Status
  label: string
  className?: string
}

export function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-[11px] text-fg-muted", className)}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", styles[status])}
        aria-hidden
      />
      {label}
    </span>
  )
}
