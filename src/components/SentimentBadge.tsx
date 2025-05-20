
import { Sentiment } from "../types/market-research";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, LineChart } from "lucide-react";

interface SentimentBadgeProps {
  sentiment: Sentiment;
  className?: string;
}

export function SentimentBadge({ sentiment, className }: SentimentBadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-medium";
  
  const icons = {
    positive: <ThumbsUp className="w-3 h-3 mr-1 text-green-600" />,
    neutral: <LineChart className="w-3 h-3 mr-1 text-blue-600" />,
    negative: <ThumbsDown className="w-3 h-3 mr-1 text-red-600" />
  };
  
  return (
    <span className={cn(baseClass, `sentiment-${sentiment}`, className)}>
      {icons[sentiment]}
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}
