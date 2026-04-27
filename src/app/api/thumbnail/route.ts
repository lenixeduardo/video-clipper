import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('job')
  const idx = searchParams.get('idx')

  if (!jobId || !/^[a-f0-9-]+$/i.test(jobId) || !idx) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  const thumbPath = join('/tmp/clipai_videos', jobId, `thumb_${idx}.jpg`)
  if (!existsSync(thumbPath)) {
    return NextResponse.json({ error: 'Thumbnail não encontrada' }, { status: 404 })
  }

  const buffer = readFileSync(thumbPath)
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
