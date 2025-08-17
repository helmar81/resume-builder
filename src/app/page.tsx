// app/page.tsx
"use client";

import { useState } from "react";
import ResumeForm from "@/app/components/ResumeForm";
import ResumePreview from "@/app/components/ResumePreview";
import PDFExportButton from "@/app/components/PDFExportButton";

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
};

type Prompt = {
  id: number;
  title: string;
  template: string;
};

const prompts: Prompt[] = [
  {
    id: 1,
    title: "Resume Optimization",
    template:
      "Help me create a [position]-specific resume by highlighting my skills in [industry/skill set].",
  },
  {
    id: 2,
    title: "Cover Letter Crafting",
    template:
      "Write a compelling cover letter for a [position] at [company], focusing on my experience in [related experience].",
  },
  {
    id: 3,
    title: "Interview Preparation",
    template:
      "Generate a list of common interview questions for a [position] at [company] and suggest strong answers based on my experience in [related field].",
  },
  {
    id: 4,
    title: "Networking Outreach",
    template:
      "Draft a message I can send to [industry] professionals on LinkedIn to inquire about opportunities in [desired job role].",
  },
  {
    id: 5,
    title: "Job Description Analysis",
    template:
      "Analyze this job description [paste job description] and suggest key skills I should highlight in my application for [position].",
  },
  {
    id: 6,
    title: "LinkedIn Profile Optimization",
    template:
      "Suggest improvements to my LinkedIn profile to make it more attractive for recruiters looking for [position] in [industry].",
  },
  {
    id: 7,
    title: "Salary Negotiation Strategy",
    template:
      "How can I negotiate a higher salary for a [position] at [company], considering my experience in [related field]?",
  },
  {
    id: 8,
    title: "Personal Branding",
    template:
      "Help me create a personal brand statement that will resonate with recruiters for [position] in [industry].",
  },
  {
    id: 9,
    title: "Job Search Strategy",
    template:
      "What job search strategies should I use to find a [position] in [location] within [desired timeline]?",
  },
];

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
  });

  const [tab, setTab] = useState<"resume" | "prompts">("resume");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [filledPrompt, setFilledPrompt] = useState("");

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setFilledPrompt(prompt.template);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setTab("resume")}
          className={`px-4 py-2 rounded-lg ${
            tab === "resume"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Resume Editor
        </button>
        <button
          onClick={() => setTab("prompts")}
          className={`px-4 py-2 rounded-lg ${
            tab === "prompts"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Career Prompts
        </button>
      </div>

      {/* Tab Content */}
      {tab === "resume" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resume Form Component */}
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />

            {/* Live Preview Component */}
            <ResumePreview resumeData={resumeData} />
          </div>

          {/* PDF Export Button */}
          <div className="mt-8 text-center">
            <PDFExportButton />
          </div>
        </>
      )}

      {tab === "prompts" && (
        <div className="max-w-4xl mx-auto">
          {!selectedPrompt ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSelectPrompt(prompt)}
                  className="rounded-xl border p-4 text-left hover:shadow-md bg-white transition"
                >
                  <h2 className="font-semibold mb-2">{prompt.title}</h2>
                  <p className="text-sm text-gray-600">{prompt.template}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h2 className="font-semibold mb-3">{selectedPrompt.title}</h2>
              <textarea
                value={filledPrompt}
                onChange={(e) => setFilledPrompt(e.target.value)}
                rows={6}
                className="w-full border rounded-lg p-2 text-sm"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(filledPrompt);
                    alert("Prompt copied to clipboard!");
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Copy Prompt
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
