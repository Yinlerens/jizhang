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
        className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <ChevronLeft size={16} />
        元素周期表
      </Link>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
              <div className="flex flex-wrap gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  {categoryLabels[element.category]}
                </span>
                <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  {positionLabel}
                </span>
                <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  {crystal.name}
                </span>
              </div>
              <h1 className="mt-3 text-4xl font-black leading-tight text-zinc-950 dark:text-zinc-50">
                {element.name} <span className="font-mono text-zinc-500">{element.symbol}</span>
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
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
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <Atom size={18} className="text-zinc-500" />
              <h2 className="text-lg font-black text-zinc-950 dark:text-zinc-50">原子序列</h2>
            </div>
            <div className="mt-3 grid gap-2">
              <AdjacentElementLink label="前一位" element={adjacentElements.previous} />
              <AdjacentElementLink label="后一位" element={adjacentElements.next} />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                Ordered by atomic number
              </p>
              <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-zinc-50">
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
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-black leading-5 text-zinc-950 dark:text-zinc-50">{value}</p>
      {note && <p className="mt-1 text-[11px] font-semibold text-zinc-500">{note}</p>}
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
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
          Physical and chemical properties
        </p>
        <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-zinc-50">
          核心物理 / 化学数据
        </h2>
      </div>
      <dl className="mt-3 grid overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 lg:grid-cols-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-zinc-200 bg-white px-3 py-2 last:border-b-0 dark:border-zinc-800 dark:bg-zinc-900 lg:nth-last-2:border-b-0"
          >
            <dt className="text-xs font-bold text-zinc-500">{label}</dt>
            <dd className="min-w-0 wrap-break-word text-sm font-semibold leading-5 text-zinc-900 dark:text-zinc-100">
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
      className="flex min-w-0 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black"
        style={{ backgroundColor: palette.fill, color: palette.text }}
      >
        {peer.symbol}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-zinc-950 dark:text-zinc-50">
          #{peer.number} {peer.name}
        </span>
        <span className="block text-xs font-semibold text-zinc-500">{peer.mass}</span>
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
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-600">
        {label}
      </div>
    );
  }

  return (
    <Link
      href={getElementDetailPath(element)}
      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    >
      <span className="min-w-0">
        <span className="text-xs font-bold text-zinc-500">{label}</span>
        <span className="mt-1 block truncate text-sm font-black text-zinc-950 dark:text-zinc-50">
          #{element.number} {element.name}
        </span>
      </span>
      <span className="font-mono text-lg font-black text-zinc-500">{element.symbol}</span>
    </Link>
  );
}
