import { cn } from "@/lib/utils"

type DataTableFrameProps = {
  children: React.ReactNode
  className?: string
}

export function DataTableFrame({ children, className }: DataTableFrameProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded border border-border bg-card",
        className
      )}
    >
      {children}
    </div>
  )
}
