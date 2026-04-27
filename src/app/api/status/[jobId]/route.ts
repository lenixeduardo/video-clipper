import { NextRequest, NextResponse } from 'next/server'
import { readJobState } from '@/lib/videoProcessor'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params

  if (!jobId || jobId.length > 36 || !/^[a-f0-9-]+$/i.test(jobId)) {
    return NextResponse.json({ error: 'jobId inválido' }, { status: 400 })
  }

  const state = readJobState(jobId)
  if (!state) {
    return NextResponse.json({ error: 'Job não encontrado' }, { status: 404 })
  }

  return NextResponse.json(state)
}
