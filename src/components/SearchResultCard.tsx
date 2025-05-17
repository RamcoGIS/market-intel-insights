
import { SearchResult } from "../types/market-research";
import { SentimentBadge } from "./SentimentBadge";
import { ImpactBadge } from "./ImpactBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-semibold hover:text-brand-primary transition-colors flex items-center gap-1"
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
          <div className="flex flex-col gap-2 text-xs text-gray-500">
            <span>{result.source}</span>
            <span>{new Date(result.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          {result.summary.map((point, index) => (
            <li key={index} className="text-sm">{point}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block"
                >
                  <SentimentBadge sentiment={result.sentiment} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View article with {result.sentiment} sentiment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block"
                >
                  <ImpactBadge impact={result.impact} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View article with {result.impact} impact</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
