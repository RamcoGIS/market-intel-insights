
import { Impact } from "../types/market-research";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ImpactBadgeProps {
  impact: Impact;
  className?: string;
}

export function ImpactBadge({ impact = "medium", className }: ImpactBadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-medium";
  
  const icons = {
    high: <TrendingUp className="w-3 h-3 mr-1" />,
    medium: <TrendingUp className="w-3 h-3 mr-1" />,
    low: <TrendingUp className="w-3 h-3 mr-1" />
  };
  
  // Ensure impact is defined with a fallback
  const safeImpact = impact || "medium";
  
  return (
    <span className={cn(baseClass, `impact-${safeImpact}`, className)}>
      {icons[safeImpact]}
      {safeImpact.charAt(0).toUpperCase() + safeImpact.slice(1)} Impact
    </span>
  );
}
