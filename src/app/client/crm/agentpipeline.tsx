"use client";
import React from "react";
import AgentCard from "./agentcard";

// Import types from AgentCard
import type { Agent, AgentResult } from "./agentcard";

interface AgentPipelineProps {
  agents: Agent[];
  results?: AgentResult[];
}

export default function AgentPipeline({
  agents = [],
  results = [],
}: AgentPipelineProps) {
  return (
    <div id="workflow" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {agents.map((a, idx) => (
        <AgentCard
          key={a.id}
          agent={a}
          result={results[idx] ?? { status: "pending" }}
        />
      ))}
    </div>
  );
}
