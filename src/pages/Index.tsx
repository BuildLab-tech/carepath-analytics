
import { useState } from "react";
import { PatientJourney } from "@/components/PatientJourney";
import { PatientList } from "@/components/PatientList";
import { patients } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [contextId, setContextId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("all");

  // Filter patients based on contextId (for demo, we'll just filter by if contextId is in their name/email)
  const filteredPatients = contextId 
    ? patients.filter(p => 
        p.name.toLowerCase().includes(contextId.toLowerCase()) || 
        p.contactInfo.email.toLowerCase().includes(contextId.toLowerCase()) ||
        p.id.includes(contextId)
      )
    : patients;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-6">
        {/* Top level contextId search */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Global Search</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Context ID..."
              value={contextId}
              onChange={(e) => setContextId(e.target.value)}
              className="pl-9"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Search for patients across the system by context ID, name, or email
          </p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient list section */}
          <div className="border rounded-lg shadow-sm bg-card p-4">
            <h2 className="text-lg font-medium mb-4">Patients</h2>
            <PatientList 
              patients={filteredPatients} 
              selectedPatientId={selectedPatientId} 
              onSelectPatient={setSelectedPatientId}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>
          
          {/* Patient journey details */}
          <div className="md:col-span-2 border rounded-lg shadow-sm bg-card p-4">
            <PatientJourney 
              patientId={selectedPatientId} 
              dateFilter={dateFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
