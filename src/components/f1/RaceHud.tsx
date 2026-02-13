import type { Mode } from "./types";

type Props = {
  mode: Mode;
  onStart: () => void;
};

export function RaceHud({ mode, onStart }: Props) {
  return (
    <div className="f1-ui">
      {mode === "fpv" ? (
        <button className="f1-start-button" onClick={onStart}>
          START
        </button>
      ) : (
        <p className="f1-scroll-hint">Scroll: Skills → Experience → Projects → Contact</p>
      )}
    </div>
  );
}
