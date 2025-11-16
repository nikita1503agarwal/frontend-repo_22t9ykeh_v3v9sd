import { useRef, useState } from 'react'

export default function PdfUploader({ onUploaded }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    setError('')
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }
    setFileName(file.name)

    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)
    try {
      const res = await fetch(`${backend}/api/upload_pdf`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onUploaded?.(data)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white/60">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {fileName ? `Selected: ${fileName}` : 'Upload a PDF to start chatting with it'}
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {uploading ? 'Uploading...' : 'Choose PDF'}
        </button>
      </div>
    </div>
  )
}
