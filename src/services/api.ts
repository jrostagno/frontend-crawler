import type { CrawlResponse, TopWordsResponse } from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function postCrawl(productUrl: string): Promise<CrawlResponse> {
  const endpoint = `${API_BASE_URL}/crawl?productUrl=${encodeURIComponent(productUrl)}`;
  const response = await fetch(endpoint, {
    method: "POST",
  });

  if (!response.ok) {
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new Error(
        retryAfter
          ? `Too many requests. Retry in ${retryAfter}s.`
          : "Too many requests. Please retry in a few seconds.",
      );
    }
    if (response.status === 400) {
      throw new Error("Invalid URL or URL is not from Amazon.");
    }
    if (response.status === 502) {
      throw new Error("Failed to fetch or parse Amazon page. Please retry.");
    }
    throw new Error(`POST /crawl failed with status ${response.status}`);
  }

  return response.json();
}

export async function getTopWords(limit = 10): Promise<TopWordsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/words/top?limit=${encodeURIComponent(limit)}`,
  );

  if (!response.ok) {
    throw new Error(`GET /words/top failed with status ${response.status}`);
  }

  return response.json();
}
