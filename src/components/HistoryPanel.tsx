
import { useState } from "react";
import { sampleSearchQueries } from "../data/sample-market-data";
import { SearchResultCard } from "./SearchResultCard";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, RefreshCcw, Search } from "lucide-react";
import { Sentiment, Impact } from "../types/market-research";

export function HistoryPanel() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    sentiment: [] as Sentiment[],
    impact: [] as Impact[],
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

  const filteredQueries = sampleSearchQueries.filter(query => {
    // If no filters, show all
    if (filters.sentiment.length === 0 && filters.impact.length === 0) {
      return true;
    }
    
    // Check if any result matches both filters
    return query.results.some(result => {
      const matchesSentiment = filters.sentiment.length === 0 || 
                              filters.sentiment.includes(result.sentiment);
      const matchesImpact = filters.impact.length === 0 || 
                           filters.impact.includes(result.impact);
      return matchesSentiment && matchesImpact;
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

  const handleEnhance = (query: string) => {
    console.log("Enhancing query:", query);
    // In a real app, this would open a dialog or redirect to enhance the query
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
          <div className="sticky top-0 bg-background pt-2 pb-4 z-10">
            <h2 className="text-lg font-semibold mb-3">Search History</h2>
            
            <div className="flex flex-wrap gap-2">
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
          </div>
          
          <div className="space-y-6">
            {filteredQueries.length > 0 ? (
              filteredQueries.map(queryItem => (
                <Collapsible 
                  key={queryItem.id} 
                  open={openItems[queryItem.id]} 
                  onOpenChange={() => toggleItem(queryItem.id)}
                  className="border rounded-lg shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="p-0 h-auto text-left hover:bg-transparent">
                            <h3 className="text-lg font-medium">{queryItem.query}</h3>
                          </Button>
                        </CollapsibleTrigger>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          {formatDate(queryItem.timestamp)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewDetails(queryItem.id)}
                        >
                          <Search className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRerun(queryItem.query)}
                        >
                          <RefreshCcw className="mr-1 h-4 w-4" />
                          Re-run
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleEnhance(queryItem.query)}
                        >
                          <Search className="mr-1 h-4 w-4" />
                          Enhance
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CollapsibleContent className="px-4 pb-4">
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Results Summary</h4>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
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
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {result.headline.substring(0, 20)}...
                            </span>
                          ))}
                          {queryItem.results.length > 3 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
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
              <div className="text-center py-8 text-gray-500">
                No search history matches your filter criteria
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{activeQueryData.query}</h2>
            <Button variant="outline" onClick={() => setActiveQuery(null)}>
              Back to History
            </Button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
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
