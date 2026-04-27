import { Zap, Globe, Sliders, Timer, TrendingUp, Download } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Análise por IA',
    desc: 'Claude Vision analisa cada frame e seleciona os momentos com maior potencial viral.',
  },
  {
    icon: Globe,
    title: 'Múltiplas Plataformas',
    desc: 'YouTube, Vimeo, Twitch, Twitter/X — se o yt-dlp suporta, nós suportamos.',
  },
  {
    icon: Sliders,
    title: 'Edição Precisa',
    desc: 'Ajuste os cortes com um slider de duplo ponto ou digitando os tempos exatos.',
  },
  {
    icon: Timer,
    title: 'Processamento Rápido',
    desc: 'Extração de frames e análise em paralelo. A maioria dos vídeos em menos de 2 minutos.',
  },
  {
    icon: TrendingUp,
    title: 'Otimizado para Shorts',
    desc: 'A IA é instruída a encontrar momentos que maximizam a retenção nos primeiros 3 segundos.',
  },
  {
    icon: Download,
    title: 'Exportação MP4',
    desc: 'Baixe clips como MP4 limpos, prontos para upload direto no TikTok ou YouTube.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary-container text-label-sm uppercase tracking-widest mb-3">
            Funcionalidades
          </p>
          <h2 className="font-serif text-h2 text-on-surface mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-on-surface-variant text-body-lg max-w-xl mx-auto">
            De footage bruto a clips virais em minutos. Sem necessidade de habilidades de edição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-xl backdrop-blur-lens bg-white/[0.03] border border-white/10 hover:border-primary-container/30 hover:bg-white/[0.05] transition-all duration-brand group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
                <Icon className="w-5 h-5 text-primary-container" />
              </div>
              <h3 className="text-on-surface font-semibold mb-2">{title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
