
import { Patient } from "@/lib/mockData";
import { PatientCard } from "@/components/PatientCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (patientId: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export function PatientList({ 
  patients, 
  selectedPatientId, 
  onSelectPatient,
  dateFilter,
  setDateFilter
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [messageType, setMessageType] = useState("all");

  // Filter patients based on search query
  const filteredBySearch = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.phone.includes(searchQuery) ||
    patient.id.includes(searchQuery)
  );

  // Apply message type filter (this is a mock implementation, real one would filter based on actual message types)
  const filteredPatients = messageType === "all" 
    ? filteredBySearch 
    : filteredBySearch.filter(patient => {
        // Simple mock filtering for the demo
        switch(messageType) {
          case "prepay": 
            return patient.journeys.some(j => j.type === "prepay");
          case "results": 
            return patient.journeys.some(j => j.type === "results");
          case "guestpay": 
            return patient.journeys.some(j => j.type === "guestpay");
          default:
            return true;
        }
      });

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4 mb-4">
        {/* Patient search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Message type filter */}
          <div className="space-y-1.5">
            <Label htmlFor="message-type" className="text-xs">Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger id="message-type" className="text-xs h-8">
                <MessageSquare className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prepay">Prepay</SelectItem>
                <SelectItem value="results">Results</SelectItem>
                <SelectItem value="guestpay">Guest Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Date filter */}
          <div className="space-y-1.5">
            <Label htmlFor="date-filter" className="text-xs">Date Range</Label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger id="date-filter" className="text-xs h-8">
                <Calendar className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="1d">Last 24 Hours</SelectItem>
                <SelectItem value="3d">Last 3 Days</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Patient list */}
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
