'use client'

import { useState } from 'react'
import { Download, Edit2, Copy, Check, Flame } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn, formatTime } from '@/lib/utils'
import type { ClipResult } from '@/lib/videoProcessor'
import ClipEditor from './ClipEditor'

interface Props {
  clip: ClipResult
  index: number
  jobId: string
  style?: React.CSSProperties
}

const CHAPTER_LABELS = [
  'Gancho Viral',
  'Revelação',
  'Tutorial Rápido',
  'Insight Chave',
  'Fechamento',
]

export default function ClipCard({ clip: initialClip, index, jobId, style }: Props) {
  const [clip, setClip] = useState<ClipResult>(initialClip)
  const [editing, setEditing] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const duration = clip.end - clip.start
  const chapterLabel = CHAPTER_LABELS[index] ?? `Corte ${index + 1}`

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, clipIndex: index, start: clip.start, end: clip.end }),
      })
      if (!res.ok) throw new Error('Download falhou')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `corte_${index + 1}_${clip.title.replace(/\s+/g, '-').toLowerCase()}.mp4`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Clip exportado!')
    } catch {
      toast.error('Falha ao exportar. Tente novamente.')
    } finally {
      setDownloading(false)
    }
  }

  const handleCopyPrompt = async () => {
    const prompt = `Corte ${index + 1} — ${clip.title}\n${clip.description}\n\nPor que funciona: ${clip.reason}\n\nTempo: ${formatTime(clip.start)} → ${formatTime(clip.end)} (${Math.round(duration)}s)`
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    toast.success('Prompt copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl overflow-hidden border border-white/10',
        'backdrop-blur-lens bg-surface-container/80',
        'hover:border-primary-container/40 hover:shadow-card-hover',
        'transition-all duration-brand hover:scale-[1.02]',
        'group'
      )}
      style={style}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-surface-high overflow-hidden">
        {clip.thumbnailPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={clip.thumbnailPath}
            alt={clip.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-brand"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Flame className="w-12 h-12 text-surface-bright" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container/95 via-transparent to-transparent" />

        {/* Viral score badge */}
        {clip.viralScore && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/90 backdrop-blur-lens">
            <span className="text-on-primary text-xs font-bold">{clip.viralScore}% Viral</span>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-lens text-on-surface text-xs">
          {Math.round(duration)}s
        </div>

        {/* Chapter label inside thumbnail */}
        <div className="absolute bottom-3 left-3">
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-label">
            CAPÍTULO {String(index + 1).padStart(2, '0')} ·
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-2">
        <h3 className="text-on-surface font-serif font-semibold text-base leading-snug">
          Corte {index + 1} - {chapterLabel}
        </h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">
          {clip.description || 'Sem descrição disponível'}
        </p>
        <div className="flex items-center gap-2 text-on-surface-variant/60 text-xs font-mono">
          <span>{formatTime(clip.start)}</span>
          <span>→</span>
          <span>{formatTime(clip.end)}</span>
        </div>
      </div>

      {/* Editor (inline) */}
      {editing && (
        <ClipEditor
          clip={clip}
          onChange={setClip}
          onClose={() => setEditing(false)}
        />
      )}

      {/* Actions */}
      <div className="p-3 pt-0 space-y-2">
        {/* Edit / Download row */}
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium',
              'border transition-all duration-200',
              editing
                ? 'border-primary-container/50 text-primary-container bg-primary-container/10'
                : 'border-white/10 text-on-surface-variant hover:border-white/20 hover:text-on-surface'
            )}
          >
            <Edit2 className="w-3.5 h-3.5" />
            {editing ? 'Fechar' : 'Editar'}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium',
              'bg-primary-container/10 border border-primary-container/30 text-primary-container',
              'hover:bg-primary-container/20 hover:shadow-glow-cyan',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-all duration-200'
            )}
          >
            <Download className="w-3.5 h-3.5" />
            {downloading ? 'Exportando...' : 'Download'}
          </button>
        </div>

        {/* Copy Prompt */}
        <button
          onClick={handleCopyPrompt}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium',
            'bg-surface-high border border-white/10 text-on-surface',
            'hover:border-white/20 hover:bg-surface-highest',
            'transition-all duration-200'
          )}
        >
          {copied ? <Check className="w-4 h-4 text-primary-container" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado!' : 'Copiar Prompt'}
        </button>
      </div>
    </div>
  )
}
