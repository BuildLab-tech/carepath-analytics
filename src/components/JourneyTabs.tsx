
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
  return (
    <Tabs defaultValue="all" className="flex-1 flex flex-col h-full overflow-hidden">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Journeys</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      {/* All journeys tab */}
      <TabsContent value="all" className="m-0 pt-1 flex-1 h-full overflow-hidden">
        <ScrollArea className="h-full" orientation="horizontal">
          <div className="flex flex-nowrap gap-6 pr-4 min-w-max">
            {journeys.map((journey) => (
              <div key={journey.id} className="mb-6 w-[600px] min-w-[600px] max-w-[600px]">
                <div className="flex items-center mb-2">
                  <Badge className="mr-2 capitalize">
                    {journey.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Campaign Type: <span className="font-medium">{journey.type}</span>
                  </span>
                </div>
                <HorizontalTimeline steps={journey.steps} />
              </div>
            ))}
            
            {journeys.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No journeys found
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
      
      {/* Active journeys tab */}
      <TabsContent value="active" className="m-0 pt-1 flex-1 h-full overflow-hidden">
        <ScrollArea className="h-full" orientation="horizontal">
          <div className="flex flex-nowrap gap-6 pr-4 min-w-max">
            {journeys.filter(j => j.status === 'active').map((journey) => (
              <div key={journey.id} className="mb-6 w-[600px] min-w-[600px] max-w-[600px]">
                <div className="flex items-center mb-2">
                  <Badge className="mr-2 capitalize">
                    {journey.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Campaign Type: <span className="font-medium">{journey.type}</span>
                  </span>
                </div>
                <HorizontalTimeline steps={journey.steps} />
              </div>
            ))}
            
            {journeys.filter(j => j.status === 'active').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No active journeys
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
      
      {/* Completed journeys tab */}
      <TabsContent value="completed" className="m-0 pt-1 flex-1 h-full overflow-hidden">
        <ScrollArea className="h-full" orientation="horizontal">
          <div className="flex flex-nowrap gap-6 pr-4 min-w-max">
            {journeys.filter(j => j.status === 'completed').map((journey) => (
              <div key={journey.id} className="mb-6 w-[600px] min-w-[600px] max-w-[600px]">
                <div className="flex items-center mb-2">
                  <Badge className="mr-2 capitalize">
                    {journey.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Campaign Type: <span className="font-medium">{journey.type}</span>
                  </span>
                </div>
                <HorizontalTimeline steps={journey.steps} />
              </div>
            ))}
            
            {journeys.filter(j => j.status === 'completed').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No completed journeys
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
