
import { Journey, JourneyType } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JourneyStep } from "@/components/JourneyStep";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JourneyTimelineProps {
  journey: Journey;
}

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getJourneyTypeLabel = (type: string) => {
    switch (type) {
      case 'prepay':
        return 'Pre-Payment';
      case 'results':
        return 'Results Call';
      case 'guestpay':
        return 'Guest Payment';
      case 'appointment':
        return 'Appointment';
      case 'awo':
        return 'AWO';
      default:
        return type;
    }
  };

  const getJourneyStatusBadge = () => {
    switch (journey.status) {
      case 'active':
        return <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md animate-scale-in border-t-2",
      journey.type === 'prepay' && "border-t-journey-prepay",
      journey.type === 'results' && "border-t-journey-results",
      journey.type === 'guestpay' && "border-t-journey-guestpay",
      journey.type === 'appointment' && "border-t-blue-600",
      journey.type === 'awo' && "border-t-green-600"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Badge 
            variant="outline" 
            className={cn(
              "font-normal",
              journey.type === 'prepay' && "bg-journey-prepay/10 text-journey-prepay border-journey-prepay/20",
              journey.type === 'results' && "bg-journey-results/10 text-journey-results border-journey-results/20",
              journey.type === 'guestpay' && "bg-journey-guestpay/10 text-journey-guestpay border-journey-guestpay/20",
              journey.type === 'appointment' && "bg-blue-600/10 text-blue-600 border-blue-600/20",
              journey.type === 'awo' && "bg-green-600/10 text-green-600 border-green-600/20"
            )}
          >
            {getJourneyTypeLabel(journey.type)}
          </Badge>
          {getJourneyStatusBadge()}
        </div>
        <CardTitle className="text-lg font-medium mt-2">{journey.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {formatDate(journey.startDate)}
          {journey.endDate && ` - ${formatDate(journey.endDate)}`}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mt-2">
          {journey.steps.map((step) => (
            <JourneyStep
              key={step.id}
              step={step}
              journeyType={journey.type}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
