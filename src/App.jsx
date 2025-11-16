import { useState } from 'react'
import PdfUploader from './components/PdfUploader'
import ChatPanel from './components/ChatPanel'

function App() {
  const [doc, setDoc] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">PDF Chat</h1>
          <p className="text-slate-600">Upload a PDF on the left, chat about it on the right.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]">
          <div className="h-full">
            <PdfUploader onUploaded={(data) => setDoc(data)} />
            {doc && (
              <div className="mt-3 text-sm text-slate-600">
                Uploaded: <span className="font-medium">{doc.filename}</span>
              </div>
            )}
          </div>
          <div className="h-full">
            <ChatPanel documentId={doc?.document_id} filename={doc?.filename} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
