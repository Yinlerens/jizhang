'use client'

import { CharacterInfo } from '@/lib/types'

function CharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <div className="flex-shrink-0 w-28 text-center space-y-2">
      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 ring-2 ring-zinc-200 dark:ring-zinc-700">
        {character.image ? (
          <img
            src={character.image}
            alt={character.nameCn || character.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
            暂无
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {character.nameCn || character.name}
        </p>
        {character.voiceActor && (
          <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
            CV: {character.voiceActor.name}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CharacterList({ characters }: { characters: CharacterInfo[] }) {
  if (characters.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">角色</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  )
}
