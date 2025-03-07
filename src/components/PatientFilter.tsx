
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Calendar } from "lucide-react";

interface PatientFilterProps {
  campaignType: string;
  setCampaignType: (type: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export function PatientFilter({
  campaignType,
  setCampaignType,
  dateFilter,
  setDateFilter
}: PatientFilterProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      {/* Campaign type filter */}
      <div className="flex-1">
        <Label htmlFor="campaign-type" className="text-xs font-medium mb-1 block">Campaign Type</Label>
        <Select value={campaignType} onValueChange={setCampaignType}>
          <SelectTrigger id="campaign-type" className="text-xs h-8 bg-white/80 border-gray-200">
            <MessageSquare className="h-3 w-3 mr-1" />
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
      <div className="flex-1">
        <Label htmlFor="date-filter" className="text-xs font-medium mb-1 block">Date Range</Label>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger id="date-filter" className="text-xs h-8 bg-white/80 border-gray-200">
            <Calendar className="h-3 w-3 mr-1" />
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
  );
}
