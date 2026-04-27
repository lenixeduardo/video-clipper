import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { Readable } from 'stream'
import type { IncomingMessage } from 'http'
import formidable from 'formidable'
import {
  writeJobState,
  downloadVideo,
  extractFrames,
  getVideoDuration,
  extractThumbnail,
  getJobDir,
  saveUploadedFile,
} from '@/lib/videoProcessor'
import { analyzeFrames } from '@/lib/claudeAnalyzer'
import { join } from 'path'

export const dynamic = 'force-dynamic'

async function parseUpload(req: NextRequest): Promise<string> {
  const buf = Buffer.from(await req.arrayBuffer())
  const readable = new Readable()
  readable.push(buf)
  readable.push(null)

  const fakeReq = Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: 'POST',
    url: '/',
  }) as unknown as IncomingMessage

  const form = formidable({
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024 * 1024,
    filter: ({ mimetype }) => !!mimetype?.startsWith('video/'),
  })

  return new Promise((resolve, reject) => {
    form.parse(fakeReq, (err, _fields, files) => {
      if (err) return reject(err)
      const f = Array.isArray(files.video) ? files.video[0] : files.video
      if (!f) return reject(new Error('Nenhum arquivo de vídeo encontrado'))
      resolve(f.filepath)
    })
  })
}

async function runPipeline(jobId: string, source: { url?: string; uploadedPath?: string }) {
  try {
    let videoPath: string

    if (source.url) {
      writeJobState(jobId, { status: 'downloading', progress: 8 })
      videoPath = await downloadVideo(source.url, jobId)
    } else if (source.uploadedPath) {
      writeJobState(jobId, { status: 'downloading', progress: 15 })
      videoPath = saveUploadedFile(source.uploadedPath, jobId)
    } else {
      throw new Error('Nenhuma fonte de vídeo fornecida')
    }

    writeJobState(jobId, { status: 'extracting_frames', progress: 25, videoPath })

    const [duration, framePaths] = await Promise.all([
      getVideoDuration(videoPath),
      extractFrames(videoPath, jobId),
    ])

    writeJobState(jobId, { status: 'analyzing', progress: 55 })

    const clips = await analyzeFrames(framePaths, duration)

    const jobDir = getJobDir(jobId)
    const clipsWithThumbs = await Promise.all(
      clips.map(async (clip, idx) => {
        const thumbPath = join(jobDir, `thumb_${idx}.jpg`)
        try {
          const midpoint = clip.start + (clip.end - clip.start) * 0.25
          await extractThumbnail(videoPath, midpoint, thumbPath)
          return { ...clip, thumbnailPath: `/api/thumbnail?job=${jobId}&idx=${idx}` }
        } catch {
          return clip
        }
      })
    )

    writeJobState(jobId, { status: 'done', progress: 100, clips: clipsWithThumbs })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    writeJobState(jobId, { status: 'error', progress: 0, error: message })
  }
}

export async function POST(req: NextRequest) {
  const jobId = randomUUID()
  writeJobState(jobId, { status: 'pending', progress: 0 })

  const contentType = req.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('multipart/form-data')) {
      const uploadedPath = await parseUpload(req)
      setImmediate(() => runPipeline(jobId, { uploadedPath }))
    } else {
      const body = (await req.json()) as { url?: string }
      if (!body.url) return NextResponse.json({ error: 'URL ausente' }, { status: 400 })
      setImmediate(() => runPipeline(jobId, { url: body.url }))
    }

    return NextResponse.json({ jobId }, { status: 202 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao iniciar processamento'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
