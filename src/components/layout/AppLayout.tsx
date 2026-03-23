import type { PropsWithChildren } from "react";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
              frontend crawler
            </p>
            <h1 className="text-lg font-semibold">Amazon Word Cloud</h1>
          </div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            React + Vite + Tailwind
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
