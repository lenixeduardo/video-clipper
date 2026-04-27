import { Sparkles, Code2, Share2, Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-container" />
            </div>
            <div>
              <p className="text-on-surface font-serif font-bold text-base leading-none">Cortes AI</p>
              <p className="text-on-surface-variant text-[10px] tracking-widest uppercase mt-0.5">
                Cinematic Precision
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {[
              ['Funcionalidades', '#features'],
              ['Preços', '#pricing'],
              ['Privacidade', '/privacy'],
              ['Termos', '/terms'],
              ['Documentação', '/docs'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-on-surface-variant text-sm hover:text-on-surface transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Code2, href: '#', label: 'GitHub' },
              { Icon: Share2, href: '#', label: 'Twitter' },
              { Icon: Video, href: '#', label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-white/20 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-on-surface-variant text-xs">
            © 2026 Cortes AI. Todos os direitos reservados.
          </p>
          <p className="text-on-surface-variant text-xs">
            Desenvolvido com{' '}
            <span className="text-primary-container">Next.js</span> e{' '}
            <span className="text-primary-container">Claude AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
