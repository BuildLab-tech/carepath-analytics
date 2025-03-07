
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Calendar } from "lucide-react";

interface PatientFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  campaignType: string;
  setCampaignType: (type: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export function PatientFilter({
  searchQuery,
  setSearchQuery,
  campaignType,
  setCampaignType,
  dateFilter,
  setDateFilter
}: PatientFilterProps) {
  return (
    <div className="space-y-4">
      {/* Patient search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Campaign type filter */}
        <div className="space-y-1.5">
          <Label htmlFor="campaign-type" className="text-xs">Campaign Type</Label>
          <Select value={campaignType} onValueChange={setCampaignType}>
            <SelectTrigger id="campaign-type" className="text-xs h-8">
              <MessageSquare className="h-3 w-3 mr-1.5" />
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="prepay">Prepay</SelectItem>
              <SelectItem value="results">Results</SelectItem>
              <SelectItem value="guestpay">Guest Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Date filter */}
        <div className="space-y-1.5">
          <Label htmlFor="date-filter" className="text-xs">Date Range</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="date-filter" className="text-xs h-8">
              <Calendar className="h-3 w-3 mr-1.5" />
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="1d">Last 24 Hours</SelectItem>
              <SelectItem value="3d">Last 3 Days</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
