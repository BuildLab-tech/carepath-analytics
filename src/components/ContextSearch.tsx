
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContextSearchProps {
  contextId: string;
  setContextId: (id: string) => void;
}

export function ContextSearch({ contextId, setContextId }: ContextSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by Context ID..."
        value={contextId}
        onChange={(e) => setContextId(e.target.value)}
        className="pl-9"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Search for patients by context ID, name, or email
      </p>
    </div>
  );
}
