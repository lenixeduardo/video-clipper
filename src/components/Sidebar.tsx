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
        'backdrop-blur-lens bg-white/5 border-r border-white/20',
        'transition-all duration-brand ease-in-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary-container" />
        </div>
        {!collapsed && (
          <div className="animate-fade-up overflow-hidden">
            <p className="text-on-surface font-bold text-base leading-none font-serif">Cortes AI</p>
            <p className="text-on-surface-variant text-[10px] tracking-widest uppercase mt-0.5">
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
                  ? 'bg-white/10 text-on-surface border-l-2 border-primary-container'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface border-l-2 border-transparent'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isActive ? 'text-primary-container' : 'text-on-surface-variant group-hover:text-on-surface'
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-primary/50 flex items-center justify-center shrink-0">
              <span className="text-on-primary text-xs font-bold">C</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-on-surface text-sm font-medium truncate">Creative Pro</p>
              <p className="text-on-surface-variant text-xs truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container border border-white/20 flex items-center justify-center hover:bg-surface-high transition-colors hover:border-primary-container/50 z-10"
        aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-on-surface-variant" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-on-surface-variant" />
        )}
      </button>
    </aside>
  )
}
