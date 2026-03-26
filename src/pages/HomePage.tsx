import { useEffect, useState } from "react";
import { CrawlForm } from "../components/crawler/CrawlForm";
import { TopWordsPanel } from "../components/words/TopWordsPanel";
import { getTopWords, postCrawl } from "../services/api";
import type { CrawlResponse, TopWord } from "../types/api";

const DEFAULT_URL = "https://www.amazon.com/gp/product/B00VVOCSOU";

export function HomePage() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [words, setWords] = useState<TopWord[]>([]);
  const [crawlResult, setCrawlResult] = useState<CrawlResponse | null>(null);
  const [crawlLoading, setCrawlLoading] = useState(false);
  const [wordsLoading, setWordsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshWords() {
    setWordsLoading(true);
    setError(null);
    try {
      const response = await getTopWords(10);
      setWords(response.words);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Could not fetch top words.";
      setError(message);
    } finally {
      setWordsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCrawlLoading(true);
    setError(null);
    try {
      const response = await postCrawl(url);
      setCrawlResult(response);
      await refreshWords();
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Could not process crawl request.";
      setError(message);
    } finally {
      setCrawlLoading(false);
    }
  }

  useEffect(() => {
    void refreshWords();
  }, []);

  const crawlStatusLabel =
    crawlResult?.status === "processed"
      ? "Processed (new URL)"
      : crawlResult?.status === "already_seen"
        ? "Already seen (no recrawl)"
        : crawlResult?.status;
  const productDescription = crawlResult?.description;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <CrawlForm
          url={url}
          onUrlChange={setUrl}
          onSubmit={handleSubmit}
          loading={crawlLoading}
        />
        <TopWordsPanel
          words={words}
          loading={wordsLoading}
          onRefresh={() => {
            void refreshWords();
          }}
        />
      </div>

      {crawlResult && (
        <section className="rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-5 text-sm">
          <h2 className="mb-2 text-base font-semibold text-emerald-300">
            Last crawl result
          </h2>
          <p className="text-emerald-200">Status: {crawlStatusLabel}</p>
          <p className="text-emerald-200">URL: {crawlResult.url}</p>
          <p className="text-emerald-200">
            New words added: {crawlResult.new_words}
          </p>
          {productDescription ? (
            <div className="mt-4 rounded-lg border border-emerald-700/50 bg-emerald-950/40 p-3">
              <p className="mb-1 text-xs uppercase tracking-wide text-emerald-300">
                Product description
              </p>
              <p className="text-emerald-100">{productDescription}</p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-emerald-300/80">
              Backend did not return a description for this crawl response.
            </p>
          )}
        </section>
      )}

      {error && (
        <section className="rounded-xl border border-rose-800/60 bg-rose-950/30 p-5 text-sm text-rose-100">
          {error}
        </section>
      )}
    </div>
  );
}
