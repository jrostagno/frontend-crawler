export type CrawlResponse = {
  status: "processed" | "already_seen" | string;
  url: string;
  new_words: number;
};

export type TopWord = {
  word: string;
  count: number;
};

export type TopWordsResponse = {
  limit: number;
  words: TopWord[];
};
