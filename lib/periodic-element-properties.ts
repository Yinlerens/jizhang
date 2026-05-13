import "server-only";
import { pTable } from "periodic-table-data-complete";
import type { PeriodicElement } from "@/lib/periodic-table";

interface RawElementData {
  symbol: string;
  atomic_mass?: number | string;
  boiling_point?: number | string;
  density?: {
    stp?: number | string;
    liquid?: number | string;
  };
  electron_affinity?: number | string;
  electron_configuration?: string;
  electron_configuration_semantic?: string;
  electronegativity_pauling?: number | string;
  heat?: {
    molar?: number | string;
    specific?: number | string;
  };
  ionization_energies?: Array<number | string>;
  isotopes_known?: string;
  isotopes_stable?: string;
  isotopic_abundances?: string;
  lattice_angles?: string;
  lattice_constants?: string;
  magnetic_type?: string;
  melting_point?: number | string;
  oxidation_states?: string;
  phase?: string;
  space_group_name?: string;
  space_group_number?: number | string;
  crystal_structure?: string;
}

export interface ElementScienceData {
  phase: string;
  atomicMass: string;
  density: string;
  meltingPoint: string;
  boilingPoint: string;
  electronegativity: string;
  electronAffinity: string;
  firstIonizationEnergy: string;
  molarHeat: string;
  oxidationStates: string;
  electronConfiguration: string;
  semanticConfiguration: string;
  stableIsotopes: string;
  isotopicAbundances: string;
  knownIsotopes: string;
  crystalStructure: string;
  spaceGroup: string;
  latticeConstants: string;
  latticeAngles: string;
  magneticType: string;
}

const rawElementData = JSON.parse(pTable) as RawElementData[];
const rawElementDataBySymbol = new Map(rawElementData.map((item) => [item.symbol, item]));

const unknown = "暂无可靠数据";

const formatValue = (value: number | string | null | undefined, suffix = "") => {
  if (value === null || value === undefined || value === "") {
    return unknown;
  }

  return `${value}${suffix}`;
};

const formatTemperature = (value: number | string | null | undefined) => {
  if (typeof value !== "number") {
    return formatValue(value);
  }

  return `${value} K / ${(value - 273.15).toFixed(1)} °C`;
};

const formatDensity = (value: number | string | null | undefined) => {
  if (typeof value !== "number") {
    return formatValue(value);
  }

  return `${value.toLocaleString("en-US")} kg/m³`;
};

export const getElementScienceData = (element: PeriodicElement): ElementScienceData => {
  const data = rawElementDataBySymbol.get(element.symbol);

  if (!data) {
    return {
      phase: unknown,
      atomicMass: element.mass,
      density: unknown,
      meltingPoint: unknown,
      boilingPoint: unknown,
      electronegativity: unknown,
      electronAffinity: unknown,
      firstIonizationEnergy: unknown,
      molarHeat: unknown,
      oxidationStates: unknown,
      electronConfiguration: unknown,
      semanticConfiguration: unknown,
      stableIsotopes: unknown,
      isotopicAbundances: unknown,
      knownIsotopes: unknown,
      crystalStructure: unknown,
      spaceGroup: unknown,
      latticeConstants: unknown,
      latticeAngles: unknown,
      magneticType: unknown,
    };
  }

  return {
    phase: formatValue(data.phase),
    atomicMass: formatValue(data.atomic_mass, " u"),
    density: formatDensity(data.density?.stp),
    meltingPoint: formatTemperature(data.melting_point),
    boilingPoint: formatTemperature(data.boiling_point),
    electronegativity: formatValue(data.electronegativity_pauling),
    electronAffinity: formatValue(data.electron_affinity, " kJ/mol"),
    firstIonizationEnergy: formatValue(data.ionization_energies?.[0], " kJ/mol"),
    molarHeat: formatValue(data.heat?.molar, " J/(mol·K)"),
    oxidationStates: formatValue(data.oxidation_states),
    electronConfiguration: formatValue(data.electron_configuration),
    semanticConfiguration: formatValue(data.electron_configuration_semantic),
    stableIsotopes: formatValue(data.isotopes_stable),
    isotopicAbundances: formatValue(data.isotopic_abundances),
    knownIsotopes: formatValue(data.isotopes_known),
    crystalStructure: formatValue(data.crystal_structure),
    spaceGroup:
      data.space_group_name || data.space_group_number
        ? `${data.space_group_name ?? ""}${data.space_group_number ? ` · No.${data.space_group_number}` : ""}`
        : unknown,
    latticeConstants: formatValue(data.lattice_constants),
    latticeAngles: formatValue(data.lattice_angles),
    magneticType: formatValue(data.magnetic_type),
  };
};
