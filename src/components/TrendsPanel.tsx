
import { useState } from "react";
import { TrendCard } from "./TrendCard";
import { sampleTrends } from "../data/sample-market-data";
import { Button } from "@/components/ui/button";
import { Sentiment } from "../types/market-research";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TrendsPanel() {
  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | null>(null);
  const [strengthFilter, setStrengthFilter] = useState<number | null>(null);
  
  const filteredTrends = sampleTrends.filter(trend => {
    const matchesSentiment = !sentimentFilter || trend.sentiment === sentimentFilter;
    const matchesStrength = !strengthFilter || trend.strength >= strengthFilter;
    return matchesSentiment && matchesStrength;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="sticky top-0 bg-background pt-2 pb-4 z-10 w-full">
        <h2 className="text-lg font-semibold mb-3">Current Market Trends</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Sentiment:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sentimentFilter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSentimentFilter(null)}
                    className="h-7 text-xs"
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
                      variant={sentimentFilter === sentiment ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSentimentFilter(sentiment)}
                      className="h-7 text-xs capitalize"
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
          
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            <span className="text-sm font-medium">Min Strength:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={strengthFilter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStrengthFilter(null)}
                    className="h-7 text-xs"
                  >
                    All
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show all trend strengths</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {[7, 8, 9].map(strength => (
              <TooltipProvider key={strength}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={strengthFilter === strength ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStrengthFilter(strength)}
                      className="h-7 text-xs"
                    >
                      {strength}+
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show trends with strength {strength} or higher</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {filteredTrends.length > 0 ? (
          filteredTrends.map(trend => (
            <TrendCard key={trend.id} trend={trend} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 col-span-1 md:col-span-2">
            No trends match your filter criteria
          </div>
        )}
      </div>
    </div>
  );
}
