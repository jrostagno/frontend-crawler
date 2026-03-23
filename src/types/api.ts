export type CrawlResponse = {
  status: "processed" | "already_seen";
  url: string;
  new_words: number;
  description?: string | null;
};

export type TopWord = {
  word: string;
  count: number;
};

export type TopWordsResponse = {
  limit: number;
  words: TopWord[];
};
