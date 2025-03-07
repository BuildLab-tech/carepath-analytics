
import { useState, useEffect } from "react";
import { patients, Patient, getPatientById } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { PatientFilter } from "@/components/PatientFilter";
import { PatientStats } from "@/components/PatientStats";
import { PatientListContainer } from "@/components/PatientListContainer";
import { PatientDetail } from "@/components/PatientDetail";
import { ContextSearch } from "@/components/ContextSearch";
import { Card } from "@/components/ui/card";

interface PatientJourneyProps {
  patientId: string | null;
  dateFilter: string;
  contextId?: string;
}

export function PatientJourney({ patientId, dateFilter, contextId = "" }: PatientJourneyProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(patientId);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [localDateFilter, setLocalDateFilter] = useState(dateFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignType, setCampaignType] = useState("all");
  const [localContextId, setLocalContextId] = useState(contextId);
  const isMobile = useIsMobile();

  // Update state when props change
  useEffect(() => {
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  }, [patientId]);

  useEffect(() => {
    setLocalDateFilter(dateFilter);
  }, [dateFilter]);

  useEffect(() => {
    setLocalContextId(contextId);
  }, [contextId]);

  // Update selected patient when ID changes
  useEffect(() => {
    if (selectedPatientId) {
      const patient = getPatientById(selectedPatientId);
      setSelectedPatient(patient || null);
      if (isMobile) {
        setMobileView('detail');
      }
    } else {
      setSelectedPatient(null);
    }
  }, [selectedPatientId, isMobile]);

  // Handle patient selection
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  // Handle back to list on mobile
  const handleBackToList = () => {
    setMobileView('list');
  };

  // Filter patients based on contextId and search query
  const filteredByContext = localContextId
    ? patients.filter(p => 
        p.name.toLowerCase().includes(localContextId.toLowerCase()) || 
        p.contactInfo.email.toLowerCase().includes(localContextId.toLowerCase()) ||
        p.id.includes(localContextId)
      )
    : patients;

  // Apply additional filters
  const filteredBySearch = filteredByContext.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.phone.includes(searchQuery) ||
    patient.id.includes(searchQuery)
  );

  // Apply campaign type filter
  const filteredPatients = campaignType === "all" 
    ? filteredBySearch 
    : filteredBySearch.filter(patient => {
        // Simple mock filtering for the demo
        switch(campaignType) {
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
    <div className="container px-2 sm:px-4 py-4 mx-auto h-full overflow-hidden flex flex-col">
      <header className="mb-3">
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight">Patient Journey Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          View and track patient journeys across different campaign types
        </p>
      </header>
      
      {/* Search and Filter Section - More compact */}
      <Card className="p-3 mb-4 border shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Context ID search */}
          <div className="md:col-span-2">
            <ContextSearch 
              contextId={localContextId} 
              setContextId={setLocalContextId} 
            />
          </div>
          
          {/* Filters */}
          <div>
            <PatientFilter 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              campaignType={campaignType}
              setCampaignType={setCampaignType}
              dateFilter={localDateFilter}
              setDateFilter={setLocalDateFilter}
            />
          </div>
        </div>
      </Card>
      
      {/* Stats Cards Section - More compact */}
      <div className="mb-4">
        <PatientStats filteredPatients={filteredPatients} />
      </div>
      
      {/* Main content grid - Adjusted height to prevent overflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Patient List Section */}
        <div className="flex flex-col h-full bg-white/50 rounded-lg border p-3 shadow-sm overflow-hidden">
          <h2 className="text-base font-medium mb-2">Patient List</h2>
          
          {/* Patient list - Now with proper overflow handling */}
          <div className="flex-1 overflow-hidden min-h-0">
            <PatientListContainer 
              patients={filteredPatients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={handleSelectPatient}
            />
          </div>
        </div>
        
        {/* Patient Detail Column */}
        <div className="md:col-span-2 flex flex-col h-full overflow-hidden bg-white/50 rounded-lg border p-3 shadow-sm">
          {selectedPatient && (!isMobile || (isMobile && mobileView === 'detail')) && (
            <PatientDetail
              patient={selectedPatient}
              isMobile={isMobile}
              handleBackToList={handleBackToList}
            />
          )}
          
          {/* Empty State */}
          {!selectedPatient && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2">No Patient Selected</h3>
                <p className="text-muted-foreground">
                  Select a patient from the list to view their journey details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
