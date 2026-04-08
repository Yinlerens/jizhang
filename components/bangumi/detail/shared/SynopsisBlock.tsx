'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function SynopsisBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  if (!text) return null

  return (
    <div>
      <p
        className={`text-sm leading-relaxed whitespace-pre-line text-zinc-600 dark:text-zinc-400 ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition"
      >
        {expanded ? (
          <>
            收起 <ChevronUp size={14} />
          </>
        ) : (
          <>
            展开全文 <ChevronDown size={14} />
          </>
        )}
      </button>
    </div>
  )
}
