
import { Impact } from "../types/market-research";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ImpactBadgeProps {
  impact: Impact;
  className?: string;
}

export function ImpactBadge({ impact, className }: ImpactBadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const classes = {
    high: "bg-impact-high text-white",
    medium: "bg-impact-medium text-white",
    low: "bg-impact-low text-gray-700",
  };
  
  return (
    <span className={cn(baseClass, classes[impact], className)}>
      {impact === 'high' && <TrendingUp className="w-3 h-3 mr-1" />}
      {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
    </span>
  );
}
