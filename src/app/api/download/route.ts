import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { readJobState, extractClip, getJobDir } from '@/lib/videoProcessor'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    jobId?: string
    clipIndex?: number
    start?: number
    end?: number
  }

  const { jobId, clipIndex = 0, start, end } = body

  if (!jobId || typeof start !== 'number' || typeof end !== 'number') {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
  }

  if (start < 0 || end <= start || end - start > 120) {
    return NextResponse.json({ error: 'Intervalo de tempo inválido' }, { status: 400 })
  }

  const state = readJobState(jobId)
  if (!state || state.status !== 'done') {
    return NextResponse.json({ error: 'Job não concluído ou não encontrado' }, { status: 400 })
  }

  if (!state.videoPath || !existsSync(state.videoPath)) {
    return NextResponse.json({ error: 'Vídeo fonte não disponível' }, { status: 410 })
  }

  const jobDir = getJobDir(jobId)
  const outputName = `corte_${clipIndex + 1}_${Math.floor(start)}s_${Math.floor(end)}s.mp4`
  const outputPath = join(jobDir, outputName)

  try {
    await extractClip(state.videoPath, start, end, outputPath)
    const buffer = readFileSync(outputPath)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': String(buffer.length),
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Extração falhou'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
