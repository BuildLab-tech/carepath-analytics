
import { Patient } from "@/lib/mockData";
import { PatientCard } from "@/components/PatientCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (patientId: string) => void;
}

export function PatientList({ patients, selectedPatientId, onSelectPatient }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.phone.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-3">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              selected={selectedPatientId === patient.id}
              onClick={() => onSelectPatient(patient.id)}
            />
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No patients found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
