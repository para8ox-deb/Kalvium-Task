import React from 'react';
import { PDFViewer } from './components/PDFViewer';
import { SessionControls } from './components/SessionControls';
import { useStore } from './store/useStore';


function App() {
  const { sessionId, isAdmin } = useStore();
  
  // Example PDF URL - replace with your actual PDF URL
  const pdfUrl = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">PDF Sync Viewer</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SessionControls />
        
        {sessionId ? (
          <div className="mt-8">
            <div className="mb-4 text-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {isAdmin ? 'Presenter Mode' : 'Viewer Mode'}
              </span>
            </div>
            <PDFViewer url={pdfUrl} />
          </div>
        ) : (
          <div className="text-center mt-8 text-gray-600">
            Create or join a session to start viewing the presentation
          </div>
        )}
      </main>
    </div>
  );
}

export default App;