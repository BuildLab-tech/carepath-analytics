
import { useState } from "react";
import { PatientJourney } from "@/components/PatientJourney";

const Index = () => {
  const [contextId, setContextId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("all");

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden flex flex-col">
      <PatientJourney 
        patientId={selectedPatientId} 
        dateFilter={dateFilter}
        contextId={contextId}
      />
    </div>
  );
}

export default Index;
