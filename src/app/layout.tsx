import type { Metadata } from 'next'
import { Josefin_Slab, Syne } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-josefin-slab',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
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
    <html lang="pt-BR" className={`${josefinSlab.variable} ${syne.variable}`}>
      <body className="font-sans antialiased min-h-svh">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#faf7ef',
              color: '#1e2d1a',
              border: '1px solid #d8c8a0',
              borderRadius: '0.75rem',
              fontFamily: 'var(--font-syne)',
              boxShadow: '0 4px 24px rgba(30,45,26,0.10)',
            },
            success: {
              iconTheme: { primary: '#5a8a4a', secondary: '#faf7ef' },
            },
            error: {
              iconTheme: { primary: '#b85c25', secondary: '#fbe8d8' },
            },
          }}
        />
      </body>
    </html>
  )
}
