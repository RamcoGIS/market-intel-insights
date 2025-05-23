
import { useState } from "react";
import { sampleSearchQueries } from "../data/sample-market-data";
import { SearchResultCard } from "./SearchResultCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, RefreshCcw, Search } from "lucide-react";
import { Sentiment, Impact } from "../types/market-research";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Priority = 'urgent' | 'high' | 'medium' | 'low';

export function HistoryPanel() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    sentiment: [] as Sentiment[],
    impact: 'all' as Impact | 'all',
    priority: 'all' as Priority | 'all',
  });
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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

  const filteredQueries = sampleSearchQueries.filter(query => {
    // If no filters, show all
    if (filters.sentiment.length === 0 && filters.impact === 'all' && filters.priority === 'all') {
      return true;
    }
    
    // Check if any result matches all filters
    return query.results.some(result => {
      const matchesSentiment = filters.sentiment.length === 0 || 
                              filters.sentiment.includes(result.sentiment);
      const matchesImpact = filters.impact === 'all' || result.impact === filters.impact;
      // Simulate priority based on impact
      const resultPriority = result.impact === 'high' ? 'urgent' : result.impact === 'medium' ? 'medium' : 'low';
      const matchesPriority = filters.priority === 'all' || resultPriority === filters.priority;
      return matchesSentiment && matchesImpact && matchesPriority;
    });
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleRerun = (query: string) => {
    console.log("Re-running query:", query);
    // In a real app, this would trigger a new search
  };

  const handleViewDetails = (queryId: string) => {
    setActiveQuery(activeQuery === queryId ? null : queryId);
  };

  // If a query is active, show only that query's results
  const activeQueryData = activeQuery 
    ? sampleSearchQueries.find(q => q.id === activeQuery)
    : null;

  return (
    <div className="space-y-6">
      {!activeQueryData ? (
        <>
          <div className="sticky top-0 bg-[#f8f9fc] pt-2 pb-4 z-10 dark:bg-gray-900">
            <h2 className="text-[16px] font-semibold mb-3 dark:text-gray-200">Search History</h2>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Sentiment</span>
                <div className="flex flex-wrap items-center gap-2">
                  {(['positive', 'neutral', 'negative'] as Sentiment[]).map(sentiment => (
                    <Button
                      key={sentiment}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSentimentFilter(sentiment)}
                      className={`h-7 text-[13px] capitalize ${filters.sentiment.includes(sentiment) ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-[#667085]'}`}
                    >
                      <span className="text-[#667085]">{sentiment}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Impact</span>
                <Select value={filters.impact} onValueChange={(value: Impact | '') => setFilters(prev => ({ ...prev, impact: value }))}>
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
                <Select value={filters.priority} onValueChange={(value: Priority | '') => setFilters(prev => ({ ...prev, priority: value }))}>
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
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredQueries.length > 0 ? (
              filteredQueries.map(queryItem => (
                <Collapsible 
                  key={queryItem.id} 
                  open={openItems[queryItem.id]} 
                  onOpenChange={() => toggleItem(queryItem.id)}
                  className="border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="p-0 h-auto text-left hover:bg-transparent">
                            <h3 className="text-[16px] font-medium dark:text-gray-200">{queryItem.query}</h3>
                          </Button>
                        </CollapsibleTrigger>
                        <div className="flex items-center text-[13px] text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-4 w-4" />
                          {formatDate(queryItem.timestamp)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewDetails(queryItem.id)}
                                className="text-[#667085] dark:text-gray-400"
                              >
                                <Search className="mr-1 h-4 w-4 text-[#006c8f] dark:text-blue-400" />
                                View Details
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View full results</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleRerun(queryItem.query)}
                                className="w-auto text-[#667085] dark:text-gray-400"
                              >
                                <RefreshCcw className="mr-1 h-4 w-4 text-[#006c8f] dark:text-blue-400" />
                                Re-run
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Run this search again</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  <CollapsibleContent className="px-4 pb-4">
                    <div className="pt-2 border-t dark:border-gray-700">
                      <h4 className="text-[14px] font-medium text-gray-500 mb-3 dark:text-gray-400">Results Summary</h4>
                      <div>
                        <p className="text-[13px] text-gray-600 mb-2 dark:text-gray-300">
                          {queryItem.results.length} results • 
                          <span className="ml-1">{
                            queryItem.results.filter(r => r.sentiment === 'positive').length
                          } positive, </span>
                          <span>{
                            queryItem.results.filter(r => r.sentiment === 'negative').length
                          } negative</span>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {queryItem.results.slice(0, 3).map((result, i) => (
                            <span key={i} className="text-[13px] bg-gray-100 px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                              {result.headline.substring(0, 20)}...
                            </span>
                          ))}
                          {queryItem.results.length > 3 && (
                            <span className="text-[13px] bg-gray-100 px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                              +{queryItem.results.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No search history matches your filter criteria
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold dark:text-gray-200">{activeQueryData.query}</h2>
            <Button variant="outline" onClick={() => setActiveQuery(null)} className="dark:border-gray-600 dark:text-gray-300">
              Back to History
            </Button>
          </div>
          
          <div className="flex items-center text-[13px] text-gray-500 mb-4 dark:text-gray-400">
            <Calendar className="mr-1 h-4 w-4" />
            {formatDate(activeQueryData.timestamp)}
          </div>
          
          <div className="space-y-4 mt-4">
            {activeQueryData.results.map(result => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
