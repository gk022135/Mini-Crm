"use client";
import React, { useState } from "react";
import axios from "axios";
import AgentPipeline from "./agentpipeline";

// ---- Types ----
export type Agent = {
  id: number;
  name: string;
  description: string;
  color?: string;
};

type EnrichmentResult = {
  enrichedData: { jobTitle: string; companySize: string; industry?: string; recentNews?: string };
};

type ScoringResult = {
  score: number;
  factors?: { factor: string; score: number }[];
  tier?: string;
};

type RoutingResult = {
  assignedTo: string;
  reasoning: string;
  priority?: string;
};

export type AgentResult =
  | { status: "pending" | "processing" }
  | { status: "completed"; result: EnrichmentResult | ScoringResult | RoutingResult }
  | { status: "failed"; error: string };

interface Lead {
  id: string | number;
  company?: string;
  [key: string]: any;
}

interface AgentWorkflowProps {
  lead?: Lead | null;
  industry?: string;
}

// ---- Component ----
export default function AgentWorkflow({
  lead,
  industry = "general",
}: AgentWorkflowProps) {
  const defaultAgents: Agent[] = [
    { id: 1, name: "Lead Enrichment Agent", description: "Enrich lead info from public sources" },
    { id: 2, name: "AI Scoring Agent", description: "Score lead quality using AI" },
    { id: 3, name: "Routing Agent", description: "Route leads to correct team" },
  ];

  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<AgentResult[]>([
    { status: "pending" },
    { status: "pending" },
    { status: "pending" },
  ]);

  // Simulated results
  const simulateAgent = async (
    idx: number
  ): Promise<EnrichmentResult | ScoringResult | RoutingResult> => {
    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 2000));

    if (idx === 0) {
      return {
        enrichedData: {
          jobTitle: "Head of Growth",
          companySize: "200+",
          industry,
          recentNews: "Series A",
        },
      };
    }
    if (idx === 1) {
      return {
        score: 78,
        tier: "B",
        factors: [
          { factor: "Role", score: 80 },
          { factor: "Size", score: 75 },
        ],
      };
    }
    return {
      assignedTo: "Junior Sales",
      priority: "Medium",
      reasoning: "Good fit but medium score",
    };
  };

  const startWorkflow = async () => {
    if (!lead?.id) {
      alert("Select a lead first (click 'View' in Leads list).");
      return;
    }

    setProcessing(true);
    setResults([{ status: "processing" }, { status: "pending" }, { status: "pending" }]);

    try {
      const res = await axios.post("/api/workflow/run", { leadId: lead.id, industry });
      const backendResults = res.data;

      if (Array.isArray(backendResults) && backendResults.length === 3) {
        setResults(
          backendResults.map(
            (r): AgentResult => ({ status: "completed", result: r })
          )
        );
      } else {
        throw new Error("Unexpected backend response");
      }
    } catch (err: any) {
      console.warn("Backend workflow failed, running local simulation:", err?.message);

      for (let i = 0; i < defaultAgents.length; i++) {
        setResults((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, status: "processing" } : p))
        );

        try {
          const r = await simulateAgent(i);

          setResults((prev) =>
            prev.map((p, idx) =>
              idx === i ? { status: "completed", result: r } : p
            )
          );
        } catch (error) {
          setResults((prev) =>
            prev.map((p, idx) =>
              idx === i
                ? { status: "failed", error: String(error) }
                : p
            )
          );
        }
      }

      alert("Workflow completed (simulated).");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Agentic Workflow</h3>
          <p className="text-sm text-gray-600">
            Lead: {lead?.company ?? "—"} ({lead?.id ?? "no id"})
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={startWorkflow}
            disabled={processing || !lead}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {processing ? "Running..." : "Run Workflow"}
          </button>
        </div>
      </div>

      <AgentPipeline agents={defaultAgents} results={results} />
    </div>
  );
}
