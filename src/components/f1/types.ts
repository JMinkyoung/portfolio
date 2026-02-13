export type Mode = "fpv" | "transition" | "top";

export type SectionSpec = {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
};

export type DebugState = {
  mode: Mode;
  scrollTop: number;
  maxScroll: number;
  progress: number;
  carX: number;
  cycleIndex: number;
  phase: string;
};
