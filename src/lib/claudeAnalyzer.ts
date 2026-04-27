import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import type { ClipResult } from './videoProcessor'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Você é um editor de vídeo especializado em conteúdo viral para TikTok e YouTube Shorts.
Analise os frames fornecidos e identifique os 5 MELHORES momentos para clips virais.

Critérios (por ordem de peso):
1. Potencial de gancho — visual impactante ou emoção forte nos primeiros 2 segundos
2. Ressonância emocional — humor, surpresa, emoção, conflito ou inspiração
3. Dinamismo visual — movimento, reações, visuais cinematográficos
4. Narrativa auto-contida — o clip faz sentido sem contexto extra
5. Duração ideal — 15 a 60 segundos (ideal: 30-45s)

Retorne APENAS um array JSON válido. Sem markdown, sem explicações fora do JSON.`

const USER_PROMPT = `Analise estes frames e retorne um JSON array com exatamente 5 objetos:
[
  {
    "start": <número: tempo de início em segundos>,
    "end": <número: tempo de fim em segundos (start + 15 a 60)>,
    "title": "<título impactante do clip, máx 60 caracteres>",
    "description": "<descrição em 1-2 frases do que acontece>",
    "reason": "<por que este momento é ideal para Shorts — mencione o gancho específico>",
    "viralScore": <número de 60 a 99 indicando potencial viral>
  }
]

Regras:
- Duração de cada clip: entre 15 e 60 segundos
- Clips não podem se sobrepor
- Ordene do mais para o menos viral
- Tempos devem ser números positivos em segundos
- viralScore deve refletir genuinamente o potencial (use a faixa completa, não apenas valores altos)`

interface RawClip {
  start?: unknown
  end?: unknown
  title?: unknown
  description?: unknown
  reason?: unknown
  viralScore?: unknown
}

export async function analyzeFrames(
  framePaths: string[],
  videoDurationSeconds: number
): Promise<ClipResult[]> {
  const maxFrames = 60
  const sampled = sampleFrames(framePaths, maxFrames)

  type ContentBlock =
    | Anthropic.ImageBlockParam
    | Anthropic.TextBlockParam

  const content: ContentBlock[] = [
    { type: 'text', text: `Duração total do vídeo: ${Math.round(videoDurationSeconds)}s. Frames abaixo (1 frame a cada ${Math.round(videoDurationSeconds / sampled.length)}s):` },
  ]

  sampled.forEach((framePath, idx) => {
    const approxSec = Math.round((idx / sampled.length) * videoDurationSeconds)
    const imageData = readFileSync(framePath).toString('base64')

    content.push({ type: 'text', text: `[~${approxSec}s]` })
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: imageData },
    })
  })

  content.push({ type: 'text', text: USER_PROMPT })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content }],
  })

  const rawText = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')

  return parseClips(rawText, videoDurationSeconds)
}

function sampleFrames(frames: string[], maxCount: number): string[] {
  if (frames.length <= maxCount) return frames
  const step = frames.length / maxCount
  return Array.from({ length: maxCount }, (_, i) => frames[Math.floor(i * step)])
}

function parseClips(raw: string, duration: number): ClipResult[] {
  const stripped = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(stripped)
  } catch {
    const match = stripped.match(/\[[\s\S]*\]/)
    if (!match) throw new Error(`Claude retornou resposta inválida: ${raw.slice(0, 200)}`)
    parsed = JSON.parse(match[0])
  }

  if (!Array.isArray(parsed)) throw new Error('Resposta do Claude não é um array JSON')

  return (parsed as RawClip[]).slice(0, 5).map((item, idx) => {
    const start = Math.max(0, Number(item.start ?? 0))
    const rawEnd = Number(item.end ?? start + 30)
    const end = Math.min(duration, Math.max(start + 10, Math.min(rawEnd, start + 60)))

    return {
      start: Math.round(start),
      end: Math.round(end),
      title: String(item.title ?? `Corte ${idx + 1}`),
      description: String(item.description ?? ''),
      reason: String(item.reason ?? ''),
      viralScore: Math.min(99, Math.max(60, Number(item.viralScore ?? 75))),
    }
  })
}
