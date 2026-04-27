import { spawn } from 'child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, copyFileSync } from 'fs'
import { join } from 'path'
import ffmpeg from 'fluent-ffmpeg'

export interface ClipResult {
  start: number
  end: number
  title: string
  description: string
  reason: string
  viralScore?: number
  thumbnailPath?: string
}

export interface JobState {
  status: 'pending' | 'downloading' | 'extracting_frames' | 'analyzing' | 'done' | 'error'
  progress: number
  clips?: ClipResult[]
  error?: string
  videoPath?: string
  framesDir?: string
}

const JOBS_DIR = '/tmp/clipai_jobs'
const VIDEOS_DIR = '/tmp/clipai_videos'

;[JOBS_DIR, VIDEOS_DIR].forEach((d) => {
  if (!existsSync(d)) mkdirSync(d, { recursive: true })
})

export function writeJobState(jobId: string, patch: Partial<JobState>) {
  const existing = readJobState(jobId) ?? { status: 'pending', progress: 0 }
  const merged = { ...existing, ...patch }
  writeFileSync(join(JOBS_DIR, `${jobId}.json`), JSON.stringify(merged, null, 2))
}

export function readJobState(jobId: string): JobState | null {
  try {
    return JSON.parse(readFileSync(join(JOBS_DIR, `${jobId}.json`), 'utf-8')) as JobState
  } catch {
    return null
  }
}

export function getJobDir(jobId: string): string {
  const dir = join(VIDEOS_DIR, jobId)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

export function saveUploadedFile(tmpPath: string, jobId: string): string {
  const dest = join(getJobDir(jobId), 'video.mp4')
  copyFileSync(tmpPath, dest)
  return dest
}

export async function downloadVideo(url: string, jobId: string): Promise<string> {
  const jobDir = getJobDir(jobId)
  const outputTemplate = join(jobDir, 'video.%(ext)s')

  return new Promise((resolve, reject) => {
    const args = [
      '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      '--merge-output-format', 'mp4',
      '-o', outputTemplate,
      '--no-playlist',
      '--max-filesize', '2G',
      '--no-warnings',
      '--progress',
      url,
    ]

    const proc = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] })

    let stderr = ''
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('error', (err) => {
      reject(new Error(`yt-dlp não encontrado: ${err.message}. Instale com: pip install yt-dlp`))
    })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`yt-dlp falhou (código ${code}): ${stderr.slice(-300)}`))
        return
      }
      const files = readdirSync(jobDir).filter((f) => f.startsWith('video.'))
      if (files.length === 0) {
        reject(new Error('yt-dlp não produziu nenhum arquivo'))
        return
      }
      resolve(join(jobDir, files[0]))
    })
  })
}

export async function extractFrames(videoPath: string, jobId: string): Promise<string[]> {
  const framesDir = join(getJobDir(jobId), 'frames')
  if (!existsSync(framesDir)) mkdirSync(framesDir, { recursive: true })

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions(['-vf', 'fps=1/5,scale=720:-2', '-q:v', '3'])
      .output(join(framesDir, 'frame_%06d.jpg'))
      .on('error', (err) => reject(new Error(`Extração de frames falhou: ${err.message}`)))
      .on('end', () => {
        const frames = readdirSync(framesDir)
          .filter((f) => f.endsWith('.jpg'))
          .sort()
          .map((f) => join(framesDir, f))
        resolve(frames)
      })
      .run()
  })
}

export async function getVideoDuration(videoPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) reject(err)
      else resolve(metadata.format.duration ?? 0)
    })
  })
}

export async function extractClip(
  videoPath: string,
  start: number,
  end: number,
  outputPath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(videoPath)
      .setStartTime(start)
      .setDuration(end - start)
      .outputOptions(['-c', 'copy', '-avoid_negative_ts', 'make_zero'])
      .output(outputPath)
      .on('error', () => {
        ffmpeg(videoPath)
          .setStartTime(start)
          .setDuration(end - start)
          .videoCodec('libx264')
          .audioCodec('aac')
          .outputOptions(['-preset', 'fast', '-crf', '23'])
          .output(outputPath)
          .on('error', (e) => reject(e))
          .on('end', () => resolve())
          .run()
      })
      .on('end', () => resolve())
      .run()
  })
}

export async function extractThumbnail(
  videoPath: string,
  atSecond: number,
  outputPath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(videoPath)
      .setStartTime(Math.max(0, atSecond))
      .frames(1)
      .outputOptions(['-vf', 'scale=480:-2'])
      .output(outputPath)
      .on('error', (e) => reject(e))
      .on('end', () => resolve())
      .run()
  })
}
