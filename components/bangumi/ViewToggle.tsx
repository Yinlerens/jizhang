'use client'

import { LayoutGrid, List } from 'lucide-react'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  onToggle: (mode: 'grid' | 'list') => void
}

export default function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      <button
        onClick={() => onToggle('grid')}
        className={`p-2 rounded-md transition duration-200 ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
        }`}
        title="网格视图"
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onToggle('list')}
        className={`p-2 rounded-md transition duration-200 ${
          viewMode === 'list'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
        }`}
        title="列表视图"
      >
        <List size={16} />
      </button>
    </div>
  )
}
