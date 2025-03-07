
import { useState, useEffect } from "react";
import { patients, Patient, getPatientById } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { PatientFilter } from "@/components/PatientFilter";
import { PatientStats } from "@/components/PatientStats";
import { PatientListContainer } from "@/components/PatientListContainer";
import { PatientDetail } from "@/components/PatientDetail";
import { ContextSearch } from "@/components/ContextSearch";
import { Card } from "@/components/ui/card";
import { IdCard } from "lucide-react";

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
  const [patientIdSearch, setPatientIdSearch] = useState("");
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

  // Filter patients based on contextId, patientIdSearch and search query
  const filteredByPatientId = patientIdSearch
    ? patients.filter(p => p.id.includes(patientIdSearch))
    : patients;

  const filteredByContext = localContextId && filteredByPatientId.length === filteredByPatientId.length
    ? filteredByPatientId.filter(p => 
        p.name.toLowerCase().includes(localContextId.toLowerCase()) || 
        p.contactInfo.email.toLowerCase().includes(localContextId.toLowerCase())
      )
    : filteredByPatientId;

  // Apply additional filters
  const filteredBySearch = filteredByContext.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contactInfo.phone.includes(searchQuery)
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
    <div className="container px-4 py-6 mx-auto max-h-screen overflow-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-medium tracking-tight">Patient Journey Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          View and track patient journeys across different campaign types
        </p>
      </header>
      
      {/* Search and Filter Section - All in one row */}
      <Card className="p-4 mb-6 border shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Context ID search */}
          <div className="md:col-span-3">
            <ContextSearch 
              contextId={patientIdSearch} 
              setContextId={setPatientIdSearch}
              label="Context ID"
              placeholder="Search by context ID..."
              icon={<IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
            />
          </div>
          
          {/* Patient ID search */}
          <div className="md:col-span-5">
            <ContextSearch 
              contextId={localContextId} 
              setContextId={setLocalContextId}
              label="Patient ID"
              placeholder="Search by patient ID..."
            />
          </div>
          
          {/* Filters */}
          <div className="md:col-span-4">
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
      
      {/* Stats Cards Section */}
      <div className="mb-6">
        <PatientStats filteredPatients={filteredPatients} />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[calc(100vh-350px)]">
        {/* Patient List Section */}
        <div className="flex flex-col h-full max-h-full bg-white/50 rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Patient List</h2>
          
          {/* Patient list */}
          <div className="flex-1 overflow-hidden">
            <PatientListContainer 
              patients={filteredPatients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={handleSelectPatient}
            />
          </div>
        </div>
        
        {/* Patient Detail Column */}
        <div className="md:col-span-2 flex flex-col max-h-full overflow-hidden bg-white/50 rounded-lg border p-4 shadow-sm">
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
