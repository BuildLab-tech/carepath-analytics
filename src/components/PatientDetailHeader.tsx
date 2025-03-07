
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Patient } from "@/lib/mockData";
import { User, Mail, Phone } from "lucide-react";

interface PatientDetailHeaderProps {
  patient: Patient;
}

export function PatientDetailHeader({ patient }: PatientDetailHeaderProps) {
  // Get the initials of the patient's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
        <Avatar className="h-16 w-16">
          <AvatarImage src={patient.avatar} />
          <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{patient.name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <User className="h-4 w-4 mr-1" /> {patient.age}, {patient.gender}
          </CardDescription>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{patient.contactInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{patient.contactInfo.phone}</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
