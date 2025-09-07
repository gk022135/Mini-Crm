"use client";
import React, { useState } from "react";
import LeadForm from "./leadform";
import LeadList from "./leadlist";
import AgentWorkflow from "./agentworkflow";


export interface Lead {
  id?: number | string;
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  source?: string;
  interestLevel?: "High" | "Medium" | "Low" | "";
  industry: string;
  score?: number;
  assignedTeam?: string;
  createdAt?: string;
}

export type Industry = "saas" | "fintech" | "health" | "general";

export default function CRM() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("saas");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <main className="pt-20 max-w-7xl mx-auto p-6 space-y-6 flex-row">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            MiniCRM — Industry: {selectedIndustry}
          </h1>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value as Industry)}
            className="border p-2 rounded"
          >
            <option value="saas">SaaS</option>
            <option value="fintech">Fintech</option>
            <option value="health">Health</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LeadForm industry={selectedIndustry} onCreated={(lead) => setSelectedLead(lead)} />
            <LeadList industry={selectedIndustry} onSelect={(lead) => setSelectedLead(lead)} />
          </div>
        </div>
        <div className="space-y-6 w-full">
          <AgentWorkflow lead={selectedLead} industry={selectedIndustry} />
        </div>
      </main>
    </div>
  );
}
