export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsData[];
}

export interface NewsData {
  urlToImage: string | null;
  title: string;
  url: string;
  description: string | null;
}

export interface ValidNewsData {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
}
