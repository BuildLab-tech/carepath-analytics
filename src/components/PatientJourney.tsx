
import { useState, useEffect } from "react";
import { patients, Patient, getPatientById, Journey } from "@/lib/mockData";
import { PatientCard } from "@/components/PatientCard";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, ChevronLeft, Search, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  const [messageType, setMessageType] = useState("all");
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

  // Get patient initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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

  // Apply message type filter
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
    <div className="container px-4 py-6 mx-auto h-[calc(100vh-2rem)]">
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h1 className="text-2xl font-medium tracking-tight">Patient Journey Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            View and track patient journeys across different campaign types
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Patient List Section with filters */}
          <div className="flex flex-col space-y-6 h-full overflow-hidden">
            <div className="space-y-4">
              {/* Context ID search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Context ID..."
                  value={localContextId}
                  onChange={(e) => setLocalContextId(e.target.value)}
                  className="pl-9"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Search for patients by context ID, name, or email
                </p>
              </div>

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
                  <Select value={localDateFilter} onValueChange={setLocalDateFilter}>
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
                    onClick={() => handleSelectPatient(patient.id)}
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
          
          {/* Patient Detail Column */}
          <div className="md:col-span-2 flex flex-col h-full overflow-hidden">
            {selectedPatient && (!isMobile || (isMobile && mobileView === 'detail')) && (
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
                
                {/* Patient Header */}
                <Card className="mb-6">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedPatient.avatar} />
                      <AvatarFallback>{getInitials(selectedPatient.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{selectedPatient.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-1" /> {selectedPatient.age}, {selectedPatient.gender}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{selectedPatient.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{selectedPatient.contactInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                {/* Journey Tabs */}
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  Patient Journeys
                  <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">
                    {selectedPatient.journeys.length}
                  </Badge>
                </h2>
                
                <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Journeys</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="flex-1">
                    <TabsContent value="all" className="m-0 space-y-6 pt-1 pb-4">
                      {selectedPatient.journeys.map((journey) => (
                        <HorizontalTimeline key={journey.id} steps={journey.steps} />
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="active" className="m-0 space-y-6 pt-1 pb-4">
                      {selectedPatient.journeys.filter(j => j.status === 'active').map((journey) => (
                        <HorizontalTimeline key={journey.id} steps={journey.steps} />
                      ))}
                      
                      {selectedPatient.journeys.filter(j => j.status === 'active').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No active journeys
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed" className="m-0 space-y-6 pt-1 pb-4">
                      {selectedPatient.journeys.filter(j => j.status === 'completed').map((journey) => (
                        <HorizontalTimeline key={journey.id} steps={journey.steps} />
                      ))}
                      
                      {selectedPatient.journeys.filter(j => j.status === 'completed').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No completed journeys
                        </div>
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
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
    </div>
  );
}
