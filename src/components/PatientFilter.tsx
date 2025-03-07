
import React from "react";
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
    <div className="space-y-1.5">
      <Label htmlFor="filter-section" className="text-sm font-medium">Filter Options</Label>
      <div className="grid grid-cols-2 gap-3">
        {/* Campaign type filter */}
        <div>
          <Select value={campaignType} onValueChange={setCampaignType}>
            <SelectTrigger id="campaign-type" className="text-xs h-9 bg-white/80 border-gray-200">
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
        <div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="date-filter" className="text-xs h-9 bg-white/80 border-gray-200">
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
