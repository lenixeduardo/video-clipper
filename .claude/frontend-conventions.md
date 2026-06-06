# Convenções de Frontend — Cortes AI

Guia de nomenclatura e padrões para componentes, classes Tailwind e estrutura de UI.

---

## Estrutura de Componentes

```
src/
├── app/
│   ├── layout.tsx         — Root layout: fontes, Toaster, metadata
│   ├── page.tsx           — Página principal (client component)
│   ├── globals.css        — Tailwind directives + utility layers
│   └── api/               — Route handlers (process, status, download, thumbnail)
└── components/
    ├── Sidebar.tsx        — Navegação lateral colapsável
    ├── VideoInput.tsx     — Input de URL + dropzone de upload
    ├── ResultsSection.tsx — Estados de loading + grid de resultados
    ├── ClipCard.tsx       — Card individual de clip com ações
    ├── ClipEditor.tsx     — Editor de intervalo (slider + inputs de tempo)
    ├── Features.tsx       — Grid de funcionalidades (seção landing)
    ├── Pricing.tsx        — Cards de planos (seção landing)
    ├── Footer.tsx         — Rodapé com links e social
    └── LoadingSpinner.tsx — Spinner SVG animado (sol + anel sage)
```

---

## Padrões de Classe Tailwind

### Superfícies e Cards
```
bg-parchment-warm border border-parchment-wheat rounded-xl
```
Hover de card:
```
hover:border-sage/40 hover:shadow-card-hover transition-all duration-brand hover:scale-[1.02]
```

### Inputs de Texto
```
bg-parchment-warm border border-parchment-wheat rounded-lg
focus-within:border-sun focus-within:shadow-glow-sun transition-all duration-200
```
Texto dentro do input:
```
text-ink placeholder-bark/50 outline-none text-sm
```

### Botão Primário (CTA âmbar)
```
bg-sun text-forest font-semibold rounded-lg px-5 py-3.5
hover:bg-sun-light hover:shadow-glow-sun
disabled:opacity-40 disabled:cursor-not-allowed
transition-all duration-200
```

### Botão Secundário (parchment)
```
bg-parchment-cream border border-parchment-wheat text-bark rounded-lg
hover:border-parchment-deep/50 hover:text-ink
transition-all duration-200
```

### Botão de Ação em Card (sage outline)
```
bg-sage/10 border border-sage/30 text-sage rounded-lg
hover:bg-sage/20 hover:shadow-card-hover
transition-all duration-200
```

### Sidebar (fundo forest)
- Background: `bg-forest border-r border-forest-mid/60`
- Texto primário: `text-parchment`
- Texto secundário: `text-parchment/60`
- Item ativo: `bg-white/10 text-parchment border-l-2 border-sun`
- Item hover: `hover:bg-white/5 hover:text-parchment`
- Ícone ativo: `text-sun`
- Ícone inativo: `text-parchment/50 group-hover:text-parchment`

### Header Sticky
```
sticky top-0 z-40 backdrop-blur-focus bg-parchment/80 border-b border-parchment-wheat
```

### Divisores
```
border-t border-parchment-wheat
```
Ou inline: `<div className="flex-1 h-px bg-parchment-wheat" />`

### Labels de Seção (uppercase tracking)
```
text-sage text-label-sm uppercase tracking-widest font-sans
```

### Headings de Seção
```
font-serif text-h2 text-ink
```
(Usa Josefin Slab via `font-serif`)

### Body / Descrições
```
text-bark text-body-lg leading-relaxed
```
ou em cards:
```
text-bark text-sm line-clamp-2 leading-relaxed
```

---

## Utilitários Globais (globals.css)

| Classe              | Descrição                                              |
|---------------------|--------------------------------------------------------|
| `.text-gradient-sun`| Gradiente âmbar `from-sun to-sun-light` no texto       |
| `.glow-sun`         | `box-shadow` âmbar 20px                                |
| `.glow-sun-lg`      | `box-shadow` âmbar 40px                                |
| `.nav-active`       | Estado ativo do sidebar (bg branco/10 + borda sun)     |
| `.shimmer`          | Skeleton loader com gradiente parchment                |
| `.parchment-card`   | Shorthand: `bg-parchment-warm border border-parchment-wheat rounded-xl` |

---

## Animações

| Classe Tailwind         | Duração | Uso                                     |
|-------------------------|---------|-----------------------------------------|
| `animate-fade-up`       | 0.6s    | Entrada de seções (sem delay)           |
| `animate-fade-up-delay` | 0.6s    | Entrada com 0.2s de delay              |
| `animate-fade-up-delay-2` | 0.6s  | Entrada com 0.4s de delay              |
| `animate-spin-slow`     | 3s loop | Anel externo do LoadingSpinner          |
| `animate-pulse-ring`    | 2s loop | Opacidade pulsante do anel do spinner   |
| `animate-pulse`         | padrão  | Dot de status "ao vivo" nos resultados  |
| `duration-brand`        | 600ms   | Transições de hover em cards e sidebar  |

Stagger manual em grids de cards:
```tsx
style={{ animationDelay: `${idx * 0.1}s` }}
```

---

## Convenções de Nomenclatura de Props e Estado

- Booleanos de estado: `loading`, `editing`, `downloading`, `copied`, `dragOver`
- Callbacks de mudança: `onChange`, `onClose`, `onJobCreated`, `onStatusUpdate`
- Props de dados: `clip`, `jobId`, `status`, `index`
- Refs de intervalo: `intervalRef` (para polling de status)

---

## Notas de Acessibilidade

- Botões de ícone sempre têm `aria-label` em português
- Inputs de slider usam `aria-label="Início"` / `aria-label="Fim"`
- Focus rings: `focus:ring-2 focus:ring-sage/50 focus:ring-offset-2`
- Imagens de thumbnail: `alt={clip.title}`
