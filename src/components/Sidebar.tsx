'use client'

import { useState } from 'react'
import { Sparkles, Film, History, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'generator', label: 'Generator', icon: Sparkles, href: '#generator' },
  { id: 'clips', label: 'My Clips', icon: Film, href: '#clips' },
  { id: 'history', label: 'History', icon: History, href: '#history' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
]

export default function Sidebar({ active = 'generator' }: { active?: string }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-svh z-50 flex flex-col',
        'bg-forest border-r border-forest-mid/60',
        'transition-all duration-brand ease-in-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-sun/20 border border-sun/40 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-sun" />
        </div>
        {!collapsed && (
          <div className="animate-fade-up overflow-hidden">
            <p className="text-parchment font-bold text-base leading-none font-serif">Cortes AI</p>
            <p className="text-parchment/50 text-[10px] tracking-widest uppercase mt-0.5">
              Cinematic Precision
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-white/10 text-parchment border-l-2 border-sun'
                  : 'text-parchment/60 hover:bg-white/5 hover:text-parchment border-l-2 border-transparent'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isActive ? 'text-sun' : 'text-parchment/50 group-hover:text-parchment'
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{label}</span>
              )}
            </a>
          )
        })}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sun to-clay/70 flex items-center justify-center shrink-0">
              <span className="text-forest text-xs font-bold">C</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-parchment text-sm font-medium truncate">Creative Pro</p>
              <p className="text-parchment/50 text-xs truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-parchment-warm border border-parchment-wheat flex items-center justify-center hover:bg-parchment-cream transition-colors hover:border-sun/40 z-10 shadow-bark"
        aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-bark" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-bark" />
        )}
      </button>
    </aside>
  )
}
