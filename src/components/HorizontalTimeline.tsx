
import { useEffect, useState } from "react";
import { JourneyStep } from "@/lib/mockData";
import { CheckCircle, Clock, XCircle, ArrowRight, ChevronRight, Info } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type StepStatus = "completed" | "active" | "upcoming" | "skipped";

interface HorizontalTimelineProps {
  steps: JourneyStep[];
  onStepClick?: (step: JourneyStep) => void;
}

export function HorizontalTimeline({ steps, onStepClick }: HorizontalTimelineProps) {
  const { toast } = useToast();
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedStep) {
      setIsDialogOpen(true);
    }
  }, [selectedStep]);

  const handleStepClick = (step: JourneyStep) => {
    setSelectedStep(step);
    
    if (onStepClick) {
      onStepClick(step);
    }

    // Show toast notification
    toast({
      title: step.name,
      description: getStatusText(step.status),
      variant: getToastVariant(step.status),
    });
  };

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "active":
        return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      case "skipped":
        return <XCircle className="h-6 w-6 text-gray-400" />;
      case "upcoming":
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getToastVariant = (status: StepStatus): "default" | "destructive" => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "default";
      case "skipped":
        return "destructive";
      case "upcoming":
        return "default";
    }
  };

  const getStatusText = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return "Step completed";
      case "active":
        return "Step in progress";
      case "skipped":
        return "Step was skipped";
      case "upcoming":
        return "Step is upcoming";
    }
  };

  const getStepColor = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "active":
        return "bg-blue-500";
      case "skipped":
        return "bg-gray-300";
      case "upcoming":
        return "bg-gray-200";
    }
  };
  
  return (
    <>
      <div className="relative mt-4">
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              {/* Step Indicator */}
              <button
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border-2 relative shrink-0",
                  step.status === "completed" ? "border-green-500 bg-green-50" :
                  step.status === "active" ? "border-blue-500 bg-blue-50 animate-pulse" :
                  step.status === "skipped" ? "border-gray-300 bg-gray-50" :
                  "border-gray-200 bg-gray-50"
                )}
                onClick={() => handleStepClick(step)}
              >
                {getStatusIcon(step.status)}
              </button>

              {/* Step Details */}
              <div className="flex flex-col">
                {/* Step Label */}
                <div className="text-sm font-medium">
                  {step.name}
                </div>

                {/* Step Date */}
                {step.timestamp && (
                  <div className="text-xs text-gray-500">
                    {format(new Date(step.timestamp), "MMM d, h:mm a")}
                  </div>
                )}

                {/* Step Details (when available) */}
                {step.details && (
                  <div className="mt-1 text-xs text-gray-600 max-w-md">
                    {step.details}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedStep && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedStep.status)}
                {selectedStep.name}
              </DialogTitle>
              <DialogDescription>
                {selectedStep.timestamp && (
                  <span className="text-sm text-gray-500">
                    {format(new Date(selectedStep.timestamp), "PPP p")}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  Status
                </h4>
                <Badge 
                  variant={selectedStep.status === "completed" ? "default" : 
                         selectedStep.status === "active" ? "secondary" :
                         selectedStep.status === "skipped" ? "destructive" : "outline"}
                >
                  {getStatusText(selectedStep.status)}
                </Badge>
              </div>

              {selectedStep.details && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Details</h4>
                  <p className="text-sm text-gray-600">{selectedStep.details}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
