import { cn } from "@/lib/utils"

type TagChipProps = {
  children: React.ReactNode
  className?: string
}

export function TagChip({ children, className }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  )
}
