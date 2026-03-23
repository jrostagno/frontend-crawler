type CrawlFormProps = {
  url: string;
  onUrlChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export function CrawlForm({ url, onUrlChange, onSubmit, loading }: CrawlFormProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="mb-1 text-lg font-semibold">Crawl URL</h2>
      <p className="mb-4 text-sm text-slate-400">
        Ingresa una URL de Amazon y envia el request al endpoint <code className="rounded bg-slate-800 px-1 py-0.5">POST /crawl</code>.
      </p>

      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          type="url"
          required
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="https://www.amazon.com/gp/product/B00VVOCSOU"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400 transition focus:ring-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Enviar a crawl"}
        </button>
      </form>
    </section>
  );
}
