"use client";
import React, { useState } from "react";
import axios from "axios";

interface LeadFormData {
  name: string;
  email: string;
  source: string;
  interestLevel: "High" | "Medium" | "Low" | "";
}

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    source: "",
    interestLevel: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("/api/leads", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Lead captured successfully!" });
        setFormData({ name: "", email: "", source: "", interestLevel: "" });
      } else {
        setMessage({ type: "error", text: response.data.message || "Something went wrong" });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-black p-6 rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Capture Lead Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            required
          />
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            placeholder="e.g. LinkedIn, Website, Referral"
          />
        </div>

        {/* Interest Level */}
        <div>
          <label className="block text-sm font-medium mb-1">Interest Level</label>
          <select
            name="interestLevel"
            value={formData.interestLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            required
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Lead"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default LeadForm;
