
import React from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContextSearchProps {
  contextId: string;
  setContextId: (id: string) => void;
}

export function ContextSearch({ contextId, setContextId }: ContextSearchProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="context-search" className="text-sm font-medium">Search Patients</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="context-search"
          placeholder="Search by patient name, email or context ID..."
          value={contextId}
          onChange={(e) => setContextId(e.target.value)}
          className="pl-9 bg-white/80 border-gray-200 focus-visible:border-gray-300"
        />
        <p className="text-xs text-muted-foreground mt-1 ml-1">
          Enter any patient information to find matches
        </p>
      </div>
    </div>
  );
}
