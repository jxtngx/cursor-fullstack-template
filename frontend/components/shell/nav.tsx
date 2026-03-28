import Link from "next/link"

export function Nav() {
  return (
    <header className="border-b border-border bg-card px-3 py-2">
      <div className="mx-auto flex max-w-[1400px] items-center">
        <Link
          href="/"
          className="shrink-0 font-semibold tracking-tight text-foreground"
        >
          dgxmode
          <span className="font-normal text-fg-dim">.com</span>
        </Link>
        <span className="ml-auto inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] text-primary">locked in</span>
        </span>
      </div>
    </header>
  )
}
