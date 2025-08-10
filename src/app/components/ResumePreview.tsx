// components/ResumePreview.tsx

import './ResumePreview.css'; // For @media print styles

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
};

export default function ResumePreview({ resumeData }: Props) {
  const renderSection = (title: string, items: string[]) => (
    <div className="mt-6 break-inside-avoid">
      <h3
        className="text-xl font-bold border-b-2 pb-1 mb-3"
        style={{
          color: '#1F2937', // Dark gray
          borderColor: '#3B82F6', // Blue-500
        }}
      >
        {title}
      </h3>
      <ul
        className="list-disc list-inside space-y-2 text-sm"
        style={{ color: '#374151' }}
      >
        {items.length > 0
          ? items.map((item, i) => (
              <li key={i} className="leading-snug">{item}</li>
            ))
          : (
            <li style={{ color: '#9CA3AF', fontStyle: 'italic' }}>
              Not provided
            </li>
          )}
      </ul>
    </div>
  );

  return (
    <div
      id="resume-preview"
      className="mx-auto p-8 md:p-12 rounded-lg shadow-lg"
      style={{
        backgroundColor: '#F9FAFB', // Light background
        color: '#1F2937',
        maxWidth: '794px', // A4 width for desktop/PDF
        minHeight: '1123px', // A4 height for PDF
        boxSizing: 'border-box',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Header */}
      <header className="mb-8 text-center">
        <h2
          className="text-3xl md:text-4xl font-extrabold"
          style={{
            color: '#2563EB', // Blue-600
          }}
        >
          {resumeData.name || 'Your Name'}
        </h2>
        <p
          className="mt-2 text-sm md:text-base"
          style={{ color: '#4B5563' }}
        >
          {resumeData.email || 'Email'} | {resumeData.phone || 'Phone'}
        </p>
      </header>

      {/* Summary */}
      <section className="mb-6 break-inside-avoid">
        <h3
          className="text-xl font-bold border-b-2 pb-1 mb-3"
          style={{
            color: '#1F2937',
            borderColor: '#3B82F6',
          }}
        >
          Summary
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: '#374151' }}
        >
          {resumeData.summary || 'A short summary about yourself...'}
        </p>
      </section>

      {/* Sections */}
      {renderSection('Experience', resumeData.experience)}
      {renderSection('Education', resumeData.education)}
      {renderSection('Skills', resumeData.skills)}
    </div>
  );
}
