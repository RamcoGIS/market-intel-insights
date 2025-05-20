
export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Impact = 'high' | 'medium' | 'low';
export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'all';

export interface SearchResult {
  id: string;
  headline: string;
  url: string;
  summary: string[];
  sentiment: Sentiment;
  impact: Impact;
  source: string;
  date: string;
}

export interface TrendItem {
  id: string;
  title: string;
  description: string;
  strength: number; // 1-10
  sentiment: Sentiment;
  impact: Impact; // Added the impact property to the TrendItem interface
  relatedTopics: string[];
}

export interface SearchQuery {
  id: string;
  query: string;
  timestamp: string;
  results: SearchResult[];
}
