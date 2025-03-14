
import React from "react";
import { Patient } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PatientDetailHeader } from "@/components/PatientDetailHeader";
import { JourneyTabs } from "@/components/JourneyTabs";

interface PatientDetailProps {
  patient: Patient;
  isMobile: boolean;
  handleBackToList: () => void;
}

export function PatientDetail({ patient, isMobile, handleBackToList }: PatientDetailProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden animate-fade-in">
      {/* Mobile Back Button */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 -ml-2 w-fit" 
          onClick={handleBackToList}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to patients
        </Button>
      )}
      
      {/* Patient ID */}
      <div className="flex items-center mb-3">
        <Hash className="h-4 w-4 mr-1.5 text-muted-foreground" />
        <span className="text-sm font-medium">{patient.id}</span>
        {patient.contextId && (
          <Badge variant="outline" className="ml-2 text-xs">
            Context: {patient.contextId}
          </Badge>
        )}
      </div>
      
      {/* Patient Header */}
      <PatientDetailHeader patient={patient} />
      
      {/* Journey Tabs */}
      <div className="flex flex-col overflow-hidden flex-1 mt-4">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          Patient Journeys
          <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">
            {patient.journeys.length}
          </Badge>
        </h2>
        
        <div className="flex-1 overflow-auto">
          <JourneyTabs journeys={patient.journeys} />
        </div>
      </div>
    </div>
  );
}
