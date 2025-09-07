"use client";
import React from "react";

// --- Types ---
export type Agent = {
  id: number;
  name: string;
  description: string;
  color?: string;
};

export type AgentResult =
  | { status: "pending" | "processing"; result?: undefined }
  | {
      status: "completed";
      result:
        | { enrichedData: { jobTitle: string; companySize: string } } // id = 1
        | { score: number; factors?: { factor: string; score: number }[] } // id = 2
        | { assignedTo: string; reasoning: string }; // id = 3
    };

interface AgentCardProps {
  agent: Agent;
  result?: AgentResult;
}

// --- Component ---
export default function AgentCard({
  agent,
  result = { status: "pending" },
}: AgentCardProps) {
  const statusColor =
    result.status === "completed"
      ? "text-green-600"
      : result.status === "processing"
      ? "text-yellow-600"
      : "text-gray-400";

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{agent.name}</h4>
          <p className="text-sm text-gray-600">{agent.description}</p>
        </div>
        <div className={statusColor + " font-medium"}>
          {result.status.toUpperCase()}
        </div>
      </div>

      {result.status === "completed" && result.result && (
        <div className="mt-3 text-sm space-y-2">
          {/* Render different UIs by agent id */}
          {agent.id === 1 && "enrichedData" in result.result && (
            <div>
              <p>
                <strong>Job:</strong> {result.result.enrichedData.jobTitle}
              </p>
              <p>
                <strong>Size:</strong> {result.result.enrichedData.companySize}
              </p>
            </div>
          )}
          {agent.id === 2 && "score" in result.result && (
            <div>
              <p>
                <strong>Score:</strong> {result.result.score}/100
              </p>
              <div className="mt-2 space-y-1">
                {result.result.factors?.map((f, i) => (
                  <div key={i} className="text-xs">
                    {f.factor}: {f.score}
                  </div>
                ))}
              </div>
            </div>
          )}
          {agent.id === 3 && "assignedTo" in result.result && (
            <div>
              <p>
                <strong>Assigned To:</strong> {result.result.assignedTo}
              </p>
              <p className="text-xs mt-2 text-gray-700">
                {result.result.reasoning}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
