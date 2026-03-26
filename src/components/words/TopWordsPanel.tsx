import type { TopWord } from "../../types/api";

type TopWordsPanelProps = {
  words: TopWord[];
  loading: boolean;
  onRefresh: () => void;
};

export function TopWordsPanel({
  words,
  loading,
  onRefresh,
}: TopWordsPanelProps) {
  const minCount = words.length
    ? Math.min(...words.map((word) => word.count))
    : 0;
  const maxCount = words.length
    ? Math.max(...words.map((word) => word.count))
    : 0;

  const getScale = (count: number) => {
    if (maxCount === minCount) {
      return 0.55;
    }
    return (count - minCount) / (maxCount - minCount);
  };

  const getFontSize = (count: number) => {
    const normalized = getScale(count);
    return `${Math.round(15 + normalized * 20)}px`;
  };

  const getTextColor = (count: number) => {
    const normalized = getScale(count);
    if (normalized > 0.75) {
      return "text-amber-300";
    }
    if (normalized > 0.45) {
      return "text-emerald-300";
    }
    return "text-cyan-300";
  };

  const getBoxTone = (count: number) => {
    const normalized = getScale(count);
    if (normalized > 0.75) {
      return "border-amber-500/40 bg-amber-500/10";
    }
    if (normalized > 0.45) {
      return "border-emerald-500/40 bg-emerald-500/10";
    }
    return "border-cyan-500/40 bg-cyan-500/10";
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Top words</h2>
          <p className="text-sm text-slate-400">
            Data fetched from{" "}
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
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Loading top words...</p>
      ) : words.length === 0 ? (
        <p className="text-sm text-slate-400">
          No words to display yet.
        </p>
      ) : (
        <ul className="columns-1 gap-3 space-y-3 sm:columns-2 lg:columns-3">
          {words.map((item, index) => (
            <li
              key={`${item.word}-${index}`}
              className={`relative break-inside-avoid rounded-md border px-3 py-3 pr-12 ${getBoxTone(item.count)}`}
            >
              <span
                className={`block max-w-full break-words font-semibold leading-tight ${getTextColor(item.count)}`}
                style={{ fontSize: getFontSize(item.count) }}
              >
                {item.word}
              </span>
              <span className="absolute right-3 top-3 text-xs font-medium text-slate-200">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
