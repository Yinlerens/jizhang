'use client'

const options = [
  { value: 'cinema', label: 'CINEMA' },
  { value: 'editorial', label: 'EDITORIAL' },
  { value: 'stream', label: 'STREAM' },
] as const

export type DetailVariant = (typeof options)[number]['value']

export default function VariantSwitcher({
  value,
  onChange,
}: {
  value: DetailVariant
  onChange: (value: DetailVariant) => void
}) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={
              active
                ? 'rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all'
                : 'rounded-full px-4 py-1.5 text-xs font-semibold text-white/60 transition-all hover:text-white'
            }
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
