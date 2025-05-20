
import { useState } from "react";
import { SearchResultCard } from "./SearchResultCard";
import { sampleSearchResults } from "../data/sample-market-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchResult, Sentiment, Impact, TimeRange } from "../types/market-research";
import { Search, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="space-y-6 w-full">
      <div className="sticky top-0 bg-background pt-2 pb-4 z-10 w-full">
        <form onSubmit={handleSearch} className="relative w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#006c8f]" />
                  <Input
                    placeholder="Search for market research topics..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim()) {
                        handleSearch(e);
                      }
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your market research query</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium">Time Range</span>
            <div className="flex flex-wrap items-center gap-2">
              {(['day', 'week', 'month', 'year', 'all'] as TimeRange[]).map(timeRange => (
                <TooltipProvider key={timeRange}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRange(timeRange)}
                        className={`h-7 text-[13px] capitalize ${filters.timeRange === timeRange ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f]' : ''}`}
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        {timeRange}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show results from the last {timeRange}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium">Sentiment</span>
              <div className="flex flex-wrap items-center gap-2">
                {(['positive', 'neutral', 'negative'] as Sentiment[]).map(sentiment => (
                  <TooltipProvider key={sentiment}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSentimentFilter(sentiment)}
                          className={`h-7 text-[13px] capitalize ${filters.sentiment.includes(sentiment) ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f]' : ''}`}
                        >
                          {sentiment}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter by {sentiment} sentiment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium">Impact</span>
              <div className="flex flex-wrap items-center gap-2">
                {(['high', 'medium', 'low'] as Impact[]).map(impact => (
                  <TooltipProvider key={impact}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleImpactFilter(impact)}
                          className={`h-7 text-[13px] capitalize ${filters.impact.includes(impact) ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f]' : ''}`}
                        >
                          {impact}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter by {impact} impact</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4 w-full">
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
            <h3 className="text-[16px] font-medium text-gray-900 mb-2">Find the latest market insights</h3>
            <p className="text-[13px] text-gray-600">
              Enter a search query about market trends, competitors, or industry news to get AI-analyzed results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
