'use client'

import { StaffInfo } from '@/lib/types'

export default function StaffList({ staff }: { staff: StaffInfo[] }) {
  if (staff.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">制作人员</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {staff.map((s) => (
          <div
            key={`${s.id}-${s.role}`}
            className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3"
          >
            <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {s.image ? (
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[10px]">
                  {s.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">{s.name}</p>
              <p className="text-[10px] text-zinc-400 line-clamp-1">{s.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
