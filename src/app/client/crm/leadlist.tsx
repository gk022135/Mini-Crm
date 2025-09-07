"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// ---- Types ----
export interface Lead {
  id: string | number;
  company: string;
  contactName: string;
  email: string;
  industry: string;
  score?: number;
  assignedTeam?: string;
}

interface LeadListProps {
  industry?: string;
  onSelect: (lead: Lead) => void;
}
// ---- Component ----
export default function LeadList({
  industry = "general",
  onSelect = () => {},
}: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Lead[]>("/api/leads", { params: { industry } });
      setLeads(res.data || []);
    } catch (err: any) {
      console.warn("Failed to fetch leads, using simulated list:", err?.message);

      // fallback simulated data
      setLeads([
        {
          id: 1,
          company: "Acme Corp",
          contactName: "Alice",
          email: "alice@acme.com",
          industry,
          score: 85,
          assignedTeam: "Senior Sales",
        },
        {
          id: 2,
          company: "Beta LLC",
          contactName: "Bob",
          email: "bob@beta.com",
          industry,
          score: 55,
          assignedTeam: "Junior Sales",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [industry]);

  return (
    <div id="leads" className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Leads — {industry}</h3>
        <button
          onClick={fetchLeads}
          className="text-sm px-3 py-1 border rounded"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="text-gray-500">No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Score</th>
                <th>Team</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50">
                  <td className="py-2">{lead.company}</td>
                  <td>{lead.contactName}</td>
                  <td>{lead.email}</td>
                  <td>{lead.score ?? "-"}</td>
                  <td>{lead.assignedTeam ?? "-"}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelect(lead)}
                        className="text-sm px-2 py-1 border rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await axios.post(`/api/workflow/start`, {
                              leadId: lead.id,
                            });
                            alert("Workflow started for lead " + lead.id);
                          } catch (err) {
                            console.warn(
                              "Failed to start workflow via API, simulating..."
                            );
                            alert("Workflow simulated for lead " + lead.id);
                          }
                        }}
                        className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Start Workflow
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
