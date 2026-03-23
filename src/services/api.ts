import type {
  CrawlRequest,
  CrawlResponse,
  TopWordsResponse,
} from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function postCrawl(payload: CrawlRequest): Promise<CrawlResponse> {
  const response = await fetch(`${API_BASE_URL}/crawl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`POST /crawl failed with status ${response.status}`);
  }

  return response.json();
}

export async function getTopWords(limit = 10): Promise<TopWordsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/words/top?limit=${encodeURIComponent(limit)}`
  );

  if (!response.ok) {
    throw new Error(`GET /words/top failed with status ${response.status}`);
  }

  return response.json();
}
