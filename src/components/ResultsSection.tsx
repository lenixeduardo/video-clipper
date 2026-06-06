'use client'

import { useEffect, useRef } from 'react'
import { AlertCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import type { JobState } from '@/lib/videoProcessor'
import ClipCard from './ClipCard'
import LoadingSpinner from './LoadingSpinner'

const STATUS_LABELS: Record<string, string> = {
  pending: 'Na fila...',
  downloading: 'Baixando vídeo...',
  extracting_frames: 'Extraindo frames...',
  analyzing: 'IA analisando seu vídeo...',
  done: 'Análise concluída!',
  error: 'Algo deu errado',
}

interface Props {
  jobId: string
  status: JobState | null
  onStatusUpdate: (s: JobState) => void
}

export default function ResultsSection({ jobId, status, onStatusUpdate }: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (status?.status === 'done' || status?.status === 'error') {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${jobId}`)
        if (!res.ok) return
        const data: JobState = await res.json()
        onStatusUpdate(data)
        if (data.status === 'done' || data.status === 'error') {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      } catch {
        // retry silently
      }
    }, 2000)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [jobId, status?.status, onStatusUpdate])

  useEffect(() => {
    if (status?.status === 'done') {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [status?.status])

  return (
    <section id="results" className="mt-12">
      {/* Processing states */}
      {status?.status !== 'done' && status?.status !== 'error' && (
        <div className="flex flex-col items-center gap-6 py-12 animate-fade-up">
          <LoadingSpinner />
          <div className="text-center">
            <p className="text-ink text-lg font-medium mb-2">
              {STATUS_LABELS[status?.status ?? 'pending']}
            </p>
            <p className="text-bark text-sm">
              Nossa IA está analisando cada frame do vídeo
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-parchment-cream rounded-full overflow-hidden">
            <div
              className="h-full bg-sage rounded-full transition-all duration-700 ease-out"
              style={{ width: `${status?.progress ?? 5}%` }}
            />
          </div>
          <span className="text-bark text-xs">{status?.progress ?? 5}%</span>
        </div>
      )}

      {/* Error */}
      {status?.status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-clay-pale border border-clay/30 text-clay animate-fade-up">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">{status.error ?? 'Erro desconhecido'}</span>
        </div>
      )}

      {/* Results */}
      {status?.status === 'done' && status.clips && (
        <div className="animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-ink text-xl font-serif font-semibold">
                Resultados do Processamento
              </h2>
              <span className="w-2 h-2 rounded-full bg-sun animate-pulse" />
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg bg-parchment-warm border border-parchment-wheat hover:border-sage/30 text-bark hover:text-sage transition-colors"
                title="Filtrar"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg bg-parchment-warm border border-parchment-wheat hover:border-sage/30 text-bark hover:text-sage transition-colors"
                title="Ordenar"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {status.clips.map((clip, idx) => (
              <ClipCard
                key={idx}
                clip={clip}
                index={idx}
                jobId={jobId}
                style={{ animationDelay: `${idx * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
