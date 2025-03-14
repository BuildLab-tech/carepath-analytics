
import React from "react";
import { User, ActivitySquare, Clock, CheckCircle, Calendar, ShoppingCart, MailOpen, CreditCard } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Patient } from "@/lib/mockData";

interface PatientStatsProps {
  filteredPatients: Patient[];
}

export function PatientStats({ filteredPatients }: PatientStatsProps) {
  // Calculate statistics
  const getJourneyStats = () => {
    // Total number of patients
    const totalPatients = filteredPatients.length;
    
    // Total number of journeys
    const totalJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.length, 0);
    
    // Count journeys by status
    const activeJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.status === 'active').length, 0);
    
    const completedJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.status === 'completed').length, 0);
    
    // Count journeys by type
    const appointmentJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.type === 'appointment').length, 0);
    
    const prepayJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.type === 'prepay').length, 0);
    
    const resultCallJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.type === 'results').length, 0);
    
    const guestpayJourneys = filteredPatients.reduce((acc, patient) => 
      acc + patient.journeys.filter(j => j.type === 'guestpay').length, 0);
    
    const completionRate = totalJourneys ? Math.round((completedJourneys / totalJourneys) * 100) : 0;
    
    return {
      totalPatients,
      totalJourneys,
      activeJourneys,
      completedJourneys,
      appointmentJourneys,
      prepayJourneys,
      resultCallJourneys,
      guestpayJourneys,
      completionRate
    };
  };
  
  const stats = getJourneyStats();

  return (
    <>
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Patients" 
          value={stats.totalPatients}
          icon={<User className="h-4 w-4" />}
          description="Number of patients in the system"
        />
        <StatsCard 
          title="Total Journeys" 
          value={stats.totalJourneys}
          icon={<ActivitySquare className="h-4 w-4" />}
          description="Total patient journeys"
        />
        <StatsCard 
          title="Active Journeys" 
          value={stats.activeJourneys}
          icon={<Clock className="h-4 w-4" />}
          description="Journeys currently in progress"
          className="border-blue-200 bg-blue-50/50"
        />
        <StatsCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`}
          icon={<CheckCircle className="h-4 w-4" />}
          description="Percentage of completed journeys"
          className="border-green-200 bg-green-50/50"
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      {/* Campaign Type Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Appointment Journeys" 
          value={stats.appointmentJourneys}
          journeyType="appointment"
          description="Scheduled appointment journeys"
        />
        <StatsCard 
          title="Prepay Journeys" 
          value={stats.prepayJourneys}
          journeyType="prepay"
          description="Pre-payment campaign journeys"
        />
        <StatsCard 
          title="ResultCall Journeys" 
          value={stats.resultCallJourneys}
          journeyType="resultcall"
          description="Results notification journeys"
        />
        <StatsCard 
          title="Guestpay Journeys" 
          value={stats.guestpayJourneys}
          journeyType="guestpay"
          description="Guest payment journeys"
        />
      </div>
    </>
  );
}
