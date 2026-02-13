import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import "./App.css";

import { DebugPanel } from "./components/f1/DebugPanel";
import { FpvScreen } from "./components/f1/FpvScreen";
import { RaceHud } from "./components/f1/RaceHud";
import { TopViewScreen } from "./components/f1/TopViewScreen";
import type { DebugState, Mode, SectionSpec } from "./components/f1/types";

const TRANSITION_MS = 900;
const CYCLE_HEIGHT = 980;

const PHASE_EXIT_END = 0.3;
const PHASE_CARD_END = 0.7;
const CAR_LEFT_OUT_X = -3200;
const CAR_RIGHT_START_X = 2200;

const sections: SectionSpec[] = [
  {
    id: "skills",
    title: "Skills",
    subtitle: "Pit Board // Tire Setup",
    points: ["React", "TypeScript", "Flutter", "Framer Motion"],
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "Pit Board // Race Stints",
    points: [
      "Frontend Feature Delivery",
      "Design System Collaboration",
      "Performance Tuning",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Pit Board // Fast Laps",
    points: [
      "Interactive Portfolio",
      "Production Web Apps",
      "Motion-heavy Landing Pages",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Pit Board // Final Lap",
    points: ["Email", "GitHub", "LinkedIn"],
  },
];

const MAX_VIRTUAL_SCROLL = sections.length * CYCLE_HEIGHT + 220;

type CycleState = {
  cycleIndex: number;
  phase: "exit-left" | "card-only" | "enter-right";
  carX: number;
  cardOpacity: number;
  cardScale: number;
  cardY: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const getCycleState = (scrollTop: number, sectionCount: number): CycleState => {
  const maxIndex = Math.max(0, sectionCount - 1);
  const cycleIndex = clamp(Math.floor(scrollTop / CYCLE_HEIGHT), 0, maxIndex);
  const cycleStart = cycleIndex * CYCLE_HEIGHT;
  const localProgress = clamp((scrollTop - cycleStart) / CYCLE_HEIGHT, 0, 1);

  if (localProgress <= PHASE_EXIT_END) {
    const t = localProgress / PHASE_EXIT_END;
    return {
      cycleIndex,
      phase: "exit-left",
      carX: lerp(0, CAR_LEFT_OUT_X, t),
      cardOpacity: 0,
      cardScale: 1,
      cardY: 0,
    };
  }

  if (localProgress <= PHASE_CARD_END) {
    return {
      cycleIndex,
      phase: "card-only",
      carX: CAR_LEFT_OUT_X,
      cardOpacity: 1,
      cardScale: 1,
      cardY: 0,
    };
  }

  const t = (localProgress - PHASE_CARD_END) / (1 - PHASE_CARD_END);
  return {
    cycleIndex,
    phase: "enter-right",
    carX: lerp(CAR_RIGHT_START_X, 0, t),
    cardOpacity: 1,
    cardScale: 1,
    cardY: 0,
  };
};

export default function App() {
  const [mode, setMode] = useState<Mode>("fpv");
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [debug, setDebug] = useState<DebugState>({
    mode: "fpv",
    scrollTop: 0,
    maxScroll: MAX_VIRTUAL_SCROLL,
    progress: 0,
    carX: 0,
    cycleIndex: 0,
    phase: "exit-left",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const virtualScrollRef = useRef(0);
  const transitionTimerRef = useRef<number | null>(null);

  const scrollYProgress = useMotionValue(0);

  const carX = useMotionValue(0);
  const cardOpacity = useMotionValue(0);
  const cardScale = useMotionValue(1);
  const cardY = useMotionValue(0);

  const topLayerBackgroundPosition = useMotionTemplate`center center, 50% 50%`;
  const carWiggleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2.5, -2]);

  const syncFromVirtual = useCallback(
    (nextTop: number) => {
      const clampedTop = clamp(nextTop, 0, MAX_VIRTUAL_SCROLL);
      const nextProgress = MAX_VIRTUAL_SCROLL > 0 ? clampedTop / MAX_VIRTUAL_SCROLL : 0;
      const cycle = getCycleState(clampedTop, sections.length);

      scrollYProgress.set(nextProgress);

      carX.set(cycle.carX);
      cardOpacity.set(cycle.cardOpacity);
      cardScale.set(cycle.cardScale);
      cardY.set(cycle.cardY);

      setActiveSectionIndex((prev) => (prev === cycle.cycleIndex ? prev : cycle.cycleIndex));
      setDebug({
        mode,
        scrollTop: Math.round(clampedTop),
        maxScroll: MAX_VIRTUAL_SCROLL,
        progress: Number(nextProgress.toFixed(4)),
        carX: Number(cycle.carX.toFixed(1)),
        cycleIndex: cycle.cycleIndex,
        phase: cycle.phase,
      });
    },
    [mode, scrollYProgress, carX, cardOpacity, cardScale, cardY],
  );

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    setDebug((prev) => ({ ...prev, mode }));
  }, [mode]);

  useEffect(() => {
    if (mode !== "top") {
      return;
    }

    virtualScrollRef.current = 0;
    syncFromVirtual(0);
  }, [mode, syncFromVirtual]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    if (mode !== "fpv") {
      return;
    }

    setMode("transition");

    transitionTimerRef.current = window.setTimeout(() => {
      setMode("top");
    }, TRANSITION_MS);
  };

  const handleTopWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (mode !== "top") {
      return;
    }

    const next = virtualScrollRef.current + event.deltaY;
    virtualScrollRef.current = clamp(next, 0, MAX_VIRTUAL_SCROLL);
    syncFromVirtual(virtualScrollRef.current);
  };

  return (
    <div className="f1-app">
      <div
        ref={scrollRef}
        className={`f1-scroll-shell ${mode === "top" ? "is-scrollable" : "is-locked"}`}
        onWheel={handleTopWheel}
      >
        <div className="f1-scroll-content" style={{ height: "100vh" }}>
          <FpvScreen mode={mode} />

          <TopViewScreen
            mode={mode}
            topLayerBackgroundPosition={topLayerBackgroundPosition}
            carX={carX}
            carWiggleY={carWiggleY}
            activeSection={sections[activeSectionIndex]}
            cardOpacity={cardOpacity}
            cardScale={cardScale}
            cardY={cardY}
          />

          <motion.div
            className="f1-layer f1-layer-flash"
            initial={{ opacity: 0 }}
            animate={
              mode === "transition"
                ? {
                    opacity: [0, 0.82, 0],
                    transition: { duration: 0.17, times: [0, 0.45, 1] },
                  }
                : { opacity: 0 }
            }
          />

          <RaceHud mode={mode} onStart={handleStart} />
          <DebugPanel debug={debug} />
        </div>
      </div>
    </div>
  );
}
