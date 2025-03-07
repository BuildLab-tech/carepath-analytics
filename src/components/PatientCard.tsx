
import { Patient } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
  selected: boolean;
  onClick: () => void;
}

export function PatientCard({ patient, selected, onClick }: PatientCardProps) {
  // Get the initials of the patient's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Count active journeys
  const activeJourneys = patient.journeys.filter(journey => journey.status === 'active').length;

  return (
    <Card 
      className={cn(
        "patient-card cursor-pointer transition-all duration-300",
        selected ? "ring-2 ring-primary/30" : "hover:ring-1 hover:ring-primary/20"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-1 flex flex-row items-center space-x-3 space-y-0 px-4 pt-3">
        <Avatar className="h-10 w-10 transition-all">
          <AvatarImage 
            src={patient.avatar} 
            alt={patient.name} 
            className="object-cover transition-all duration-700"
          />
          <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-sm font-medium">{patient.name}</CardTitle>
          <CardDescription className="flex items-center text-xs mt-0.5">
            <User className="h-3 w-3 mr-1" /> {patient.age}, {patient.gender}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-1.5" /> 
            <span className="truncate">{patient.contactInfo.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-1.5" /> 
            <span>{patient.contactInfo.phone}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 justify-between">
          <div className="text-xs font-medium">{patient.journeys.length} Journeys</div>
          {activeJourneys > 0 && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {activeJourneys} Active
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
