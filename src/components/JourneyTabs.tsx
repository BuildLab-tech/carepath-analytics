
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { Journey } from "@/lib/mockData";

interface JourneyTabsProps {
  journeys: Journey[];
}

export function JourneyTabs({ journeys }: JourneyTabsProps) {
  // Helper function to sort journeys by type
  const sortJourneys = (journeysToSort: Journey[]) => {
    return [...journeysToSort].sort((a, b) => {
      // Appointment type should come first
      if (a.type === 'appointment' && b.type !== 'appointment') return -1;
      if (a.type !== 'appointment' && b.type === 'appointment') return 1;
      
      // For other types, maintain the original order
      return 0;
    });
  };
  
  // Helper function to get journey type label
  const getJourneyTypeLabel = (type: string) => {
    switch (type) {
      case 'results':
        return 'Results Call';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <Tabs defaultValue="all" className="w-full h-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Journeys</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      {/* All journeys tab */}
      <TabsContent value="all" className="tabs-content">
        <div className="space-y-6 pr-4 pb-4">
          {sortJourneys(journeys).map((journey) => (
            <div key={journey.id} className="mb-6 w-full">
              <div className="flex items-center mb-2">
                <Badge className="mr-2 capitalize">
                  {journey.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Campaign Type: <span className="font-medium">{getJourneyTypeLabel(journey.type)}</span>
                </span>
              </div>
              <div className="overflow-x-auto">
                <HorizontalTimeline steps={journey.steps} />
              </div>
            </div>
          ))}
          
          {journeys.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No journeys found
            </div>
          )}
        </div>
      </TabsContent>
      
      {/* Active journeys tab */}
      <TabsContent value="active" className="tabs-content">
        <div className="space-y-6 pr-4 pb-4">
          {sortJourneys(journeys.filter(j => j.status === 'active')).map((journey) => (
            <div key={journey.id} className="mb-6 w-full">
              <div className="flex items-center mb-2">
                <Badge className="mr-2 capitalize">
                  {journey.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Campaign Type: <span className="font-medium">{getJourneyTypeLabel(journey.type)}</span>
                </span>
              </div>
              <div className="overflow-x-auto">
                <HorizontalTimeline steps={journey.steps} />
              </div>
            </div>
          ))}
          
          {journeys.filter(j => j.status === 'active').length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No active journeys
            </div>
          )}
        </div>
      </TabsContent>
      
      {/* Completed journeys tab */}
      <TabsContent value="completed" className="tabs-content">
        <div className="space-y-6 pr-4 pb-4">
          {sortJourneys(journeys.filter(j => j.status === 'completed')).map((journey) => (
            <div key={journey.id} className="mb-6 w-full">
              <div className="flex items-center mb-2">
                <Badge className="mr-2 capitalize">
                  {journey.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Campaign Type: <span className="font-medium">{getJourneyTypeLabel(journey.type)}</span>
                </span>
              </div>
              <div className="overflow-x-auto">
                <HorizontalTimeline steps={journey.steps} />
              </div>
            </div>
          ))}
          
          {journeys.filter(j => j.status === 'completed').length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No completed journeys
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
