
import { useState } from "react";
import { Journey, JourneyStep as JourneyStepType } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Clock, Info, ChevronRight, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface HorizontalTimelineProps {
  journey: Journey;
}

export function HorizontalTimeline({ journey }: HorizontalTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<JourneyStepType | null>(null);
  const { toast } = useToast();

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
        return 'Results';
      case 'guestpay':
        return 'Guest Payment';
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

  const getStepIcon = (step: JourneyStepType) => {
    switch (step.status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'active':
        return <Clock className="h-4 w-4 animate-pulse" />;
      case 'skipped':
        return <X className="h-4 w-4" />;
      default:
        return <span className="h-1.5 w-1.5 rounded-full bg-current inline-block" />;
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const handleStepClick = (step: JourneyStepType) => {
    setSelectedStep(step);
    toast({
      title: `${step.name}`,
      description: `${step.status} on ${step.timestamp ? formatDate(step.timestamp) : 'N/A'}`,
      duration: 3000,
    });
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md animate-scale-in border-t-2",
      journey.type === 'prepay' && "border-t-journey-prepay",
      journey.type === 'results' && "border-t-journey-results",
      journey.type === 'guestpay' && "border-t-journey-guestpay"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Badge 
            variant="outline" 
            className={cn(
              "font-normal",
              journey.type === 'prepay' && "bg-journey-prepay/10 text-journey-prepay border-journey-prepay/20",
              journey.type === 'results' && "bg-journey-results/10 text-journey-results border-journey-results/20",
              journey.type === 'guestpay' && "bg-journey-guestpay/10 text-journey-guestpay border-journey-guestpay/20"
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
        <div className="mt-4 relative">
          {/* Timeline Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0"></div>
          
          {/* Timeline Steps */}
          <div className="flex justify-between relative z-10">
            {journey.steps.map((step, index) => (
              <Dialog key={step.id}>
                <DialogTrigger asChild>
                  <div 
                    className="flex flex-col items-center w-full max-w-[100px] cursor-pointer group"
                    onClick={() => handleStepClick(step)}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center mb-2 transition-all",
                      "hover:ring-2 hover:ring-offset-2 hover:scale-110",
                      step.status === 'completed' && `bg-${journey.type}-light text-${journey.type} border-${journey.type}`,
                      step.status === 'active' && `bg-${journey.type}/20 text-${journey.type} ring-2 ring-${journey.type}/30`,
                      step.status === 'upcoming' && "bg-muted/50 text-muted-foreground hover:bg-muted/70",
                      step.status === 'skipped' && "bg-muted/30 text-muted-foreground hover:bg-muted/50",
                      journey.type === 'prepay' && step.status === 'completed' && "bg-journey-prepay/10 text-journey-prepay hover:ring-journey-prepay/50",
                      journey.type === 'results' && step.status === 'completed' && "bg-journey-results/10 text-journey-results hover:ring-journey-results/50",
                      journey.type === 'guestpay' && step.status === 'completed' && "bg-journey-guestpay/10 text-journey-guestpay hover:ring-journey-guestpay/50",
                      journey.type === 'prepay' && step.status === 'active' && "bg-journey-prepay/20 text-journey-prepay ring-journey-prepay/30 hover:ring-journey-prepay/50",
                      journey.type === 'results' && step.status === 'active' && "bg-journey-results/20 text-journey-results ring-journey-results/30 hover:ring-journey-results/50",
                      journey.type === 'guestpay' && step.status === 'active' && "bg-journey-guestpay/20 text-journey-guestpay ring-journey-guestpay/30 hover:ring-journey-guestpay/50",
                    )}
                    >
                      {getStepIcon(step)}
                    </div>
                    
                    {/* Connect line to next step */}
                    {index < journey.steps.length - 1 && (
                      <div className="absolute top-4 h-0.5 bg-gray-100 z-0" style={{
                        left: `${(index * 100) / (journey.steps.length - 1)}%`, 
                        width: `${100 / (journey.steps.length - 1)}%`
                      }}></div>
                    )}
                    
                    <div className="text-center group-hover:font-medium transition-all">
                      <p className={cn(
                        "text-xs font-medium truncate w-20",
                        step.status === 'completed' && "text-foreground",
                        step.status === 'active' && 
                          (journey.type === 'prepay' ? "text-journey-prepay" : 
                           journey.type === 'results' ? "text-journey-results" : 
                           "text-journey-guestpay"),
                        step.status === 'upcoming' && "text-muted-foreground",
                        step.status === 'skipped' && "text-muted-foreground line-through"
                      )}>
                        {step.name}
                      </p>
                      {step.timestamp && (
                        <span className="text-xs text-muted-foreground block mt-1">
                          {formatTime(step.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <span className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center mr-2",
                        step.status === 'completed' && `bg-${journey.type}-light text-${journey.type}`,
                        step.status === 'active' && `bg-${journey.type}/20 text-${journey.type}`,
                        step.status === 'upcoming' && "bg-muted/50 text-muted-foreground",
                        step.status === 'skipped' && "bg-muted/30 text-muted-foreground",
                        journey.type === 'prepay' && step.status === 'completed' && "bg-journey-prepay/10 text-journey-prepay",
                        journey.type === 'results' && step.status === 'completed' && "bg-journey-results/10 text-journey-results",
                        journey.type === 'guestpay' && step.status === 'completed' && "bg-journey-guestpay/10 text-journey-guestpay",
                        journey.type === 'prepay' && step.status === 'active' && "bg-journey-prepay/20 text-journey-prepay",
                        journey.type === 'results' && step.status === 'active' && "bg-journey-results/20 text-journey-results",
                        journey.type === 'guestpay' && step.status === 'active' && "bg-journey-guestpay/20 text-journey-guestpay",
                      )}>
                        {getStepIcon(step)}
                      </span>
                      {step.name}
                    </DialogTitle>
                    <DialogDescription>
                      {step.status.charAt(0).toUpperCase() + step.status.slice(1)} 
                      {step.timestamp && ` on ${formatDate(step.timestamp)} at ${formatTime(step.timestamp)}`}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {step.details && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Details</h4>
                        <p className="text-sm text-muted-foreground">{step.details}</p>
                      </div>
                    )}
                    
                    {step.metadata && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Metadata</h4>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <pre className="text-xs overflow-auto whitespace-pre-wrap">
                            {JSON.stringify(step.metadata, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Status</h4>
                      <Badge className={cn(
                        step.status === 'completed' && "bg-green-100 text-green-800",
                        step.status === 'active' && "bg-blue-100 text-blue-800",
                        step.status === 'upcoming' && "bg-gray-100 text-gray-800",
                        step.status === 'skipped' && "bg-yellow-100 text-yellow-800"
                      )}>
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                      </Badge>
                    </div>
                    
                    {step.actions && step.actions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Actions</h4>
                        <div className="flex gap-2">
                          {step.actions.map((action, i) => (
                            <Badge key={i} variant="outline" className="cursor-pointer hover:bg-secondary">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
