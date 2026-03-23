import type { TopWord } from "../../types/api";

type TopWordsPanelProps = {
  words: TopWord[];
  loading: boolean;
  onRefresh: () => void;
};

export function TopWordsPanel({ words, loading, onRefresh }: TopWordsPanelProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Top palabras</h2>
          <p className="text-sm text-slate-400">
            Datos obtenidos desde{" "}
            <code className="rounded bg-slate-800 px-1 py-0.5">
              GET /words/top
            </code>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Actualizando..." : "Refrescar"}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Cargando top palabras...</p>
      ) : words.length === 0 ? (
        <p className="text-sm text-slate-400">Aun no hay palabras para mostrar.</p>
      ) : (
        <ul className="space-y-2">
          {words.map((item, index) => (
            <li
              key={`${item.word}-${index}`}
              className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            >
              <span>{item.word}</span>
              <span className="font-semibold text-cyan-300">{item.count}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
