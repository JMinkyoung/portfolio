import type { DebugState } from "./types";

type Props = {
  debug: DebugState;
};

export function DebugPanel({ debug }: Props) {
  return (
    <div className="f1-debug-panel">
      <div>mode: {debug.mode}</div>
      <div>scrollTop: {debug.scrollTop}px</div>
      <div>maxScroll: {debug.maxScroll}px</div>
      <div>progress: {debug.progress}</div>
      <div>cycle: {debug.cycleIndex}</div>
      <div>phase: {debug.phase}</div>
      <div>carX: {debug.carX}px</div>
    </div>
  );
}
