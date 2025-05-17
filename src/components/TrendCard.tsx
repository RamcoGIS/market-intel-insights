
import { TrendItem } from "../types/market-research";
import { SentimentBadge } from "./SentimentBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrendCardProps {
  trend: TrendItem;
}

export function TrendCard({ trend }: TrendCardProps) {
  // Calculate color based on strength
  const getStrengthColor = (strength: number) => {
    if (strength >= 8) return "bg-purple-600";
    if (strength >= 5) return "bg-purple-400";
    return "bg-purple-200";
  };

  return (
    <Card className="mb-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className={`h-1.5 w-full ${getStrengthColor(trend.strength)}`} />
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{trend.title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium">Strength:</span>
            <span className="text-sm font-bold">{trend.strength}/10</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <SentimentBadge sentiment={trend.sentiment} />
          </div>
          <div className="flex flex-wrap gap-1 max-w-[70%] justify-end">
            {trend.relatedTopics.slice(0, 2).map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {trend.relatedTopics.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{trend.relatedTopics.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
