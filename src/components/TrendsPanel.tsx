
import { useState } from "react";
import { TrendCard } from "./TrendCard";
import { sampleTrends } from "../data/sample-market-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sentiment, Impact } from "../types/market-research";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Priority = 'urgent' | 'high' | 'medium' | 'low';
type FilterValue = 'all';

export function TrendsPanel() {
  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | null>(null);
  const [impactFilter, setImpactFilter] = useState<Impact | FilterValue>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | FilterValue>('all');
  
  const filteredTrends = sampleTrends.filter(trend => {
    const matchesSentiment = !sentimentFilter || trend.sentiment === sentimentFilter;
    const matchesImpact = impactFilter === 'all' || trend.impact === impactFilter;
    // Simulate priority based on impact
    const trendPriority = trend.impact === 'high' ? 'urgent' : trend.impact === 'medium' ? 'medium' : 'low';
    const matchesPriority = priorityFilter === 'all' || trendPriority === priorityFilter;
    return matchesSentiment && matchesImpact && matchesPriority;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="sticky top-0 bg-[#f8f9fc] pt-2 pb-2 z-10 w-full dark:bg-gray-900">
        <h2 className="text-[16px] font-semibold mb-3 dark:text-gray-200">Current Market Trends</h2>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Sentiment</span>
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSentimentFilter(null)}
                      className={`h-7 text-[13px] ${sentimentFilter === null ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-[#667085]'}`}
                    >
                      <span className="text-[#667085]">All</span>
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
                        className={`h-7 text-[13px] capitalize ${sentimentFilter === sentiment ? 'bg-[#eaf4ff] text-[#006c8f] border-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400' : 'text-[#667085] dark:text-[#667085]'}`}
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
            <Select value={impactFilter} onValueChange={(value: Impact | FilterValue) => setImpactFilter(value)}>
              <SelectTrigger className="w-[120px] h-7 text-[13px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-[#667085]">All</SelectItem>
                <SelectItem value="high" className="text-[#667085]">High</SelectItem>
                <SelectItem value="medium" className="text-[#667085]">Medium</SelectItem>
                <SelectItem value="low" className="text-[#667085]">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <span className="text-[#1d2939] dark:text-[#1d2939] text-[14px] font-medium mb-2">Priority</span>
            <Select value={priorityFilter} onValueChange={(value: Priority | FilterValue) => setPriorityFilter(value)}>
              <SelectTrigger className="w-[120px] h-7 text-[13px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-[#667085]">All</SelectItem>
                <SelectItem value="urgent" className="text-[#667085]">Urgent</SelectItem>
                <SelectItem value="high" className="text-[#667085]">High</SelectItem>
                <SelectItem value="medium" className="text-[#667085]">Medium</SelectItem>
                <SelectItem value="low" className="text-[#667085]">Low</SelectItem>
              </SelectContent>
            </Select>
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
