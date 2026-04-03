'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (keyword: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    onSearch(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="搜索番剧..."
          className="w-full pl-11 pr-10 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition duration-200"
        />
        {value && !isLoading && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X size={18} />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !value.trim()}
        className="px-5 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition duration-200 disabled:opacity-50"
      >
        搜索
      </button>
    </div>
  )
}
