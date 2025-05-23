
import { useState } from "react";
import { SearchResultCard } from "./SearchResultCard";
import { sampleSearchResults } from "../data/sample-market-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchResult, Sentiment, Impact, TimeRange } from "../types/market-research";
import { Search, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Priority = 'urgent' | 'high' | 'medium' | 'low';

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    sentiment: [] as Sentiment[],
    impact: '' as Impact | '',
    priority: '' as Priority | '',
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

  const setTimeRange = (timeRange: TimeRange) => {
    setFilters(prev => ({
      ...prev,
      timeRange
    }));
  };

  const filteredResults = results.filter(result => {
    // If no filters are selected, show all results
    if (filters.sentiment.length === 0 && !filters.impact && !filters.priority) {
      return true;
    }
    
    // Check sentiment filter
    const matchesSentiment = filters.sentiment.length === 0 || filters.sentiment.includes(result.sentiment);
    
    // Check impact filter
    const matchesImpact = !filters.impact || result.impact === filters.impact;
    
    // For priority, we'll simulate it based on impact (high impact = urgent/high priority)
    const resultPriority = result.impact === 'high' ? 'urgent' : result.impact === 'medium' ? 'medium' : 'low';
    const matchesPriority = !filters.priority || resultPriority === filters.priority;
    
    // Result must match all filters
    return matchesSentiment && matchesImpact && matchesPriority;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="sticky top-0 bg-[#f8f9fc] pt-2 pb-2 z-10 w-full dark:bg-gray-900">
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
                    className="w-full pl-10 focus:border-[#006c8f] focus:shadow-md transition-all"
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
        
        <div className="flex flex-wrap items-center gap-6 mt-4">
          <div className="flex flex-col">
            <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Time Range</span>
            <div className="flex flex-wrap items-center gap-2">
              {(['day', 'week', 'month', 'year', 'all'] as TimeRange[]).map(timeRange => (
                <TooltipProvider key={timeRange}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimeRange(timeRange)}
                        className={`h-7 text-[13px] capitalize ${filters.timeRange === timeRange ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-[#667085]'}`}
                      >
                        <Calendar className="mr-1 h-3 w-3 text-[#667085]" />
                        <span className="text-[#667085]">{timeRange}</span>
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
          
          {results.length > 0 && (
            <>
              <div className="flex flex-col">
                <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Sentiment</span>
                <div className="flex flex-wrap items-center gap-2">
                  {(['positive', 'neutral', 'negative'] as Sentiment[]).map(sentiment => (
                    <TooltipProvider key={sentiment}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSentimentFilter(sentiment)}
                            className={`h-7 text-[13px] capitalize ${filters.sentiment.includes(sentiment) ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-[#667085]'}`}
                          >
                            <span className="text-[#667085]">{sentiment}</span>
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
              
              <div className="flex flex-col">
                <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Impact</span>
                <Select value={filters.impact} onValueChange={(value: Impact) => setFilters(prev => ({ ...prev, impact: value }))}>
                  <SelectTrigger className="w-[120px] h-7 text-[13px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="" className="text-[#667085]">All</SelectItem>
                    <SelectItem value="high" className="text-[#667085]">High</SelectItem>
                    <SelectItem value="medium" className="text-[#667085]">Medium</SelectItem>
                    <SelectItem value="low" className="text-[#667085]">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Priority</span>
                <Select value={filters.priority} onValueChange={(value: Priority) => setFilters(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="w-[120px] h-7 text-[13px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="" className="text-[#667085]">All</SelectItem>
                    <SelectItem value="urgent" className="text-[#667085]">Urgent</SelectItem>
                    <SelectItem value="high" className="text-[#667085]">High</SelectItem>
                    <SelectItem value="medium" className="text-[#667085]">Medium</SelectItem>
                    <SelectItem value="low" className="text-[#667085]">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4 w-full">
        {filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <SearchResultCard key={result.id} result={result} />
          ))
        ) : results.length > 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No results match your filter criteria
          </div>
        ) : isSearching ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Searching...
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center dark:bg-gray-800">
            <h3 className="text-[16px] font-medium text-gray-900 mb-2 dark:text-gray-100">Find the latest market insights</h3>
            <p className="text-[13px] text-gray-600 dark:text-gray-300">
              Enter a search query about market trends, competitors, or industry news to get AI-analyzed results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
