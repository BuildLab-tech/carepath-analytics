
import { useState, useEffect } from "react";
import { patients, Patient, getPatientById } from "@/lib/mockData";
import { PatientList } from "@/components/PatientList";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function PatientJourney() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const isMobile = useIsMobile();

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

  return (
    <div className="container px-4 py-6 mx-auto h-[calc(100vh-2rem)]">
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h1 className="text-2xl font-medium tracking-tight">Patient Journey Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            View and track patient journeys across different campaign types
          </p>
        </header>
        
        <div className="grid flex-1 gap-6 overflow-hidden" style={{
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : selectedPatient 
              ? '300px 1fr' 
              : '1fr',
          gridTemplateRows: '1fr'
        }}>
          {/* Patients List Column */}
          {(!isMobile || (isMobile && mobileView === 'list')) && (
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-medium mb-4">Patients</h2>
              <PatientList 
                patients={patients}
                selectedPatientId={selectedPatientId}
                onSelectPatient={handleSelectPatient}
              />
            </div>
          )}
          
          {/* Patient Detail Column */}
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
                      <JourneyTimeline key={journey.id} journey={journey} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="active" className="m-0 space-y-6 pt-1 pb-4">
                    {selectedPatient.journeys.filter(j => j.status === 'active').map((journey) => (
                      <JourneyTimeline key={journey.id} journey={journey} />
                    ))}
                    
                    {selectedPatient.journeys.filter(j => j.status === 'active').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No active journeys
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="m-0 space-y-6 pt-1 pb-4">
                    {selectedPatient.journeys.filter(j => j.status === 'completed').map((journey) => (
                      <JourneyTimeline key={journey.id} journey={journey} />
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
          {!selectedPatient && (!isMobile || (isMobile && mobileView === 'detail')) && (
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
