// components/ResumeForm.tsx
'use client';

import { ChangeEvent } from 'react';

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
};

type Props = {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
};

export default function ResumeForm({ resumeData, setResumeData }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleListChange = (key: keyof ResumeData, index: number, value: string) => {
    const updatedList = [...(resumeData[key] as string[])];
    updatedList[index] = value;
    setResumeData({ ...resumeData, [key]: updatedList });
  };

  const addListItem = (key: keyof ResumeData) => {
    const updatedList = [...(resumeData[key] as string[]), ''];
    setResumeData({ ...resumeData, [key]: updatedList });
  };

  const removeListItem = (key: keyof ResumeData, index: number) => {
    const updatedList = [...(resumeData[key] as string[])];
    updatedList.splice(index, 1);
    setResumeData({ ...resumeData, [key]: updatedList });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Your Details</h2>

      {/* Basic Fields */}
      {['name', 'email', 'phone'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block mb-1 font-medium capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={resumeData[field as keyof ResumeData] as string}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      {/* Summary */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Summary</label>
        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* List Sections */}
      {(['experience', 'education', 'skills'] as const).map((section) => (
        <div className="mb-6" key={section}>
          <label className="block mb-2 font-semibold capitalize">{section}</label>
          {resumeData[section].map((item, index) => (
            <div className="flex items-center gap-2 mb-2" key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleListChange(section, index, e.target.value)}
                className="flex-grow border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeListItem(section, index)}
                className="text-red-600 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addListItem(section)}
            className="mt-1 text-sm text-blue-600 hover:underline"
          >
            + Add {section.slice(0, -1)}
          </button>
        </div>
      ))}
    </div>
  );
}
