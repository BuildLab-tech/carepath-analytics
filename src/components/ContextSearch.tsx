
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContextSearchProps {
  contextId: string;
  setContextId: (id: string) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ContextSearch({ 
  contextId, 
  setContextId, 
  label = "Search Patients",
  placeholder = "Search by patient name, email...",
  icon = <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />,
  className = ""
}: ContextSearchProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor="context-search" className="text-sm font-medium">{label}</Label>
      <div className="relative">
        {icon}
        <Input
          id="context-search"
          placeholder={placeholder}
          value={contextId}
          onChange={(e) => setContextId(e.target.value)}
          className="pl-9 bg-white/80 border-gray-200 focus-visible:border-gray-300"
        />
      </div>
    </div>
  );
}
