// app/page.tsx
'use client';

import { useState } from 'react';
import ResumeForm from '@/app/components/ResumeForm';
import ResumePreview from '@/app/components/ResumePreview';

import PDFExportButton from '@/app/components/PDFExportButton';



type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
};

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });

  return (
    <main className="min-h-screen p-6 bg-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>
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
    </main>
  );
}
