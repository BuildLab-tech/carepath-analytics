
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MailOpen, CreditCard, Calendar } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  journeyType?: "appointment" | "prepay" | "resultcall" | "guestpay" | string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  description, 
  className, 
  trend, 
  journeyType 
}: StatsCardProps) {
  // Get campaign type icon based on journey type
  const getCampaignIcon = () => {
    if (icon) return icon;
    
    switch (journeyType) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "prepay":
        return <ShoppingCart className="h-4 w-4" />;
      case "resultcall":
        return <MailOpen className="h-4 w-4" />;
      case "guestpay":
        return <CreditCard className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Get campaign type styling
  const getCampaignStyles = () => {
    switch (journeyType) {
      case "appointment":
        return "border-blue-200 bg-blue-50/50";
      case "prepay":
        return "border-purple-200 bg-purple-50/50";
      case "resultcall":
        return "border-amber-200 bg-amber-50/50";
      case "guestpay":
        return "border-cyan-200 bg-cyan-50/50";
      default:
        return className;
    }
  };

  // Get journey type display name
  const getJourneyTypeLabel = () => {
    switch (journeyType) {
      case "appointment":
        return "Appointment";
      case "prepay":
        return "Prepay";
      case "resultcall":
        return "ResultCall";
      case "guestpay":
        return "Guestpay";
      default:
        return journeyType ? journeyType.charAt(0).toUpperCase() + journeyType.slice(1) : "";
    }
  };

  return (
    <Card className={cn("overflow-hidden", getCampaignStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
          {journeyType && (
            <Badge 
              variant="outline" 
              className={cn(
                "ml-2 font-normal text-xs",
                journeyType === "appointment" && "bg-blue-500/10 text-blue-600 border-blue-500/20",
                journeyType === "prepay" && "bg-journey-prepay/10 text-journey-prepay border-journey-prepay/20",
                journeyType === "resultcall" && "bg-journey-results/10 text-journey-results border-journey-results/20",
                journeyType === "guestpay" && "bg-journey-guestpay/10 text-journey-guestpay border-journey-guestpay/20"
              )}
            >
              {getJourneyTypeLabel()}
            </Badge>
          )}
        </CardTitle>
        {getCampaignIcon() && (
          <div className={cn(
            "h-4 w-4",
            journeyType === "appointment" && "text-blue-600",
            journeyType === "prepay" && "text-journey-prepay",
            journeyType === "resultcall" && "text-journey-results",
            journeyType === "guestpay" && "text-journey-guestpay",
            !journeyType && "text-muted-foreground"
          )}>
            {getCampaignIcon()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
