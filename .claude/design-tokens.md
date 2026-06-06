# Design Tokens — Solarpunk Palette

Todas as cores, tipografia e sombras do projeto seguem a paleta Solarpunk definida em `tailwind.config.ts`.

---

## Cores

### Texto
| Token           | Hex       | Uso                                      |
|-----------------|-----------|------------------------------------------|
| `ink`           | `#1e2d1a` | Texto principal, headings                |
| `bark`          | `#5c4033` | Texto secundário, placeholders, labels   |

### Superfícies (fundo claro — área principal)
| Token                  | Hex       | Uso                                         |
|------------------------|-----------|---------------------------------------------|
| `parchment`            | `#f5ede0` | Background do body, raiz da página          |
| `parchment-warm`       | `#faf7ef` | Cards, inputs, superfícies elevadas         |
| `parchment-cream`      | `#ede0c4` | Hover states, editores inline               |
| `parchment-wheat`      | `#d8c8a0` | Bordas, divisores, separadores              |
| `parchment-deep`       | `#c8b880` | Bordas de hover, estados ativos             |

### Verde (sidebar + acentos secundários)
| Token          | Hex       | Uso                                             |
|----------------|-----------|-------------------------------------------------|
| `forest`       | `#1a3d15` | Background do sidebar                           |
| `forest-deep`  | `#0f2a0b` | Camada mais escura (hover no sidebar)           |
| `forest-mid`   | `#2d5a27` | Borda do sidebar, superfícies internas          |
| `forest-light` | `#3d7a35` | Hover dentro do sidebar                         |
| `sage`         | `#5a8a4a` | Ícones de features, barra de progresso, sliders |
| `sage-light`   | `#8ab58a` | Acentos sutis, badge backgrounds                |
| `sage-pale`    | `#c2d9b8` | Backgrounds de destaque muito suave             |

### Âmbar (CTA principal)
| Token        | Hex       | Uso                                              |
|--------------|-----------|--------------------------------------------------|
| `sun`        | `#c9862a` | Botão primário, badge "Viral", ícone do logo     |
| `sun-light`  | `#e8a945` | Hover do botão primário                          |
| `sun-pale`   | `#f5d080` | Background de badge suave                        |
| `sun-dark`   | `#9a6118` | Texto de aviso (duração longa)                   |

### Terracota (estados de alerta)
| Token        | Hex       | Uso                                     |
|--------------|-----------|-----------------------------------------|
| `clay`       | `#b85c25` | Texto de erro, estado de duração curta  |
| `clay-light` | `#d4824e` | Ícone de erro                           |
| `clay-pale`  | `#f0cdb8` | Background de caixas de erro            |

### Erro
| Token             | Hex       | Uso                        |
|-------------------|-----------|----------------------------|
| `error`           | `#b85c25` | Alias de `clay`            |
| `error-container` | `#fbe8d8` | Background de alerta/erro  |

---

## Tipografia

| Variável CSS            | Família           | Fonte no Google Fonts | Uso                                          |
|-------------------------|-------------------|-----------------------|----------------------------------------------|
| `--font-josefin-slab`   | `font-serif`      | Josefin Slab          | Hero headlines, logo, headings de seção      |
| `--font-syne`           | `font-sans`       | Syne                  | UI geral, botões, labels, body text, navbar  |

- **Josefin Slab**: pesos 400, 600, 700 — normal e italic. Art deco, retro-futurista.
- **Syne**: pesos 400–800. Geométrico, moderno, legível em tamanhos pequenos.

Nunca usar Inter, Roboto, Arial ou system-ui como escolha principal.

---

## Sombras

| Token            | Valor                                          | Uso                               |
|------------------|------------------------------------------------|-----------------------------------|
| `shadow-glass`   | `0 4px 32px rgba(30,45,26,0.08)`               | Sombra base de cards              |
| `shadow-card-hover` | `0 8px 48px rgba(90,138,74,0.14)`           | Sombra de hover em cards          |
| `shadow-glow-sun`   | `0 0 20px rgba(201,134,42,0.30)`            | Glow em botões e inputs focados   |
| `shadow-glow-sun-lg`| `0 0 40px rgba(201,134,42,0.18)`            | Glow no card de pricing destacado |
| `shadow-bark`       | `0 2px 12px rgba(30,45,26,0.12)`            | Sombra sutil (botão de collapse)  |

---

## Background do Body

O body usa três camadas:
1. `radial-gradient` verde no canto superior esquerdo — luz de copa de árvore
2. `radial-gradient` âmbar no canto inferior direito — calor do sol
3. SVG inline de pontos sage `#5a8a4a` com opacidade 11% em grid 60×60px — textura botânica
