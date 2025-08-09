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
        className="text-xl font-semibold border-b pb-1 mb-2"
        style={{ color: '#111827', borderColor: '#d1d5db' }} // gray-900 text, gray-300 border
      >
        {title}
      </h3>
      <ul
        className="list-disc list-inside space-y-1 text-sm"
        style={{ color: '#1f2937' }} // gray-800
      >
        {items.length > 0
          ? items.map((item, i) => <li key={i}>{item}</li>)
          : <li style={{ color: '#9ca3af', fontStyle: 'italic' }}>Not provided</li>} {/* gray-400 */}
      </ul>
    </div>
  );

  return (
    <div
      id="resume-preview"
      className="mx-auto p-12 rounded shadow"
      style={{
        backgroundColor: '#ffffff',
        color: '#1f2937',
        width: '794px', // A4 width in px
        minHeight: '1123px', // A4 height in px
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header className="mb-6 text-center">
        <h2
          className="text-3xl font-bold"
          style={{ color: '#111827' }} // gray-900
        >
          {resumeData.name || 'Your Name'}
        </h2>
        <p style={{ color: '#4b5563' }}> {/* gray-600 */}
          {resumeData.email || 'Email'} | {resumeData.phone || 'Phone'}
        </p>
      </header>

      <section className="mb-4 break-inside-avoid">
        <h3
          className="text-xl font-semibold border-b pb-1 mb-2"
          style={{ color: '#111827', borderColor: '#d1d5db' }}
        >
          Summary
        </h3>
        <p className="text-sm" style={{ color: '#1f2937' }}>
          {resumeData.summary || 'A short summary about yourself...'}
        </p>
      </section>

      {renderSection('Experience', resumeData.experience)}
      {renderSection('Education', resumeData.education)}
      {renderSection('Skills', resumeData.skills)}
    </div>
  );
}
