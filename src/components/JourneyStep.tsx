
import { JourneyStep as JourneyStepType, JourneyType } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Check, Clock, Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface JourneyStepProps {
  step: JourneyStepType;
  journeyType: JourneyType;
}

export function JourneyStep({ step, journeyType }: JourneyStepProps) {
  const getStepIcon = () => {
    switch (step.status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'active':
        return <Clock className="h-4 w-4 animate-pulse" />;
      case 'skipped':
        return <X className="h-4 w-4" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-current" />;
    }
  };
  
  const getStepColor = () => {
    switch (journeyType) {
      case 'prepay':
        return 'text-journey-prepay';
      case 'results':
        return 'text-journey-results';
      case 'guestpay':
        return 'text-journey-guestpay';
      case 'appointment':
        return 'text-blue-600';
      case 'awo':
        return 'text-green-600';
      default:
        return 'text-journey-default';
    }
  };
  
  const getStepBackground = () => {
    const baseClasses = "journey-step-dot";
    
    return cn(baseClasses, 
      step.status === 'completed' ? 
        `bg-${journeyType === 'prepay' ? 'journey-prepay' : 
          journeyType === 'results' ? 'journey-results' : 
          journeyType === 'guestpay' ? 'journey-guestpay' : 
          journeyType === 'appointment' ? 'blue-600' :
          journeyType === 'awo' ? 'green-600' :
          'journey-default'}/10 text-${journeyType === 'prepay' ? 'journey-prepay' : 
          journeyType === 'results' ? 'journey-results' : 
          journeyType === 'guestpay' ? 'journey-guestpay' : 
          journeyType === 'appointment' ? 'blue-600' :
          journeyType === 'awo' ? 'green-600' :
          'journey-default'}` : 
      step.status === 'active' ? 
        `bg-${journeyType === 'prepay' ? 'journey-prepay' : 
          journeyType === 'results' ? 'journey-results' : 
          journeyType === 'guestpay' ? 'journey-guestpay' : 
          journeyType === 'appointment' ? 'blue-600' :
          journeyType === 'awo' ? 'green-600' :
          'journey-default'}/20 text-${journeyType === 'prepay' ? 'journey-prepay' : 
          journeyType === 'results' ? 'journey-results' : 
          journeyType === 'guestpay' ? 'journey-guestpay' : 
          journeyType === 'appointment' ? 'blue-600' :
          journeyType === 'awo' ? 'green-600' :
          'journey-default'}` : 
      step.status === 'upcoming' ? 
        "bg-muted/50 text-muted-foreground" : 
        "bg-muted/30 text-muted-foreground"
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="journey-step animate-fade-in" style={{animationDelay: `${parseInt(step.id.replace('s', '')) * 50}ms`}}>
      <div className={cn(
        getStepBackground(), 
        step.status === 'active' && "ring-2",
        step.status === 'active' && journeyType === 'prepay' && "ring-journey-prepay/30",
        step.status === 'active' && journeyType === 'results' && "ring-journey-results/30",
        step.status === 'active' && journeyType === 'guestpay' && "ring-journey-guestpay/30",
        step.status === 'active' && journeyType === 'appointment' && "ring-blue-600/30",
        step.status === 'active' && journeyType === 'awo' && "ring-green-600/30",
        step.status === 'active' && journeyType !== 'prepay' && journeyType !== 'results' && journeyType !== 'guestpay' && journeyType !== 'appointment' && journeyType !== 'awo' && "ring-journey-default/30"
      )}>
        {getStepIcon()}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium text-sm",
            step.status === 'completed' && "text-foreground",
            step.status === 'active' && getStepColor(),
            step.status === 'upcoming' && "text-muted-foreground",
            step.status === 'skipped' && "text-muted-foreground line-through"
          )}>
            {step.name}
          </span>
          
          {step.details && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button className="rounded-full p-0.5 hover:bg-muted/50 transition-colors">
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{step.details}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {step.timestamp && (
          <span className="text-xs text-muted-foreground">
            {formatDate(step.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}
