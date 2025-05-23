
import { SearchResult } from "../types/market-research";
import { SentimentBadge } from "./SentimentBadge";
import { ImpactBadge } from "./ImpactBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  // Calculate priority based on impact for consistency
  const priority = result.impact === 'high' ? 'urgent' : result.impact === 'medium' ? 'medium' : 'low';

  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[16px] font-semibold hover:text-brand-primary transition-colors flex items-center gap-1"
                  >
                    {result.headline}
                    <ExternalLink className="h-4 w-4 inline-flex" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open article in new tab</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex items-center gap-2 mt-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SentimentBadge sentiment={result.sentiment} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{result.sentiment} sentiment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ImpactBadge impact={result.impact} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{result.impact} impact</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <PriorityBadge priority={priority} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{priority} priority</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 ml-4 text-right">
            <div className="flex items-center text-[13px] text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {new Date(result.date).toLocaleDateString()}
            </div>
            <span className="text-[13px] text-blue-500">{result.source}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          {result.summary.map((point, index) => (
            <li key={index} className="text-[13px]">{point}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
