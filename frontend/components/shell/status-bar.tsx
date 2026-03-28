export function StatusBar() {
  return (
    <footer className="border-t border-border bg-card px-3 py-1.5 text-[10px] text-fg-muted">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3">
        <span className="font-mono text-fg-soft">dgxmode v0.1.0</span>
        <span className="ml-auto font-mono text-fg-dim">dgxmode.com</span>
      </div>
    </footer>
  )
}
