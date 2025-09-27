"use client";

import React, { useState } from "react";
import { Bot, Zap, Target, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const AgentWorkflow = () => {
  const [leadData, setLeadData] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(0);
  const [agentResults, setAgentResults] = useState([
    { agent: 1, status: "pending" },
    { agent: 2, status: "pending" },
    { agent: 3, status: "pending" },
  ]);

  const agents = [
    {
      id: 1,
      name: "Lead Enrichment Agent",
      description: "Enriches lead information from LinkedIn and company databases",
      icon: Bot,
      gradient: "from-blue-500 to-cyan-500",
      color: "blue",
    },
    {
      id: 2,
      name: "AI Scoring Agent", 
      description: "Analyzes and scores lead quality using AI algorithms",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      color: "purple",
    },
    {
      id: 3,
      name: "Smart Routing Agent",
      description: "Routes leads to appropriate sales team with reasoning",
      icon: Target,
      gradient: "from-green-500 to-emerald-500", 
      color: "green",
    },
  ];

  const simulateAgent = async (agentIndex:any) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );

    switch (agentIndex) {
      case 0:
        return {
          enrichedData: {
            jobTitle: "VP of Sales",
            companySize: "500-1000 employees",
            industry: "SaaS",
            linkedinProfile: "https://linkedin.com/in/example",
            recentNews: "Company raised $50M Series B",
          },
        };
      case 1:
        return {
          score: 92,
          factors: [
            { factor: "Job Title Relevance", score: 95 },
            { factor: "Company Size Match", score: 90 },
            { factor: "Industry Fit", score: 88 },
            { factor: "Recent Funding", score: 95 },
          ],
          tier: "A+",
        };
      case 2:
        return {
          assignedTo: "Senior Sales Team",
          reasoning:
            "High-value prospect with VP-level title at growing SaaS company. Recent funding indicates strong budget potential.",
          priority: "High",
          expectedResponse: "2-3 business days",
        };
      default:
        return {};
    }
  };

  const processWorkflow = async () => {
    if (!leadData.company || !leadData.contactName || !leadData.email) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setCurrentAgent(0);
    setAgentResults([
      { agent: 1, status: "pending" },
      { agent: 2, status: "pending" },
      { agent: 3, status: "pending" },
    ]);

    for (let i = 0; i < 3; i++) {
      setCurrentAgent(i);
      setAgentResults((prev) =>
        prev.map((agent) =>
          agent.agent === i + 1 ? { ...agent, status: "processing" } : agent
        )
      );

      const result = await simulateAgent(i);

      setAgentResults((prev) =>
        prev.map((agent) =>
          agent.agent === i + 1
            ? { ...agent, status: "completed", result }
            : agent
        )
      );
    }

    setIsProcessing(false);
  };

  const getStatusIcon = (status:any) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Agentic AI Workflow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform leads through intelligent automation with our 3-agent pipeline: 
              <span className="font-semibold text-blue-600"> Enrichment</span> →
              <span className="font-semibold text-purple-600"> Scoring</span> →
              <span className="font-semibold text-green-600"> Routing</span>
            </p>
          </div>
        </div>

        {/* Lead Input Form */}
        <div className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Lead Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'company', placeholder: 'Company Name *', type: 'text' },
              { key: 'contactName', placeholder: 'Contact Name *', type: 'text' },
              { key: 'email', placeholder: 'Email Address *', type: 'email' },
              { key: 'phone', placeholder: 'Phone Number', type: 'tel' }
            ].map(({ key, placeholder, type }) => (
              <div key={key} className="relative">
                <input
                  type={type}
                  className="w-full px-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder={placeholder}
                  value={leadData[key as keyof typeof leadData]}
                  onChange={(e) =>
                    setLeadData((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
          
          <button
            onClick={processWorkflow}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl py-4 px-8 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing Workflow...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Start AI Workflow</span>
              </>
            )}
          </button>
        </div>

        {/* Workflow Progress */}
        {isProcessing && (
          <div className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">→</span>
              </div>
              <span>Workflow Progress</span>
            </h2>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${((currentAgent + 1) / 3) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <p className="text-center text-gray-600 font-medium">
                Processing {agents[currentAgent]?.name}... ({currentAgent + 1} of 3)
              </p>
            </div>
          </div>
        )}

        {/* Agent Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const result = agentResults[index];
            const Icon = agent.icon;
            const isActive = currentAgent === index && isProcessing;
            const isCompleted = result.status === "completed";

            return (
              <div
                key={agent.id}
                className={`relative backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl p-6 space-y-4 transform transition-all duration-300 ${
                  isActive ? 'scale-105 shadow-2xl ring-4 ring-blue-500/20' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Agent Header */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${agent.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-600">{agent.description}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <span
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        result.status === "completed"
                          ? "text-green-600"
                          : result.status === "processing"
                          ? "text-yellow-600"
                          : "text-gray-400"
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                  
                  {isCompleted && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>

                {/* Processing Animation */}
                {isActive && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 animate-pulse"></div>
                )}

                {/* Connection Line */}
                {index < agents.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results Summary */}
        {agentResults.every(result => result.status === "completed") && !isProcessing && (
          <div className="backdrop-blur-sm bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-xl rounded-2xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">Workflow Complete!</h3>
            <p className="text-green-700 max-w-md mx-auto">
              Your lead has been successfully processed through all three AI agents and is ready for follow-up.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentWorkflow;