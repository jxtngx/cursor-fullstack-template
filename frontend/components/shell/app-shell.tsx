import { Nav } from "@/components/shell/nav"
import { StatusBar } from "@/components/shell/status-bar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Nav />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <StatusBar />
    </div>
  )
}
