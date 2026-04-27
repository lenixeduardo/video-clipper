import type { Metadata } from 'next'
import { Inter, Noto_Serif } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cortes AI — Precisão Cinematográfica',
  description:
    'Nossa IA analisa cada frame para encontrar os momentos mais impactantes. Transforme vídeos em virais em segundos.',
  keywords: ['tiktok', 'shorts', 'youtube', 'cortes', 'ia', 'viral', 'clips'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased bg-background text-on-background min-h-svh">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e1e2e',
              color: '#e3e0f7',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: { primary: '#22d3ee', secondary: '#00363e' },
            },
            error: {
              iconTheme: { primary: '#ffb4ab', secondary: '#690005' },
            },
          }}
        />
      </body>
    </html>
  )
}
