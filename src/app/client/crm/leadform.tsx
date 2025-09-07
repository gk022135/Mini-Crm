"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// ---- Types ----
export interface Lead {
  id?: string | number;
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  source?: string;
  interestLevel?: "High" | "Medium" | "Low" | "";
  industry?: string;
  createdAt?: string;
}

interface LeadFormProps {
  industry?: string;
  onCreated: (lead: Lead) => void;
}

// ---- Component ----
export default function LeadForm({ industry = "general", onCreated }: LeadFormProps) {
  const [form, setForm] = useState<Omit<Lead, "id" | "createdAt">>({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    source: "",
    interestLevel: "",
    industry,
  });

  const [loading, setLoading] = useState(false);

  // typed handleChange
  const handleChange =
    (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.company || !form.contactName || !form.email) {
      alert("Company, Contact name and Email are required.");
      return;
    }

    setLoading(true);
    const payload: Lead = { ...form, industry };

    try {
      const res = await axios.post<Lead>("/api/leads", payload);
      const created: Lead = res.data ?? payload; // fallback
      onCreated(created);

      // reset form
      setForm({
        company: "",
        contactName: "",
        email: "",
        phone: "",
        source: "",
        interestLevel: "",
        industry,
      });
      alert("Lead created.");
    } catch (err: any) {
      console.warn(
        "API create failed, falling back to simulated create:",
        err?.message
      );

      const simulated: Lead = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      };
      onCreated(simulated);
      alert("Lead created (simulated).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold">
        Add Lead — industry:{" "}
        <span className="font-medium">{industry}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={form.company}
          onChange={handleChange("company")}
          className="border rounded p-2"
          placeholder="Company *"
        />
        <input
          value={form.contactName}
          onChange={handleChange("contactName")}
          className="border rounded p-2"
          placeholder="Contact name *"
        />
        <input
          value={form.email}
          onChange={handleChange("email")}
          type="email"
          className="border rounded p-2"
          placeholder="Email *"
        />
        <input
          value={form.phone}
          onChange={handleChange("phone")}
          className="border rounded p-2"
          placeholder="Phone"
        />
        <input
          value={form.source}
          onChange={handleChange("source")}
          className="border rounded p-2"
          placeholder="Source (e.g. Linkedin)"
        />
        <select
          value={form.interestLevel}
          onChange={handleChange("interestLevel")}
          className="border rounded p-2"
        >
          <option value="">Interest level</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Lead"}
        </button>
        <button
          type="button"
          onClick={() =>
            setForm({
              company: "",
              contactName: "",
              email: "",
              phone: "",
              source: "",
              interestLevel: "",
              industry,
            })
          }
          className="px-4 py-2 rounded border"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
