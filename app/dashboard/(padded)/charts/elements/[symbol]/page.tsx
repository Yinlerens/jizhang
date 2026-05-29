import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Atom, ChevronLeft } from "lucide-react";
import { getElementScienceData, type ElementScienceData } from "@/lib/periodic-element-properties";
import {
  categoryColors,
  categoryLabels,
  categoryProfiles,
  getAdjacentElements,
  getCategoryPeers,
  getCrystalStructure,
  getElementBlock,
  getElementDetailPath,
  getElementPositionLabel,
  getElementSlug,
  getPeriodicElementBySlug,
  periodicElements,
  type PeriodicElement,
} from "@/lib/periodic-table";

export const dynamicParams = false;

export function generateStaticParams() {
  return periodicElements.map((element) => ({
    symbol: getElementSlug(element),
  }));
}

export default async function ElementDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const element = getPeriodicElementBySlug(symbol);

  if (!element) {
    notFound();
  }

  const palette = categoryColors[element.category];
  const profile = categoryProfiles[element.category];
  const block = getElementBlock(element);
  const crystal = getCrystalStructure(element);
  const science = getElementScienceData(element);
  const positionLabel = getElementPositionLabel(element);
  const adjacentElements = getAdjacentElements(element);
  const peers = getCategoryPeers(element, 10);
  const accentStyle = {
    "--element-fill": palette.fill,
    "--element-stroke": palette.stroke,
    "--element-text": palette.text,
    "--element-accent": palette.accent,
  } as CSSProperties;

  const primaryMetrics = [
    { label: "原子质量", value: science.atomicMass },
    { label: "电负性", value: science.electronegativity, note: "Pauling" },
    { label: "密度", value: science.density },
    { label: "相态", value: science.phase },
    { label: "熔点", value: science.meltingPoint },
    { label: "沸点", value: science.boilingPoint },
  ];

  return (
    <div className="space-y-4" style={accentStyle}>
      <Link
        href="/dashboard/charts"
        className="anime-action anime-action-ghost h-9"
      >
        <ChevronLeft size={16} />
        元素周期表
      </Link>

      <section className="anime-surface p-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)]">
          <div className="flex min-w-0 gap-4">
            <div
              className="grid h-30 w-30 shrink-0 place-items-center rounded-xl border p-3"
              style={{
                backgroundColor: palette.fill,
                borderColor: palette.stroke,
                color: palette.text,
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-black">
                  <span>{element.number}</span>
                  <span>{block}</span>
                </div>
                <div className="mt-4 text-center font-mono text-5xl font-black leading-none">
                  {element.symbol}
                </div>
                <div className="mt-2 text-center text-base font-black">{element.name}</div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2 text-xs font-black text-[#6e6172] dark:text-cyan-100/70">
                <span className="rounded-md border border-[#26223a]/15 bg-[#fff1f6] px-2 py-1 dark:border-cyan-300/10 dark:bg-white/10">
                  {categoryLabels[element.category]}
                </span>
                <span className="rounded-md border border-[#26223a]/15 bg-[#fff1f6] px-2 py-1 dark:border-cyan-300/10 dark:bg-white/10">
                  {positionLabel}
                </span>
                <span className="rounded-md border border-[#26223a]/15 bg-[#fff1f6] px-2 py-1 dark:border-cyan-300/10 dark:bg-white/10">
                  {crystal.name}
                </span>
              </div>
              <h1 className="anime-page-title mt-3">
                {element.name} <span className="font-mono text-[#8f5b72] dark:text-cyan-100/60">{element.symbol}</span>
              </h1>
              <p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-[#6e6172] dark:text-cyan-50/70">
                {profile.description}
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {primaryMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
        <ScientificDataTable science={science} />

        <div className="space-y-4">
          <div className="anime-surface p-4">
            <div className="flex items-center gap-2">
              <Atom size={18} className="text-[#8f5b72] dark:text-cyan-100/70" />
              <h2 className="anime-panel-title text-lg">原子序列</h2>
            </div>
            <div className="mt-3 grid gap-2">
              <AdjacentElementLink label="前一位" element={adjacentElements.previous} />
              <AdjacentElementLink label="后一位" element={adjacentElements.next} />
            </div>
          </div>

          <div className="anime-surface p-4">
            <div>
              <p className="text-xs font-black uppercase text-[#8f5b72] dark:text-cyan-100/60">
                Ordered by atomic number
              </p>
              <h2 className="anime-panel-title mt-1 text-lg">
                {categoryLabels[element.category]}谱系
              </h2>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {peers.map((peer) => (
                <PeerLink key={peer.symbol} peer={peer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border border-[#26223a]/15 bg-[#fff1f6]/70 p-3 dark:border-cyan-300/10 dark:bg-white/5">
      <p className="text-xs font-black text-[#8f5b72] dark:text-cyan-100/60">{label}</p>
      <p className="mt-1 text-sm font-black leading-5 text-[#26223a] dark:text-cyan-50">{value}</p>
      {note && <p className="mt-1 text-[11px] font-bold text-[#8f5b72] dark:text-cyan-100/55">{note}</p>}
    </div>
  );
}

function ScientificDataTable({ science }: { science: ElementScienceData }) {
  const rows = [
    ["完整电子构型", science.electronConfiguration],
    ["价层电子构型", science.semanticConfiguration],
    ["第一电离能", science.firstIonizationEnergy],
    ["电子亲和能", science.electronAffinity],
    ["氧化态", science.oxidationStates],
    ["摩尔热容", science.molarHeat],
    ["稳定同位素", science.stableIsotopes],
    ["同位素丰度", science.isotopicAbundances],
    ["已知同位素", science.knownIsotopes],
    ["晶体结构", science.crystalStructure],
    ["空间群", science.spaceGroup],
    ["晶胞角", science.latticeAngles],
    ["磁性", science.magneticType],
  ];

  return (
    <div className="anime-surface p-4">
      <div>
        <p className="text-xs font-black uppercase text-[#8f5b72] dark:text-cyan-100/60">
          Physical and chemical properties
        </p>
        <h2 className="anime-panel-title mt-1 text-lg">
          核心物理 / 化学数据
        </h2>
      </div>
      <dl className="mt-3 grid overflow-hidden rounded-md border border-[#26223a]/15 dark:border-cyan-300/10 lg:grid-cols-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-[#26223a]/10 bg-white/55 px-3 py-2 last:border-b-0 dark:border-cyan-300/10 dark:bg-white/5 lg:nth-last-2:border-b-0"
          >
            <dt className="text-xs font-black text-[#8f5b72] dark:text-cyan-100/60">{label}</dt>
            <dd className="min-w-0 wrap-break-word text-sm font-bold leading-5 text-[#26223a] dark:text-cyan-50">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function PeerLink({ peer }: { peer: PeriodicElement }) {
  const palette = categoryColors[peer.category];

  return (
    <Link
      href={getElementDetailPath(peer)}
      className="flex min-w-0 items-center gap-2 rounded-md border border-[#26223a]/15 bg-white/55 p-2 transition hover:border-[#26223a] hover:bg-[#fff1f6] dark:border-cyan-300/10 dark:bg-white/5 dark:hover:border-cyan-300/30"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black"
        style={{ backgroundColor: palette.fill, color: palette.text }}
      >
        {peer.symbol}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-[#26223a] dark:text-cyan-50">
          #{peer.number} {peer.name}
        </span>
        <span className="block text-xs font-bold text-[#8f5b72] dark:text-cyan-100/60">{peer.mass}</span>
      </span>
    </Link>
  );
}

function AdjacentElementLink({
  label,
  element,
}: {
  label: string;
  element: PeriodicElement | null;
}) {
  if (!element) {
    return (
      <div className="rounded-md border border-dashed border-[#26223a]/20 bg-white/45 p-3 text-sm font-bold text-[#8f5b72] dark:border-cyan-300/10 dark:bg-white/5 dark:text-cyan-100/45">
        {label}
      </div>
    );
  }

  return (
    <Link
      href={getElementDetailPath(element)}
      className="flex items-center justify-between gap-3 rounded-md border border-[#26223a]/15 bg-white/55 p-3 transition hover:border-[#26223a] hover:bg-[#fff1f6] dark:border-cyan-300/10 dark:bg-white/5 dark:hover:border-cyan-300/30"
    >
      <span className="min-w-0">
        <span className="text-xs font-black text-[#8f5b72] dark:text-cyan-100/60">{label}</span>
        <span className="mt-1 block truncate text-sm font-black text-[#26223a] dark:text-cyan-50">
          #{element.number} {element.name}
        </span>
      </span>
      <span className="font-mono text-lg font-black text-[#8f5b72] dark:text-cyan-100/60">{element.symbol}</span>
    </Link>
  );
}
