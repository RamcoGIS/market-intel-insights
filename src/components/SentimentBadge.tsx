
import { Sentiment } from "../types/market-research";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface SentimentBadgeProps {
  sentiment: Sentiment;
  className?: string;
}

export function SentimentBadge({ sentiment, className }: SentimentBadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const classes = {
    positive: "bg-sentiment-positive text-green-800",
    neutral: "bg-sentiment-neutral text-gray-800",
    negative: "bg-sentiment-negative text-red-800",
  };

  const icons = {
    positive: <ThumbsUp className="w-3 h-3 mr-1" />,
    neutral: null,
    negative: <ThumbsDown className="w-3 h-3 mr-1" />
  };
  
  return (
    <span className={cn(baseClass, classes[sentiment], className)}>
      {icons[sentiment]}
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}
