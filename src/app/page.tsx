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
    <div className="flex min-h-svh">
      {/* Sidebar */}
      <Sidebar active="generator" />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-sidebar transition-all duration-brand">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-focus bg-parchment/80 border-b border-parchment-wheat">
          <h1 className="text-ink font-semibold text-base tracking-wide">Generator</h1>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-parchment-warm border border-parchment-wheat hover:border-parchment-deep/50 transition-colors">
              <Search className="w-4 h-4 text-bark shrink-0" />
              <input
                type="text"
                placeholder="Buscar clips..."
                className="bg-transparent text-ink placeholder-bark/50 text-sm outline-none w-40"
              />
            </div>
            <button
              className="w-9 h-9 rounded-lg bg-parchment-warm border border-parchment-wheat flex items-center justify-center text-bark hover:text-ink hover:border-parchment-deep/50 transition-colors"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-parchment-warm border border-parchment-wheat flex items-center justify-center text-bark hover:text-ink hover:border-parchment-deep/50 transition-colors"
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
              <h2 className="font-serif font-bold text-ink leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
                Transforme vídeos{' '}
                <br />
                em{' '}
                <span className="text-gradient-sun italic">virais</span>
              </h2>
              <p className="text-bark text-body-lg mt-4 max-w-lg animate-fade-up-delay leading-relaxed">
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
        <div className="mx-6 border-t border-parchment-wheat" />

        {/* Landing sections */}
        <Features />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
