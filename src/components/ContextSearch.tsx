
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Context ID search */}
      <div className="space-y-1">
        <Label htmlFor="context-search" className="text-xs font-medium">Context ID Filter</Label>
        <div className="relative">
          <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="context-search"
            placeholder="Filter by context ID..."
            value={contextId}
            onChange={(e) => setContextId(e.target.value)}
            className="pl-8 py-1 h-8 text-sm bg-white/80 border-gray-200 focus-visible:border-gray-300"
          />
          <p className="text-xs text-muted-foreground mt-0.5 ml-1">
            Enter context ID to filter patients
          </p>
        </div>
      </div>

      {/* Patient search - separate from context */}
      <div className="space-y-1">
        <Label htmlFor="patient-search" className="text-xs font-medium">Search Patients</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="patient-search"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 py-1 h-8 text-sm bg-white/80 border-gray-200 focus-visible:border-gray-300"
          />
          <p className="text-xs text-muted-foreground mt-0.5 ml-1">
            Search within filtered results
          </p>
        </div>
      </div>
    </div>
  );
}
