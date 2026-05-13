export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "reactive-nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export type CrystalStructureKey =
  | "body-centered-cubic"
  | "face-centered-cubic"
  | "hexagonal-close-packed"
  | "double-hexagonal-close-packed"
  | "simple-cubic"
  | "diamond-cubic"
  | "layered-hexagonal"
  | "orthorhombic"
  | "tetragonal"
  | "rhombohedral"
  | "trigonal"
  | "monoclinic"
  | "molecular-solid"
  | "atomic-solid"
  | "complex-metallic"
  | "predicted";

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  // ECharts matrix 用 group/row 定位单元格；row 8/9 是镧系、锕系的展示行。
  group: number;
  row: number;
  mass: string;
  category: ElementCategory;
}

export interface ElectronShell {
  label: string;
  electrons: number;
  radius: number;
  duration: number;
  direction: "normal" | "reverse";
}

export interface CrystalStructureProfile {
  key: CrystalStructureKey;
  name: string;
  englishName: string;
  shortName: string;
  description: string;
  note: string;
  visualFamily:
    | "bcc"
    | "fcc"
    | "hcp"
    | "dhcp"
    | "simple"
    | "diamond"
    | "layered"
    | "orthorhombic"
    | "tetragonal"
    | "rhombohedral"
    | "trigonal"
    | "monoclinic"
    | "molecular"
    | "complex"
    | "predicted";
}

// 分类、颜色和筛选按钮共用同一套 key，避免图表配色和菜单文案分叉。
export const categoryLabels: Record<ElementCategory, string> = {
  "alkali-metal": "碱金属",
  "alkaline-earth": "碱土金属",
  "transition-metal": "过渡金属",
  "post-transition-metal": "后过渡金属",
  metalloid: "类金属",
  "reactive-nonmetal": "反应性非金属",
  halogen: "卤素",
  "noble-gas": "稀有气体",
  lanthanide: "镧系",
  actinide: "锕系",
  unknown: "待定性质",
};

export const categoryOrder: ElementCategory[] = [
  "alkali-metal",
  "alkaline-earth",
  "transition-metal",
  "post-transition-metal",
  "metalloid",
  "reactive-nonmetal",
  "halogen",
  "noble-gas",
  "lanthanide",
  "actinide",
  "unknown",
];

export const categoryColors: Record<
  ElementCategory,
  { fill: string; stroke: string; text: string; accent: string }
> = {
  "alkali-metal": {
    fill: "#ffe7a8",
    stroke: "#d99820",
    text: "#5b3b00",
    accent: "#f6b333",
  },
  "alkaline-earth": {
    fill: "#dff2b1",
    stroke: "#83a92c",
    text: "#314400",
    accent: "#9fc23a",
  },
  "transition-metal": {
    fill: "#d9ecff",
    stroke: "#4d91ce",
    text: "#0d3557",
    accent: "#4a9fe8",
  },
  "post-transition-metal": {
    fill: "#d9f4ee",
    stroke: "#4ca391",
    text: "#073d33",
    accent: "#41b39f",
  },
  metalloid: {
    fill: "#f2e0c7",
    stroke: "#aa7c45",
    text: "#4a2d10",
    accent: "#c48c48",
  },
  "reactive-nonmetal": {
    fill: "#e4ddff",
    stroke: "#8972d9",
    text: "#2d235c",
    accent: "#8d77e8",
  },
  halogen: {
    fill: "#ffdce8",
    stroke: "#d06b91",
    text: "#5d1832",
    accent: "#e36a97",
  },
  "noble-gas": {
    fill: "#d8f3ff",
    stroke: "#4d9ab8",
    text: "#083747",
    accent: "#3eb8d8",
  },
  lanthanide: {
    fill: "#f7d5c8",
    stroke: "#c56c48",
    text: "#55200d",
    accent: "#d97855",
  },
  actinide: {
    fill: "#f2d4f3",
    stroke: "#b264b5",
    text: "#4d1c50",
    accent: "#bd69c1",
  },
  unknown: {
    fill: "#e5e7eb",
    stroke: "#9ca3af",
    text: "#27272a",
    accent: "#71717a",
  },
};

export const categoryProfiles: Record<
  ElementCategory,
  { headline: string; description: string; signature: string }
> = {
  "alkali-metal": {
    headline: "柔软、活泼、反应性强的 s 区金属",
    description: "碱金属通常具有较低密度和较强还原性，在周期表左侧形成一条反应活跃的纵列。",
    signature: "易失电子",
  },
  "alkaline-earth": {
    headline: "结构更稳、仍然活泼的碱土金属",
    description: "碱土金属比碱金属更硬、更致密，是矿物、骨骼和工业材料里常见的基础成员。",
    signature: "二价倾向",
  },
  "transition-metal": {
    headline: "高熔点、多价态、工业骨架",
    description: "过渡金属占据周期表中部，常见于合金、催化、电化学和高强度材料体系。",
    signature: "d 区金属",
  },
  "post-transition-metal": {
    headline: "更柔软、更低熔点的主族金属",
    description: "后过渡金属通常兼具金属导电性与较弱的金属键，常出现在低熔点合金和电子材料中。",
    signature: "主族金属",
  },
  metalloid: {
    headline: "跨在金属与非金属边界上的半导体气质",
    description: "类金属的性质介于金属和非金属之间，是半导体、玻璃和功能材料的重要来源。",
    signature: "边界元素",
  },
  "reactive-nonmetal": {
    headline: "生命化学和大气循环的核心非金属",
    description: "反应性非金属电负性较强，容易形成共价化合物，是水、有机物和生命系统的关键组成。",
    signature: "共价骨架",
  },
  halogen: {
    headline: "强电负性、成盐能力突出的非金属族",
    description: "卤素通常以双原子分子或卤化物形式出现，广泛参与消毒、照明、药物和材料合成。",
    signature: "成盐元素",
  },
  "noble-gas": {
    headline: "外层电子稳定、反应性极低",
    description: "稀有气体通常以单原子气体存在，因稳定和发光特性常用于照明、保护气和低温技术。",
    signature: "稳定外层",
  },
  lanthanide: {
    headline: "磁性、发光和精密材料里的稀土主角",
    description: "镧系元素构成稀土家族主体，常用于永磁体、荧光材料、光学玻璃和高性能合金。",
    signature: "4f 电子",
  },
  actinide: {
    headline: "重核、放射性与核能研究的核心区域",
    description: "锕系元素位于周期表底部，多数具有放射性，是核能、同位素技术和基础物理研究的重点。",
    signature: "5f 电子",
  },
  unknown: {
    headline: "超重元素前沿，性质仍在实验确认中",
    description: "这些元素多由人工合成且寿命极短，化学性质常依赖理论预测和极少量实验线索。",
    signature: "待定性质",
  },
};

export const periodicRows: Record<number, string> = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "镧系",
  9: "锕系",
};

// 完整 118 个元素。坐标遵循常见周期表布局，镧系/锕系展开到底部两行。
export const periodicElements: PeriodicElement[] = [
  {
    number: 1,
    symbol: "H",
    name: "氢",
    group: 1,
    row: 1,
    mass: "1.008",
    category: "reactive-nonmetal",
  },
  { number: 2, symbol: "He", name: "氦", group: 18, row: 1, mass: "4.0026", category: "noble-gas" },
  { number: 3, symbol: "Li", name: "锂", group: 1, row: 2, mass: "6.94", category: "alkali-metal" },
  {
    number: 4,
    symbol: "Be",
    name: "铍",
    group: 2,
    row: 2,
    mass: "9.0122",
    category: "alkaline-earth",
  },
  { number: 5, symbol: "B", name: "硼", group: 13, row: 2, mass: "10.81", category: "metalloid" },
  {
    number: 6,
    symbol: "C",
    name: "碳",
    group: 14,
    row: 2,
    mass: "12.011",
    category: "reactive-nonmetal",
  },
  {
    number: 7,
    symbol: "N",
    name: "氮",
    group: 15,
    row: 2,
    mass: "14.007",
    category: "reactive-nonmetal",
  },
  {
    number: 8,
    symbol: "O",
    name: "氧",
    group: 16,
    row: 2,
    mass: "15.999",
    category: "reactive-nonmetal",
  },
  { number: 9, symbol: "F", name: "氟", group: 17, row: 2, mass: "18.998", category: "halogen" },
  {
    number: 10,
    symbol: "Ne",
    name: "氖",
    group: 18,
    row: 2,
    mass: "20.180",
    category: "noble-gas",
  },
  {
    number: 11,
    symbol: "Na",
    name: "钠",
    group: 1,
    row: 3,
    mass: "22.990",
    category: "alkali-metal",
  },
  {
    number: 12,
    symbol: "Mg",
    name: "镁",
    group: 2,
    row: 3,
    mass: "24.305",
    category: "alkaline-earth",
  },
  {
    number: 13,
    symbol: "Al",
    name: "铝",
    group: 13,
    row: 3,
    mass: "26.982",
    category: "post-transition-metal",
  },
  {
    number: 14,
    symbol: "Si",
    name: "硅",
    group: 14,
    row: 3,
    mass: "28.085",
    category: "metalloid",
  },
  {
    number: 15,
    symbol: "P",
    name: "磷",
    group: 15,
    row: 3,
    mass: "30.974",
    category: "reactive-nonmetal",
  },
  {
    number: 16,
    symbol: "S",
    name: "硫",
    group: 16,
    row: 3,
    mass: "32.06",
    category: "reactive-nonmetal",
  },
  { number: 17, symbol: "Cl", name: "氯", group: 17, row: 3, mass: "35.45", category: "halogen" },
  {
    number: 18,
    symbol: "Ar",
    name: "氩",
    group: 18,
    row: 3,
    mass: "39.948",
    category: "noble-gas",
  },
  {
    number: 19,
    symbol: "K",
    name: "钾",
    group: 1,
    row: 4,
    mass: "39.098",
    category: "alkali-metal",
  },
  {
    number: 20,
    symbol: "Ca",
    name: "钙",
    group: 2,
    row: 4,
    mass: "40.078",
    category: "alkaline-earth",
  },
  {
    number: 21,
    symbol: "Sc",
    name: "钪",
    group: 3,
    row: 4,
    mass: "44.956",
    category: "transition-metal",
  },
  {
    number: 22,
    symbol: "Ti",
    name: "钛",
    group: 4,
    row: 4,
    mass: "47.867",
    category: "transition-metal",
  },
  {
    number: 23,
    symbol: "V",
    name: "钒",
    group: 5,
    row: 4,
    mass: "50.942",
    category: "transition-metal",
  },
  {
    number: 24,
    symbol: "Cr",
    name: "铬",
    group: 6,
    row: 4,
    mass: "51.996",
    category: "transition-metal",
  },
  {
    number: 25,
    symbol: "Mn",
    name: "锰",
    group: 7,
    row: 4,
    mass: "54.938",
    category: "transition-metal",
  },
  {
    number: 26,
    symbol: "Fe",
    name: "铁",
    group: 8,
    row: 4,
    mass: "55.845",
    category: "transition-metal",
  },
  {
    number: 27,
    symbol: "Co",
    name: "钴",
    group: 9,
    row: 4,
    mass: "58.933",
    category: "transition-metal",
  },
  {
    number: 28,
    symbol: "Ni",
    name: "镍",
    group: 10,
    row: 4,
    mass: "58.693",
    category: "transition-metal",
  },
  {
    number: 29,
    symbol: "Cu",
    name: "铜",
    group: 11,
    row: 4,
    mass: "63.546",
    category: "transition-metal",
  },
  {
    number: 30,
    symbol: "Zn",
    name: "锌",
    group: 12,
    row: 4,
    mass: "65.38",
    category: "transition-metal",
  },
  {
    number: 31,
    symbol: "Ga",
    name: "镓",
    group: 13,
    row: 4,
    mass: "69.723",
    category: "post-transition-metal",
  },
  {
    number: 32,
    symbol: "Ge",
    name: "锗",
    group: 14,
    row: 4,
    mass: "72.630",
    category: "metalloid",
  },
  {
    number: 33,
    symbol: "As",
    name: "砷",
    group: 15,
    row: 4,
    mass: "74.922",
    category: "metalloid",
  },
  {
    number: 34,
    symbol: "Se",
    name: "硒",
    group: 16,
    row: 4,
    mass: "78.971",
    category: "reactive-nonmetal",
  },
  { number: 35, symbol: "Br", name: "溴", group: 17, row: 4, mass: "79.904", category: "halogen" },
  {
    number: 36,
    symbol: "Kr",
    name: "氪",
    group: 18,
    row: 4,
    mass: "83.798",
    category: "noble-gas",
  },
  {
    number: 37,
    symbol: "Rb",
    name: "铷",
    group: 1,
    row: 5,
    mass: "85.468",
    category: "alkali-metal",
  },
  {
    number: 38,
    symbol: "Sr",
    name: "锶",
    group: 2,
    row: 5,
    mass: "87.62",
    category: "alkaline-earth",
  },
  {
    number: 39,
    symbol: "Y",
    name: "钇",
    group: 3,
    row: 5,
    mass: "88.906",
    category: "transition-metal",
  },
  {
    number: 40,
    symbol: "Zr",
    name: "锆",
    group: 4,
    row: 5,
    mass: "91.224",
    category: "transition-metal",
  },
  {
    number: 41,
    symbol: "Nb",
    name: "铌",
    group: 5,
    row: 5,
    mass: "92.906",
    category: "transition-metal",
  },
  {
    number: 42,
    symbol: "Mo",
    name: "钼",
    group: 6,
    row: 5,
    mass: "95.95",
    category: "transition-metal",
  },
  {
    number: 43,
    symbol: "Tc",
    name: "锝",
    group: 7,
    row: 5,
    mass: "98",
    category: "transition-metal",
  },
  {
    number: 44,
    symbol: "Ru",
    name: "钌",
    group: 8,
    row: 5,
    mass: "101.07",
    category: "transition-metal",
  },
  {
    number: 45,
    symbol: "Rh",
    name: "铑",
    group: 9,
    row: 5,
    mass: "102.91",
    category: "transition-metal",
  },
  {
    number: 46,
    symbol: "Pd",
    name: "钯",
    group: 10,
    row: 5,
    mass: "106.42",
    category: "transition-metal",
  },
  {
    number: 47,
    symbol: "Ag",
    name: "银",
    group: 11,
    row: 5,
    mass: "107.87",
    category: "transition-metal",
  },
  {
    number: 48,
    symbol: "Cd",
    name: "镉",
    group: 12,
    row: 5,
    mass: "112.41",
    category: "transition-metal",
  },
  {
    number: 49,
    symbol: "In",
    name: "铟",
    group: 13,
    row: 5,
    mass: "114.82",
    category: "post-transition-metal",
  },
  {
    number: 50,
    symbol: "Sn",
    name: "锡",
    group: 14,
    row: 5,
    mass: "118.71",
    category: "post-transition-metal",
  },
  {
    number: 51,
    symbol: "Sb",
    name: "锑",
    group: 15,
    row: 5,
    mass: "121.76",
    category: "metalloid",
  },
  {
    number: 52,
    symbol: "Te",
    name: "碲",
    group: 16,
    row: 5,
    mass: "127.60",
    category: "metalloid",
  },
  { number: 53, symbol: "I", name: "碘", group: 17, row: 5, mass: "126.90", category: "halogen" },
  {
    number: 54,
    symbol: "Xe",
    name: "氙",
    group: 18,
    row: 5,
    mass: "131.29",
    category: "noble-gas",
  },
  {
    number: 55,
    symbol: "Cs",
    name: "铯",
    group: 1,
    row: 6,
    mass: "132.91",
    category: "alkali-metal",
  },
  {
    number: 56,
    symbol: "Ba",
    name: "钡",
    group: 2,
    row: 6,
    mass: "137.33",
    category: "alkaline-earth",
  },
  {
    number: 72,
    symbol: "Hf",
    name: "铪",
    group: 4,
    row: 6,
    mass: "178.49",
    category: "transition-metal",
  },
  {
    number: 73,
    symbol: "Ta",
    name: "钽",
    group: 5,
    row: 6,
    mass: "180.95",
    category: "transition-metal",
  },
  {
    number: 74,
    symbol: "W",
    name: "钨",
    group: 6,
    row: 6,
    mass: "183.84",
    category: "transition-metal",
  },
  {
    number: 75,
    symbol: "Re",
    name: "铼",
    group: 7,
    row: 6,
    mass: "186.21",
    category: "transition-metal",
  },
  {
    number: 76,
    symbol: "Os",
    name: "锇",
    group: 8,
    row: 6,
    mass: "190.23",
    category: "transition-metal",
  },
  {
    number: 77,
    symbol: "Ir",
    name: "铱",
    group: 9,
    row: 6,
    mass: "192.22",
    category: "transition-metal",
  },
  {
    number: 78,
    symbol: "Pt",
    name: "铂",
    group: 10,
    row: 6,
    mass: "195.08",
    category: "transition-metal",
  },
  {
    number: 79,
    symbol: "Au",
    name: "金",
    group: 11,
    row: 6,
    mass: "196.97",
    category: "transition-metal",
  },
  {
    number: 80,
    symbol: "Hg",
    name: "汞",
    group: 12,
    row: 6,
    mass: "200.59",
    category: "transition-metal",
  },
  {
    number: 81,
    symbol: "Tl",
    name: "铊",
    group: 13,
    row: 6,
    mass: "204.38",
    category: "post-transition-metal",
  },
  {
    number: 82,
    symbol: "Pb",
    name: "铅",
    group: 14,
    row: 6,
    mass: "207.2",
    category: "post-transition-metal",
  },
  {
    number: 83,
    symbol: "Bi",
    name: "铋",
    group: 15,
    row: 6,
    mass: "208.98",
    category: "post-transition-metal",
  },
  {
    number: 84,
    symbol: "Po",
    name: "钋",
    group: 16,
    row: 6,
    mass: "209",
    category: "post-transition-metal",
  },
  { number: 85, symbol: "At", name: "砹", group: 17, row: 6, mass: "210", category: "halogen" },
  { number: 86, symbol: "Rn", name: "氡", group: 18, row: 6, mass: "222", category: "noble-gas" },
  { number: 87, symbol: "Fr", name: "钫", group: 1, row: 7, mass: "223", category: "alkali-metal" },
  {
    number: 88,
    symbol: "Ra",
    name: "镭",
    group: 2,
    row: 7,
    mass: "226",
    category: "alkaline-earth",
  },
  {
    number: 104,
    symbol: "Rf",
    name: "𬬻",
    group: 4,
    row: 7,
    mass: "267",
    category: "transition-metal",
  },
  {
    number: 105,
    symbol: "Db",
    name: "𬭊",
    group: 5,
    row: 7,
    mass: "268",
    category: "transition-metal",
  },
  {
    number: 106,
    symbol: "Sg",
    name: "𬭳",
    group: 6,
    row: 7,
    mass: "269",
    category: "transition-metal",
  },
  {
    number: 107,
    symbol: "Bh",
    name: "𬭛",
    group: 7,
    row: 7,
    mass: "270",
    category: "transition-metal",
  },
  {
    number: 108,
    symbol: "Hs",
    name: "𬭶",
    group: 8,
    row: 7,
    mass: "277",
    category: "transition-metal",
  },
  { number: 109, symbol: "Mt", name: "鿏", group: 9, row: 7, mass: "278", category: "unknown" },
  { number: 110, symbol: "Ds", name: "𫟼", group: 10, row: 7, mass: "281", category: "unknown" },
  { number: 111, symbol: "Rg", name: "𬬭", group: 11, row: 7, mass: "282", category: "unknown" },
  {
    number: 112,
    symbol: "Cn",
    name: "鎶",
    group: 12,
    row: 7,
    mass: "285",
    category: "transition-metal",
  },
  { number: 113, symbol: "Nh", name: "鉨", group: 13, row: 7, mass: "286", category: "unknown" },
  {
    number: 114,
    symbol: "Fl",
    name: "𫓧",
    group: 14,
    row: 7,
    mass: "289",
    category: "post-transition-metal",
  },
  { number: 115, symbol: "Mc", name: "镆", group: 15, row: 7, mass: "290", category: "unknown" },
  {
    number: 116,
    symbol: "Lv",
    name: "𫟷",
    group: 16,
    row: 7,
    mass: "293",
    category: "post-transition-metal",
  },
  { number: 117, symbol: "Ts", name: "鿬", group: 17, row: 7, mass: "294", category: "unknown" },
  { number: 118, symbol: "Og", name: "奥气", group: 18, row: 7, mass: "294", category: "unknown" },
  {
    number: 57,
    symbol: "La",
    name: "镧",
    group: 4,
    row: 8,
    mass: "138.91",
    category: "lanthanide",
  },
  {
    number: 58,
    symbol: "Ce",
    name: "铈",
    group: 5,
    row: 8,
    mass: "140.12",
    category: "lanthanide",
  },
  {
    number: 59,
    symbol: "Pr",
    name: "镨",
    group: 6,
    row: 8,
    mass: "140.91",
    category: "lanthanide",
  },
  {
    number: 60,
    symbol: "Nd",
    name: "钕",
    group: 7,
    row: 8,
    mass: "144.24",
    category: "lanthanide",
  },
  { number: 61, symbol: "Pm", name: "钷", group: 8, row: 8, mass: "145", category: "lanthanide" },
  {
    number: 62,
    symbol: "Sm",
    name: "钐",
    group: 9,
    row: 8,
    mass: "150.36",
    category: "lanthanide",
  },
  {
    number: 63,
    symbol: "Eu",
    name: "铕",
    group: 10,
    row: 8,
    mass: "151.96",
    category: "lanthanide",
  },
  {
    number: 64,
    symbol: "Gd",
    name: "钆",
    group: 11,
    row: 8,
    mass: "157.25",
    category: "lanthanide",
  },
  {
    number: 65,
    symbol: "Tb",
    name: "铽",
    group: 12,
    row: 8,
    mass: "158.93",
    category: "lanthanide",
  },
  {
    number: 66,
    symbol: "Dy",
    name: "镝",
    group: 13,
    row: 8,
    mass: "162.50",
    category: "lanthanide",
  },
  {
    number: 67,
    symbol: "Ho",
    name: "钬",
    group: 14,
    row: 8,
    mass: "164.93",
    category: "lanthanide",
  },
  {
    number: 68,
    symbol: "Er",
    name: "铒",
    group: 15,
    row: 8,
    mass: "167.26",
    category: "lanthanide",
  },
  {
    number: 69,
    symbol: "Tm",
    name: "铥",
    group: 16,
    row: 8,
    mass: "168.93",
    category: "lanthanide",
  },
  {
    number: 70,
    symbol: "Yb",
    name: "镱",
    group: 17,
    row: 8,
    mass: "173.05",
    category: "lanthanide",
  },
  {
    number: 71,
    symbol: "Lu",
    name: "镥",
    group: 18,
    row: 8,
    mass: "174.97",
    category: "lanthanide",
  },
  { number: 89, symbol: "Ac", name: "锕", group: 4, row: 9, mass: "227", category: "actinide" },
  { number: 90, symbol: "Th", name: "钍", group: 5, row: 9, mass: "232.04", category: "actinide" },
  { number: 91, symbol: "Pa", name: "镤", group: 6, row: 9, mass: "231.04", category: "actinide" },
  { number: 92, symbol: "U", name: "铀", group: 7, row: 9, mass: "238.03", category: "actinide" },
  { number: 93, symbol: "Np", name: "镎", group: 8, row: 9, mass: "237", category: "actinide" },
  { number: 94, symbol: "Pu", name: "钚", group: 9, row: 9, mass: "244", category: "actinide" },
  { number: 95, symbol: "Am", name: "镅", group: 10, row: 9, mass: "243", category: "actinide" },
  { number: 96, symbol: "Cm", name: "锔", group: 11, row: 9, mass: "247", category: "actinide" },
  { number: 97, symbol: "Bk", name: "锫", group: 12, row: 9, mass: "247", category: "actinide" },
  { number: 98, symbol: "Cf", name: "锎", group: 13, row: 9, mass: "251", category: "actinide" },
  { number: 99, symbol: "Es", name: "锿", group: 14, row: 9, mass: "252", category: "actinide" },
  { number: 100, symbol: "Fm", name: "镄", group: 15, row: 9, mass: "257", category: "actinide" },
  { number: 101, symbol: "Md", name: "钔", group: 16, row: 9, mass: "258", category: "actinide" },
  { number: 102, symbol: "No", name: "锘", group: 17, row: 9, mass: "259", category: "actinide" },
  { number: 103, symbol: "Lr", name: "铹", group: 18, row: 9, mass: "266", category: "actinide" },
];

// 预计算分类数量，筛选条和概览指标都从这里读取。
export const categoryCounts = categoryOrder.map((category) => ({
  category,
  label: categoryLabels[category],
  count: periodicElements.filter((element) => element.category === category).length,
}));

export const getElementSlug = (element: Pick<PeriodicElement, "symbol">) =>
  element.symbol.toLowerCase();

export const getElementDetailPath = (element: Pick<PeriodicElement, "symbol">) =>
  `/dashboard/charts/elements/${getElementSlug(element)}`;

const periodicElementsBySlug = new Map(
  periodicElements.map((element) => [getElementSlug(element), element]),
);

export const getPeriodicElementBySlug = (slug: string) =>
  periodicElementsBySlug.get(slug.toLowerCase());

export const getElementPeriod = (element: PeriodicElement) => {
  if (element.category === "lanthanide") {
    return 6;
  }

  if (element.category === "actinide") {
    return 7;
  }

  return element.row;
};

export const getElementBlock = (element: PeriodicElement) => {
  if (element.category === "lanthanide" || element.category === "actinide") {
    return "f 区";
  }

  if (element.symbol === "He" || element.group <= 2) {
    return "s 区";
  }

  if (element.group >= 3 && element.group <= 12) {
    return "d 区";
  }

  return "p 区";
};

export const getElementPositionLabel = (element: PeriodicElement) => {
  const period = getElementPeriod(element);

  if (element.category === "lanthanide" || element.category === "actinide") {
    return `第 ${period} 周期 / ${categoryLabels[element.category]}展开列 ${element.group}`;
  }

  return `第 ${period} 周期 / 第 ${element.group} 族`;
};

export const getAdjacentElements = (element: PeriodicElement) => ({
  previous: periodicElements.find((item) => item.number === element.number - 1) ?? null,
  next: periodicElements.find((item) => item.number === element.number + 1) ?? null,
});

export const getCategoryPeers = (element: PeriodicElement, limit = 6) =>
  periodicElements
    .filter((item) => item.category === element.category && item.symbol !== element.symbol)
    .sort((a, b) => a.number - b.number)
    .slice(0, limit);

const shellLabels = ["K", "L", "M", "N", "O", "P", "Q"];

const orbitalFillOrder = [
  { shell: 1, capacity: 2 },
  { shell: 2, capacity: 2 },
  { shell: 2, capacity: 6 },
  { shell: 3, capacity: 2 },
  { shell: 3, capacity: 6 },
  { shell: 4, capacity: 2 },
  { shell: 3, capacity: 10 },
  { shell: 4, capacity: 6 },
  { shell: 5, capacity: 2 },
  { shell: 4, capacity: 10 },
  { shell: 5, capacity: 6 },
  { shell: 6, capacity: 2 },
  { shell: 4, capacity: 14 },
  { shell: 5, capacity: 10 },
  { shell: 6, capacity: 6 },
  { shell: 7, capacity: 2 },
  { shell: 5, capacity: 14 },
  { shell: 6, capacity: 10 },
  { shell: 7, capacity: 6 },
];

const electronShellOverrides: Partial<Record<string, number[]>> = {
  Cr: [2, 8, 13, 1],
  Cu: [2, 8, 18, 1],
  Nb: [2, 8, 18, 12, 1],
  Mo: [2, 8, 18, 13, 1],
  Ru: [2, 8, 18, 15, 1],
  Rh: [2, 8, 18, 16, 1],
  Pd: [2, 8, 18, 18],
  Ag: [2, 8, 18, 18, 1],
  La: [2, 8, 18, 18, 9, 2],
  Ce: [2, 8, 18, 19, 9, 2],
  Gd: [2, 8, 18, 25, 9, 2],
  Pt: [2, 8, 18, 32, 17, 1],
  Au: [2, 8, 18, 32, 18, 1],
  Ac: [2, 8, 18, 32, 18, 9, 2],
  Th: [2, 8, 18, 32, 18, 10, 2],
  Pa: [2, 8, 18, 32, 20, 9, 2],
  U: [2, 8, 18, 32, 21, 9, 2],
  Np: [2, 8, 18, 32, 22, 9, 2],
  Pu: [2, 8, 18, 32, 24, 8, 2],
  Am: [2, 8, 18, 32, 25, 8, 2],
  Cm: [2, 8, 18, 32, 25, 9, 2],
  Bk: [2, 8, 18, 32, 27, 8, 2],
  Cf: [2, 8, 18, 32, 28, 8, 2],
  Es: [2, 8, 18, 32, 29, 8, 2],
  Fm: [2, 8, 18, 32, 30, 8, 2],
  Md: [2, 8, 18, 32, 31, 8, 2],
  No: [2, 8, 18, 32, 32, 8, 2],
  Lr: [2, 8, 18, 32, 32, 8, 3],
};

const calculateElectronShellCounts = (atomicNumber: number) => {
  const counts = Array.from({ length: 7 }, () => 0);
  let remaining = atomicNumber;

  for (const orbital of orbitalFillOrder) {
    if (remaining <= 0) {
      break;
    }

    const electrons = Math.min(orbital.capacity, remaining);
    counts[orbital.shell - 1] += electrons;
    remaining -= electrons;
  }

  return counts;
};

export const getElectronShells = (element: PeriodicElement): ElectronShell[] => {
  const counts = electronShellOverrides[element.symbol] ?? calculateElectronShellCounts(element.number);
  const visibleCounts = counts.filter((count) => count > 0);
  const shellCount = Math.max(visibleCounts.length, 1);

  return visibleCounts.map((electrons, index) => ({
    label: shellLabels[index],
    electrons,
    radius: 86 + (index * 122) / shellCount,
    duration: 8.5 + index * 2.6,
    direction: index % 2 === 0 ? "normal" : "reverse",
  }));
};

export const getElectronShellNotation = (shells: ElectronShell[]) =>
  shells.map((shell) => `${shell.label}${shell.electrons}`).join(" ");

export const crystalStructureProfiles: Record<CrystalStructureKey, CrystalStructureProfile> = {
  "body-centered-cubic": {
    key: "body-centered-cubic",
    name: "体心立方",
    englishName: "Body-centered cubic",
    shortName: "BCC",
    description: "八个顶点原子围绕一个体心原子，金属键方向更均匀，常见于碱金属和部分高熔点金属。",
    note: "以常见固态相为准；部分元素会随温度发生相变。",
    visualFamily: "bcc",
  },
  "face-centered-cubic": {
    key: "face-centered-cubic",
    name: "面心立方",
    englishName: "Face-centered cubic",
    shortName: "FCC",
    description: "立方体顶点与六个面心共同构成密堆积结构，延展性和滑移系通常较丰富。",
    note: "常见于铝、铜、银、金、铂等金属。",
    visualFamily: "fcc",
  },
  "hexagonal-close-packed": {
    key: "hexagonal-close-packed",
    name: "六方密堆积",
    englishName: "Hexagonal close-packed",
    shortName: "HCP",
    description: "原子以 ABAB 层序密堆积，常见于镁、钛、锌和多种稀土金属。",
    note: "稀土元素存在相近的六方或双六方密堆积变体。",
    visualFamily: "hcp",
  },
  "double-hexagonal-close-packed": {
    key: "double-hexagonal-close-packed",
    name: "双六方密堆积",
    englishName: "Double hexagonal close-packed",
    shortName: "DHCP",
    description: "由更长的密堆积层序形成，常见于部分镧系和锕系元素。",
    note: "用于表现 La、Pr、Nd、Am 等常见低温或室温金属相。",
    visualFamily: "dhcp",
  },
  "simple-cubic": {
    key: "simple-cubic",
    name: "简单立方",
    englishName: "Simple cubic",
    shortName: "SC",
    description: "原子位于立方体顶点，是自然元素中非常罕见但很有辨识度的晶格类型。",
    note: "钋的 alpha 相是经典代表。",
    visualFamily: "simple",
  },
  "diamond-cubic": {
    key: "diamond-cubic",
    name: "金刚石立方",
    englishName: "Diamond cubic",
    shortName: "DC",
    description: "四面体共价网络构成高方向性的晶格，是硅、锗和金刚石相碳的典型结构。",
    note: "碳也常以石墨层状结构存在；这里按共价晶格展示。",
    visualFamily: "diamond",
  },
  "layered-hexagonal": {
    key: "layered-hexagonal",
    name: "层状六方",
    englishName: "Layered hexagonal",
    shortName: "HEX",
    description: "强共价层与较弱层间作用叠合，适合表现石墨、黑磷等层状晶体。",
    note: "同一元素可能有多个同素异形体。",
    visualFamily: "layered",
  },
  orthorhombic: {
    key: "orthorhombic",
    name: "正交晶系",
    englishName: "Orthorhombic",
    shortName: "ORTH",
    description: "三个晶轴互相垂直但长度不同，常见于硫、碘、铀和若干分子晶体。",
    note: "复杂分子或金属相在这里用正交晶胞作概念化呈现。",
    visualFamily: "orthorhombic",
  },
  tetragonal: {
    key: "tetragonal",
    name: "四方晶系",
    englishName: "Tetragonal",
    shortName: "TET",
    description: "两个等长基轴配合一个不同高度的主轴，白锡和部分锕系金属常见这种结构。",
    note: "晶胞比例为示意，不代表精确晶格常数。",
    visualFamily: "tetragonal",
  },
  rhombohedral: {
    key: "rhombohedral",
    name: "菱方晶系",
    englishName: "Rhombohedral",
    shortName: "RHL",
    description: "晶胞像被剪切的立方体，常见于砷、锑、铋以及部分稀土金属相。",
    note: "适合呈现带有层状或半金属性质的元素晶体。",
    visualFamily: "rhombohedral",
  },
  trigonal: {
    key: "trigonal",
    name: "三方晶系",
    englishName: "Trigonal",
    shortName: "TRI",
    description: "围绕三重对称轴组织结构，硒和碲的螺旋链晶体可归入这一类展示。",
    note: "以常见同素异形体为视觉依据。",
    visualFamily: "trigonal",
  },
  monoclinic: {
    key: "monoclinic",
    name: "单斜晶系",
    englishName: "Monoclinic",
    shortName: "MONO",
    description: "一个晶轴倾斜，常用于表现较复杂的低对称结构或特定同素异形体。",
    note: "钚的 alpha 相是低对称金属结构的代表。",
    visualFamily: "monoclinic",
  },
  "molecular-solid": {
    key: "molecular-solid",
    name: "分子晶体",
    englishName: "Molecular solid",
    shortName: "MOL",
    description: "由分子单元通过较弱的分子间作用排列，适合常温为气体或分子固体的非金属。",
    note: "常温常压下可能不是固态；这里展示其凝聚态晶体倾向。",
    visualFamily: "molecular",
  },
  "atomic-solid": {
    key: "atomic-solid",
    name: "原子晶体",
    englishName: "Atomic solid",
    shortName: "ATOM",
    description: "惰性原子在低温高压下形成的范德华固体，常见示意接近密堆积。",
    note: "稀有气体常温常压下为单原子气体。",
    visualFamily: "fcc",
  },
  "complex-metallic": {
    key: "complex-metallic",
    name: "复杂金属结构",
    englishName: "Complex metallic",
    shortName: "CMPX",
    description: "低对称或多原子基元的金属晶体，用扭转晶胞突出其结构复杂性。",
    note: "用于锰、镓、部分锕系和结构细节较复杂的元素。",
    visualFamily: "complex",
  },
  predicted: {
    key: "predicted",
    name: "预测或实验有限",
    englishName: "Predicted / limited data",
    shortName: "PRED",
    description: "元素寿命极短或实验样品极少，晶体结构主要依赖理论推断或尚未稳定测定。",
    note: "超重元素页面采用前沿研究占位式晶格。",
    visualFamily: "predicted",
  },
};

const crystalStructureBySymbol: Partial<Record<string, CrystalStructureKey>> = {
  H: "molecular-solid",
  He: "atomic-solid",
  Li: "body-centered-cubic",
  Be: "hexagonal-close-packed",
  B: "rhombohedral",
  C: "diamond-cubic",
  N: "molecular-solid",
  O: "molecular-solid",
  F: "molecular-solid",
  Ne: "atomic-solid",
  Na: "body-centered-cubic",
  Mg: "hexagonal-close-packed",
  Al: "face-centered-cubic",
  Si: "diamond-cubic",
  P: "layered-hexagonal",
  S: "orthorhombic",
  Cl: "molecular-solid",
  Ar: "atomic-solid",
  K: "body-centered-cubic",
  Ca: "face-centered-cubic",
  Sc: "hexagonal-close-packed",
  Ti: "hexagonal-close-packed",
  V: "body-centered-cubic",
  Cr: "body-centered-cubic",
  Mn: "complex-metallic",
  Fe: "body-centered-cubic",
  Co: "hexagonal-close-packed",
  Ni: "face-centered-cubic",
  Cu: "face-centered-cubic",
  Zn: "hexagonal-close-packed",
  Ga: "orthorhombic",
  Ge: "diamond-cubic",
  As: "rhombohedral",
  Se: "trigonal",
  Br: "orthorhombic",
  Kr: "atomic-solid",
  Rb: "body-centered-cubic",
  Sr: "face-centered-cubic",
  Y: "hexagonal-close-packed",
  Zr: "hexagonal-close-packed",
  Nb: "body-centered-cubic",
  Mo: "body-centered-cubic",
  Tc: "hexagonal-close-packed",
  Ru: "hexagonal-close-packed",
  Rh: "face-centered-cubic",
  Pd: "face-centered-cubic",
  Ag: "face-centered-cubic",
  Cd: "hexagonal-close-packed",
  In: "tetragonal",
  Sn: "tetragonal",
  Sb: "rhombohedral",
  Te: "trigonal",
  I: "orthorhombic",
  Xe: "atomic-solid",
  Cs: "body-centered-cubic",
  Ba: "body-centered-cubic",
  La: "double-hexagonal-close-packed",
  Ce: "face-centered-cubic",
  Pr: "double-hexagonal-close-packed",
  Nd: "double-hexagonal-close-packed",
  Pm: "double-hexagonal-close-packed",
  Sm: "rhombohedral",
  Eu: "body-centered-cubic",
  Gd: "hexagonal-close-packed",
  Tb: "hexagonal-close-packed",
  Dy: "hexagonal-close-packed",
  Ho: "hexagonal-close-packed",
  Er: "hexagonal-close-packed",
  Tm: "hexagonal-close-packed",
  Yb: "face-centered-cubic",
  Lu: "hexagonal-close-packed",
  Hf: "hexagonal-close-packed",
  Ta: "body-centered-cubic",
  W: "body-centered-cubic",
  Re: "hexagonal-close-packed",
  Os: "hexagonal-close-packed",
  Ir: "face-centered-cubic",
  Pt: "face-centered-cubic",
  Au: "face-centered-cubic",
  Hg: "rhombohedral",
  Tl: "hexagonal-close-packed",
  Pb: "face-centered-cubic",
  Bi: "rhombohedral",
  Po: "simple-cubic",
  At: "predicted",
  Rn: "atomic-solid",
  Fr: "predicted",
  Ra: "body-centered-cubic",
  Ac: "face-centered-cubic",
  Th: "face-centered-cubic",
  Pa: "tetragonal",
  U: "orthorhombic",
  Np: "orthorhombic",
  Pu: "monoclinic",
  Am: "double-hexagonal-close-packed",
  Cm: "double-hexagonal-close-packed",
  Bk: "double-hexagonal-close-packed",
  Cf: "double-hexagonal-close-packed",
  Es: "face-centered-cubic",
  Fm: "face-centered-cubic",
  Md: "face-centered-cubic",
  No: "face-centered-cubic",
  Lr: "predicted",
};

export const getCrystalStructure = (element: PeriodicElement) => {
  const key =
    crystalStructureBySymbol[element.symbol] ??
    (element.category === "noble-gas"
      ? "atomic-solid"
      : element.category === "unknown"
        ? "predicted"
        : element.category === "lanthanide"
          ? "hexagonal-close-packed"
          : element.category === "actinide"
            ? "complex-metallic"
            : element.category === "transition-metal"
              ? "hexagonal-close-packed"
              : "molecular-solid");

  return crystalStructureProfiles[key];
};
