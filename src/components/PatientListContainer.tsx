
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PatientCard } from "@/components/PatientCard";
import { Patient } from "@/lib/mockData";

interface PatientListContainerProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (patientId: string) => void;
}

export function PatientListContainer({ 
  patients, 
  selectedPatientId, 
  onSelectPatient 
}: PatientListContainerProps) {
  return (
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-4 pb-4">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              selected={selectedPatientId === patient.id}
              onClick={() => onSelectPatient(patient.id)}
            />
          ))}
          
          {patients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No patients found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
