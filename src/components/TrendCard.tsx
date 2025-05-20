
import { TrendItem } from "../types/market-research";
import { SentimentBadge } from "./SentimentBadge";
import { ImpactBadge } from "./ImpactBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TrendCardProps {
  trend: TrendItem;
}

export function TrendCard({ trend }: TrendCardProps) {
  return (
    <Card className={`mb-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in border-l-3 border-sentiment-${trend.sentiment}`}>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[16px] font-semibold">{trend.title}</h3>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SentimentBadge sentiment={trend.sentiment} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trend.sentiment} sentiment trend</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ImpactBadge impact={trend.impact} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trend.impact} impact trend</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <p className="text-[13px] text-gray-600 mb-3">{trend.description}</p>
        
        <div className="flex flex-wrap gap-1 justify-end">
          {trend.relatedTopics.slice(0, 2).map((topic, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-[13px]">
                    {topic}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Related topic: {topic}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {trend.relatedTopics.length > 2 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-[13px]">
                    +{trend.relatedTopics.length - 2}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trend.relatedTopics.length - 2} more related topics</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
