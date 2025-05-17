
import { useState } from "react";
import { SearchResultCard } from "./SearchResultCard";
import { sampleSearchResults } from "../data/sample-market-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchResult, Sentiment, Impact, TimeRange } from "../types/market-research";
import { Search, Calendar } from "lucide-react";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    sentiment: [] as Sentiment[],
    impact: [] as Impact[],
    timeRange: 'week' as TimeRange
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setResults(sampleSearchResults);
      setIsSearching(false);
    }, 1000);
  };

  const toggleSentimentFilter = (sentiment: Sentiment) => {
    setFilters(prev => {
      if (prev.sentiment.includes(sentiment)) {
        return {
          ...prev,
          sentiment: prev.sentiment.filter(s => s !== sentiment)
        };
      } else {
        return {
          ...prev,
          sentiment: [...prev.sentiment, sentiment]
        };
      }
    });
  };

  const toggleImpactFilter = (impact: Impact) => {
    setFilters(prev => {
      if (prev.impact.includes(impact)) {
        return {
          ...prev,
          impact: prev.impact.filter(i => i !== impact)
        };
      } else {
        return {
          ...prev,
          impact: [...prev.impact, impact]
        };
      }
    });
  };

  const setTimeRange = (timeRange: TimeRange) => {
    setFilters(prev => ({
      ...prev,
      timeRange
    }));
  };

  const filteredResults = results.filter(result => {
    // If no filters are selected, show all results
    if (filters.sentiment.length === 0 && filters.impact.length === 0) {
      return true;
    }
    
    // Check sentiment filter
    const matchesSentiment = filters.sentiment.length === 0 || filters.sentiment.includes(result.sentiment);
    
    // Check impact filter
    const matchesImpact = filters.impact.length === 0 || filters.impact.includes(result.impact);
    
    // Result must match both filters
    return matchesSentiment && matchesImpact;
  });

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background pt-2 pb-4 z-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search for market research topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isSearching || !query.trim()}>
            {isSearching ? "Searching..." : <Search className="mr-2 h-4 w-4" />}
          </Button>
        </form>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Range:</span>
            {(['day', 'week', 'month', 'year', 'all'] as TimeRange[]).map(timeRange => (
              <Button
                key={timeRange}
                variant={filters.timeRange === timeRange ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(timeRange)}
                className="h-7 text-xs capitalize"
              >
                <Calendar className="mr-1 h-3 w-3" />
                {timeRange}
              </Button>
            ))}
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sentiment:</span>
              {(['positive', 'neutral', 'negative'] as Sentiment[]).map(sentiment => (
                <Button
                  key={sentiment}
                  variant={filters.sentiment.includes(sentiment) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSentimentFilter(sentiment)}
                  className="h-7 text-xs capitalize"
                >
                  {sentiment}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-medium">Impact:</span>
              {(['high', 'medium', 'low'] as Impact[]).map(impact => (
                <Button
                  key={impact}
                  variant={filters.impact.includes(impact) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleImpactFilter(impact)}
                  className="h-7 text-xs capitalize"
                >
                  {impact}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <SearchResultCard key={result.id} result={result} />
          ))
        ) : results.length > 0 ? (
          <div className="text-center py-8 text-gray-500">
            No results match your filter criteria
          </div>
        ) : isSearching ? (
          <div className="text-center py-8 text-gray-500">
            Searching...
          </div>
        ) : (
          <div className="bg-brand-light rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find the latest market insights</h3>
            <p className="text-gray-600">
              Enter a search query about market trends, competitors, or industry news to get AI-analyzed results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
