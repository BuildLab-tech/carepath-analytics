
import React from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContextSearchProps {
  contextId: string;
  setContextId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ContextSearch({ 
  contextId, 
  setContextId, 
  searchQuery, 
  setSearchQuery 
}: ContextSearchProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      {/* Context ID search */}
      <div className="flex-1">
        <Label htmlFor="context-search" className="text-xs font-medium mb-1 block">Context ID</Label>
        <div className="relative">
          <Users className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="context-search"
            placeholder="Filter by context ID..."
            value={contextId}
            onChange={(e) => setContextId(e.target.value)}
            className="pl-7 py-1 h-8 text-sm bg-white/80 border-gray-200 focus-visible:border-gray-300"
          />
        </div>
      </div>

      {/* Patient search */}
      <div className="flex-1">
        <Label htmlFor="patient-search" className="text-xs font-medium mb-1 block">Search Patients</Label>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="patient-search"
            placeholder="Search name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 py-1 h-8 text-sm bg-white/80 border-gray-200 focus-visible:border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
