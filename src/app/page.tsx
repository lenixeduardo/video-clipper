'use client'

import { useState } from 'react'
import { Bell, Search, UserCircle } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import VideoInput from '@/components/VideoInput'
import ResultsSection from '@/components/ResultsSection'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import type { JobState } from '@/lib/videoProcessor'

export default function Home() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobStatus, setJobStatus] = useState<JobState | null>(null)
  const [loading, setLoading] = useState(false)

  const handleJobCreated = (id: string) => {
    setJobId(id)
    setJobStatus({ status: 'pending', progress: 0 })
  }

  return (
    <div className="flex min-h-svh bg-background">
      {/* Sidebar */}
      <Sidebar active="generator" />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-sidebar transition-all duration-brand">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-focus bg-background/80 border-b border-white/10">
          <h1 className="text-on-surface font-semibold text-base">Generator</h1>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Buscar clips..."
                className="bg-transparent text-on-surface placeholder-on-surface-variant/50 text-sm outline-none w-40"
              />
            </div>
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-white/20 transition-colors"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-white/20 transition-colors"
              aria-label="Perfil"
            >
              <UserCircle className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Generator section */}
        <section id="generator" className="px-6 py-12">
          <div className="max-w-3xl">
            {/* Hero headline */}
            <div className="mb-10 animate-fade-up">
              <h2 className="font-serif font-bold text-on-surface leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
                Transforme vídeos{' '}
                <br />
                em{' '}
                <span className="text-gradient-cyan italic">virais</span>
              </h2>
              <p className="text-on-surface-variant text-body-lg mt-4 max-w-lg animate-fade-up-delay">
                Nossa IA analisa cada frame para encontrar os momentos mais impactantes.
                Precisão cinematográfica em segundos.
              </p>
            </div>

            <div className="animate-fade-up-delay-2">
              <VideoInput
                onJobCreated={handleJobCreated}
                loading={loading}
                setLoading={setLoading}
              />
            </div>

            {/* Results */}
            {jobId && (
              <ResultsSection
                jobId={jobId}
                status={jobStatus}
                onStatusUpdate={setJobStatus}
              />
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-6 border-t border-white/5" />

        {/* Landing sections */}
        <Features />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
