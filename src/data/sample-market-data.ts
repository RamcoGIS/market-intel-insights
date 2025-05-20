
import { SearchResult, TrendItem, SearchQuery } from "../types/market-research";

export const sampleSearchResults: SearchResult[] = [
  {
    id: "sr1",
    headline: "Tesla Announces Revolutionary New Battery Technology",
    url: "https://example.com/tesla-battery",
    summary: [
      "Tesla unveiled a new battery technology with 2x energy density",
      "The company claims it will reduce EV costs by 30%",
      "Production is expected to begin in early 2026"
    ],
    sentiment: "positive",
    impact: "high",
    source: "TechCrunch",
    date: "2025-05-12"
  },
  {
    id: "sr2",
    headline: "Global Chip Shortage Continues to Affect Tech Industry",
    url: "https://example.com/chip-shortage",
    summary: [
      "Major tech firms report continued supply chain disruptions",
      "Smartphone production estimated to decrease by 10% in Q3",
      "Analysts predict shortages will persist through 2026"
    ],
    sentiment: "negative",
    impact: "high",
    source: "Bloomberg",
    date: "2025-05-10"
  },
  {
    id: "sr3",
    headline: "Amazon Expands Same-Day Delivery to 15 New Cities",
    url: "https://example.com/amazon-delivery",
    summary: [
      "Amazon's same-day delivery now available in 100+ cities globally",
      "The company built 5 new fulfillment centers to support expansion",
      "Rivals Walmart and Target announce competing services"
    ],
    sentiment: "positive",
    impact: "medium",
    source: "Business Insider",
    date: "2025-05-14"
  },
  {
    id: "sr4",
    headline: "Federal Reserve Maintains Current Interest Rates",
    url: "https://example.com/fed-rates",
    summary: [
      "Fed keeps benchmark rate at 3.5% as expected",
      "Inflation concerns remain but show signs of easing",
      "Next rate decision scheduled for July meeting"
    ],
    sentiment: "neutral",
    impact: "medium",
    source: "Wall Street Journal",
    date: "2025-05-11"
  },
  {
    id: "sr5",
    headline: "Netflix Subscriber Growth Slows in Q1 Earnings Report",
    url: "https://example.com/netflix-q1",
    summary: [
      "Netflix added 4.2 million subscribers, below 5.5 million forecast",
      "Revenue grew 8% year-over-year, meeting expectations",
      "Company announces price increases in select markets"
    ],
    sentiment: "negative",
    impact: "medium",
    source: "CNBC",
    date: "2025-05-09"
  }
];

export const sampleTrends: TrendItem[] = [
  {
    id: "tr1",
    title: "AI Integration in Healthcare",
    description: "Growing adoption of AI for diagnostics and patient care",
    strength: 8,
    sentiment: "positive",
    impact: "high",
    relatedTopics: ["machine learning", "healthcare technology", "medical diagnostics"]
  },
  {
    id: "tr2",
    title: "Remote Work Technologies",
    description: "Continued investment in tools supporting distributed teams",
    strength: 9,
    sentiment: "positive",
    impact: "medium",
    relatedTopics: ["virtual offices", "collaboration tools", "digital nomads"]
  },
  {
    id: "tr3",
    title: "Supply Chain Resilience",
    description: "Companies rebuilding supply chains with focus on redundancy",
    strength: 7,
    sentiment: "neutral",
    impact: "medium",
    relatedTopics: ["logistics", "manufacturing", "global trade"]
  },
  {
    id: "tr4",
    title: "Cryptocurrency Market Volatility",
    description: "Increased fluctuations in major cryptocurrency valuations",
    strength: 6,
    sentiment: "negative",
    impact: "high",
    relatedTopics: ["bitcoin", "blockchain", "digital currency", "regulations"]
  },
  {
    id: "tr5",
    title: "Sustainable Product Packaging",
    description: "Brands shifting to eco-friendly packaging solutions",
    strength: 8,
    sentiment: "positive",
    impact: "medium",
    relatedTopics: ["sustainability", "plastic alternatives", "consumer preferences"]
  },
  {
    id: "tr6",
    title: "Rising Cybersecurity Threats",
    description: "Increased frequency of major data breaches and ransomware",
    strength: 9,
    sentiment: "negative",
    impact: "high",
    relatedTopics: ["data security", "privacy", "enterprise protection"]
  }
];

export const sampleSearchQueries: SearchQuery[] = [
  {
    id: "sq1",
    query: "latest electric vehicle market trends",
    timestamp: "2025-05-14T15:30:00Z",
    results: sampleSearchResults.slice(0, 3)
  },
  {
    id: "sq2",
    query: "impact of chip shortage on consumer electronics",
    timestamp: "2025-05-12T09:45:00Z",
    results: sampleSearchResults.slice(1, 4)
  },
  {
    id: "sq3",
    query: "streaming service competitive landscape 2025",
    timestamp: "2025-05-10T14:20:00Z",
    results: sampleSearchResults.slice(4, 5).concat(sampleSearchResults.slice(2, 3))
  }
];
