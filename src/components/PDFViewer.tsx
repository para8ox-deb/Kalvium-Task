import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const { currentPage, totalPages, setCurrentPage, setTotalPages, isAdmin } = useStore();
  const [loading, setLoading] = useState(true);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setLoading(false);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="w-full bg-white rounded-lg shadow-lg p-4">
        <Document
          file={url}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            className="max-w-full"
            width={window.innerWidth > 768 ? 800 : undefined}
          />
        </Document>
      </div>
      
      {!loading && (
        <div className="flex items-center justify-between w-full mt-4 px-4">
          <button
            onClick={previousPage}
            disabled={!isAdmin || currentPage <= 1}
            className={`p-2 rounded-full ${
              isAdmin && currentPage > 1
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={nextPage}
            disabled={!isAdmin || currentPage >= totalPages}
            className={`p-2 rounded-full ${
              isAdmin && currentPage < totalPages
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};