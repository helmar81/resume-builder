// components/PDFExportButton.tsx
'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PDFExportButton() {
  const exportPDF = async () => {
    const previewElement = document.getElementById('resume-preview');

    if (!previewElement) {
      alert('❌ Resume preview not found. Make sure ResumePreview has id="resume-preview"');
      return;
    }

    try {
      // Fix lab(...) colors before rendering
      const allElements = previewElement.querySelectorAll('*');
      allElements.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.color.includes('lab')) {
          (el as HTMLElement).style.color = '#000000';
        }
        if (style.backgroundColor.includes('lab')) {
          (el as HTMLElement).style.backgroundColor = '#ffffff';
        }
      });

      // Render preview as canvas
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      if (!imgData) {
        throw new Error('Canvas data is empty');
      }

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Download PDF
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      alert('Download not possible. Please check console for details.');
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={exportPDF}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        Download PDF
      </button>
    </div>
  );
}
