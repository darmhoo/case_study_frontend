declare type StoreContextType = {
  [key: string]: unknown;
};

declare type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  img_url: string;
  source: string;
  category: string;
  publishedAt: string;
  author: string;
}

declare type ISearch = {
  keyword?: string;
  source?: string;
  category?: string;
  date?: string;
}