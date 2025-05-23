
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, ArrowUp, Minus } from "lucide-react";

type Priority = 'urgent' | 'high' | 'medium' | 'low';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-medium";
  
  const icons = {
    urgent: <AlertTriangle className="w-3 h-3 mr-1" />,
    high: <ArrowUp className="w-3 h-3 mr-1" />,
    medium: <Clock className="w-3 h-3 mr-1" />,
    low: <Minus className="w-3 h-3 mr-1" />
  };
  
  const styles = {
    urgent: "bg-red-100 text-red-800 border border-red-200",
    high: "bg-orange-100 text-orange-800 border border-orange-200", 
    medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    low: "bg-gray-100 text-gray-800 border border-gray-200"
  };
  
  return (
    <span className={cn(baseClass, styles[priority], className)}>
      {icons[priority]}
      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
    </span>
  );
}
