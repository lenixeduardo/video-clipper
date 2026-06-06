'use client'

import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { formatTime, parseTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { ClipResult } from '@/lib/videoProcessor'

interface Props {
  clip: ClipResult
  onChange: (clip: ClipResult) => void
  onClose: () => void
  videoDuration?: number
}

export default function ClipEditor({ clip, onChange, onClose, videoDuration = 600 }: Props) {
  const maxRange = Math.min(Math.max(clip.end + 120, videoDuration), 3600)
  const [startInput, setStartInput] = useState(formatTime(clip.start))
  const [endInput, setEndInput] = useState(formatTime(clip.end))

  const duration = clip.end - clip.start
  const durationLabel =
    duration < 15 ? 'muito curto' : duration > 60 ? 'longo para Shorts' : 'ideal'
  const durationColor =
    duration < 15
      ? 'bg-clay/10 text-clay border-clay/30'
      : duration > 60
      ? 'bg-sun/10 text-sun-dark border-sun/30'
      : 'bg-sage/10 text-sage border-sage/30'

  const handleSlider = ([s, e]: number[]) => {
    if (e - s < 5) return
    onChange({ ...clip, start: s, end: e })
    setStartInput(formatTime(s))
    setEndInput(formatTime(e))
  }

  const commitStart = () => {
    const val = parseTime(startInput)
    if (val !== null && val >= 0 && val < clip.end - 5) {
      onChange({ ...clip, start: Math.round(val) })
    } else {
      setStartInput(formatTime(clip.start))
    }
  }

  const commitEnd = () => {
    const val = parseTime(endInput)
    if (val !== null && val > clip.start + 5) {
      onChange({ ...clip, end: Math.round(val) })
    } else {
      setEndInput(formatTime(clip.end))
    }
  }

  return (
    <div className="mx-4 mb-4 p-4 rounded-xl bg-parchment-cream border border-parchment-wheat space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <span className="text-ink text-sm font-medium">Editar Intervalo</span>
        <div className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', durationColor)}>
          {Math.round(duration)}s — {durationLabel}
        </div>
      </div>

      {/* Dual-range slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[clip.start, clip.end]}
        min={0}
        max={maxRange}
        step={1}
        onValueChange={handleSlider}
        minStepsBetweenThumbs={5}
      >
        <Slider.Track className="bg-parchment-wheat relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-sage rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className={cn(
            'block w-4 h-4 bg-parchment-warm rounded-full border-2 border-sage',
            'hover:border-forest shadow-bark cursor-grab active:cursor-grabbing',
            'focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2 focus:ring-offset-parchment-cream'
          )}
          aria-label="Início"
        />
        <Slider.Thumb
          className={cn(
            'block w-4 h-4 bg-parchment-warm rounded-full border-2 border-sage',
            'hover:border-forest shadow-bark cursor-grab active:cursor-grabbing',
            'focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2 focus:ring-offset-parchment-cream'
          )}
          aria-label="Fim"
        />
      </Slider.Root>

      {/* Time inputs */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs text-bark mb-1">Início (m:ss)</label>
          <input
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            onBlur={commitStart}
            onKeyDown={(e) => e.key === 'Enter' && commitStart()}
            className={cn(
              'w-full bg-parchment-warm text-ink text-sm px-3 py-2 rounded-lg',
              'border border-parchment-wheat focus:border-sun focus:outline-none',
              'transition-colors duration-200'
            )}
          />
        </div>
        <span className="text-bark pb-2.5">→</span>
        <div className="flex-1">
          <label className="block text-xs text-bark mb-1">Fim (m:ss)</label>
          <input
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            onBlur={commitEnd}
            onKeyDown={(e) => e.key === 'Enter' && commitEnd()}
            className={cn(
              'w-full bg-parchment-warm text-ink text-sm px-3 py-2 rounded-lg',
              'border border-parchment-wheat focus:border-sun focus:outline-none',
              'transition-colors duration-200'
            )}
          />
        </div>
      </div>

      <p className="text-bark text-xs">
        TikTok / Shorts: 15–60s. Arraste os pontos ou edite os tempos diretamente.
      </p>

      <button
        onClick={onClose}
        className="w-full py-2 rounded-lg text-sm text-bark hover:text-ink border border-parchment-wheat hover:border-sage/30 transition-colors"
      >
        Fechar editor
      </button>
    </div>
  )
}
