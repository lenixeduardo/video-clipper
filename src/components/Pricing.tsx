import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    name: 'Free',
    price: 'R$ 0',
    period: 'para sempre',
    desc: 'Ideal para experimentar',
    features: [
      '1 vídeo por dia',
      '5 cortes por vídeo',
      'Export MP4',
      'Vídeos até 30 min',
    ],
    cta: 'Começar grátis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 97',
    period: '/mês',
    desc: 'Para criadores de conteúdo',
    features: [
      '50 vídeos por dia',
      '5 cortes por vídeo',
      'Processamento prioritário',
      'Vídeos até 4h',
      'Export em lote',
      'Acesso à API',
    ],
    cta: 'Iniciar período de teste',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    desc: 'Para agências e equipes',
    features: [
      'Vídeos ilimitados',
      'Prompts personalizados',
      'Servidor dedicado',
      'Garantia de SLA',
      'White-label',
      'Suporte prioritário',
    ],
    cta: 'Falar com vendas',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary-container text-label-sm uppercase tracking-widest mb-3">
            Planos
          </p>
          <h2 className="font-serif text-h2 text-on-surface mb-4">Preços simples</h2>
          <p className="text-on-surface-variant text-body-lg">
            Comece grátis. Escale conforme crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-xl p-7 border transition-all duration-brand',
                plan.highlighted
                  ? 'backdrop-blur-focus bg-primary-container/5 border-primary-container/40 md:scale-105 shadow-glow-cyan-lg'
                  : 'backdrop-blur-lens bg-white/[0.03] border-white/10 hover:border-white/20'
              )}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-primary-container text-on-primary text-xs font-bold px-3 py-1 rounded-full">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-on-surface font-serif font-semibold text-xl mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold text-on-surface font-serif">{plan.price}</span>
                {plan.period && <span className="text-on-surface-variant text-sm">{plan.period}</span>}
              </div>
              <p className="text-on-surface-variant text-sm mb-6">{plan.desc}</p>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <Check className="w-4 h-4 text-primary-container shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  'w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200',
                  plan.highlighted
                    ? 'bg-primary-container text-on-primary hover:bg-primary-container/90 hover:shadow-glow-cyan'
                    : 'bg-white/5 border border-white/10 text-on-surface-variant hover:border-white/20 hover:text-on-surface'
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
