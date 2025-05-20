
import { useState } from "react";
import { TrendCard } from "./TrendCard";
import { sampleTrends } from "../data/sample-market-data";
import { Button } from "@/components/ui/button";
import { Sentiment, Impact } from "../types/market-research";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TrendsPanel() {
  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | null>(null);
  const [impactFilter, setImpactFilter] = useState<Impact | null>(null);
  
  const filteredTrends = sampleTrends.filter(trend => {
    const matchesSentiment = !sentimentFilter || trend.sentiment === sentimentFilter;
    const matchesImpact = !impactFilter || trend.impact === impactFilter;
    return matchesSentiment && matchesImpact;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="sticky top-0 bg-[#f8f9fc] pt-2 pb-2 z-10 w-full dark:bg-gray-900">
        <h2 className="text-[16px] font-semibold mb-3 dark:text-gray-200">Current Market Trends</h2>
        
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-[#1d2939] dark:text-gray-200 text-[14px] font-medium mb-2">Sentiment</span>
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSentimentFilter(null)}
                      className={`h-7 text-[13px] ${sentimentFilter === null ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-gray-400'}`}
                    >
                      All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show all sentiments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {(['positive', 'neutral', 'negative'] as Sentiment[]).map(sentiment => (
                <TooltipProvider key={sentiment}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSentimentFilter(sentiment)}
                        className={`h-7 text-[13px] capitalize ${sentimentFilter === sentiment ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-gray-400'}`}
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

          <div className="flex flex-col">
            <span className="text-[#1d2939] dark:text-gray-200 text-[14px] font-medium mb-2">Impact</span>
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setImpactFilter(null)}
                      className={`h-7 text-[13px] ${impactFilter === null ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-gray-400'}`}
                    >
                      All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show all impact levels</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {(['high', 'medium', 'low'] as Impact[]).map(impact => (
                <TooltipProvider key={impact}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setImpactFilter(impact)}
                        className={`h-7 text-[13px] capitalize ${impactFilter === impact ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-gray-400'}`}
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {filteredTrends.length > 0 ? (
          filteredTrends.map(trend => (
            <TrendCard key={trend.id} trend={trend} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 col-span-1 md:col-span-2 dark:text-gray-400">
            No trends match your filter criteria
          </div>
        )}
      </div>
    </div>
  );
}
