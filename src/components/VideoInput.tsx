'use client'

import { useState, useRef } from 'react'
import { Link2, Upload, Loader2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface Props {
  onJobCreated: (jobId: string) => void
  loading: boolean
  setLoading: (v: boolean) => void
}

export default function VideoInput({ onJobCreated, loading, setLoading }: Props) {
  const [url, setUrl] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const isValidUrl = (s: string) => {
    try { new URL(s); return true } catch { return false }
  }

  const submit = async (body: BodyInit, isJson: boolean) => {
    setLoading(true)
    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: isJson ? { 'Content-Type': 'application/json' } : undefined,
        body,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }))
        throw new Error(err.error)
      }
      const { jobId } = await res.json()
      onJobCreated(jobId)
      toast.success('Processamento iniciado!')
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Falha ao iniciar')
      setLoading(false)
    }
  }

  const handleUrl = () => {
    if (!isValidUrl(url)) { toast.error('URL inválida'); return }
    submit(JSON.stringify({ url }), true)
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('video/')) { toast.error('Envie um arquivo de vídeo'); return }
    const fd = new FormData()
    fd.append('video', file)
    submit(fd, false)
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* URL Input */}
      <div className="flex gap-2">
        <div
          className={cn(
            'flex-1 flex items-center gap-3 px-4 py-3.5',
            'backdrop-blur-lens bg-white/5 border border-white/20 rounded-lg',
            'focus-within:border-primary-container focus-within:shadow-glow-cyan transition-all duration-200'
          )}
        >
          <Link2 className="w-4 h-4 text-on-surface-variant shrink-0" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleUrl()}
            placeholder="Cole o link do YouTube aqui..."
            className="flex-1 bg-transparent text-on-surface placeholder-on-surface-variant/50 outline-none text-sm"
            disabled={loading}
          />
        </div>
        <button
          onClick={handleUrl}
          disabled={loading || !url}
          className={cn(
            'flex items-center gap-2 px-5 py-3.5 rounded-lg font-semibold text-sm',
            'bg-primary-container text-on-primary',
            'hover:bg-primary-container/90 hover:shadow-glow-cyan',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Gerar Prompts
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-on-surface-variant text-xs">ou faça upload</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragOver(false)
          const f = e.dataTransfer.files[0]
          if (f) handleFile(f)
        }}
        onClick={() => !loading && fileRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer',
          'transition-all duration-200',
          dragOver
            ? 'border-primary-container bg-primary-container/10 shadow-glow-cyan'
            : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]',
          loading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Upload className={cn('w-6 h-6 mx-auto mb-2', dragOver ? 'text-primary-container' : 'text-on-surface-variant')} />
        <p className="text-on-surface text-sm font-medium">
          {dragOver ? 'Solte aqui' : 'Arraste um vídeo ou clique para selecionar'}
        </p>
        <p className="text-on-surface-variant text-xs mt-1">MP4, MOV, AVI, MKV — até 2 GB</p>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
      </div>
    </div>
  )
}
