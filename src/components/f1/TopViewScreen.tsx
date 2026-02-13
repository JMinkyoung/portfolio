import { motion, type MotionValue } from "framer-motion";

import topTrackStraightBg from "../../assets/top-track-straight.png";
import carTopSprite from "../../assets/car-top.png";
import type { Mode, SectionSpec } from "./types";

type Props = {
  mode: Mode;
  topLayerBackgroundPosition: MotionValue<string>;
  carX: MotionValue<number>;
  carWiggleY: MotionValue<number>;
  activeSection: SectionSpec;
  cardOpacity: MotionValue<number>;
  cardScale: MotionValue<number>;
  cardY: MotionValue<number>;
};

export function TopViewScreen({
  mode,
  topLayerBackgroundPosition,
  carX,
  carWiggleY,
  activeSection,
  cardOpacity,
  cardScale,
  cardY,
}: Props) {
  return (
    <>
      <motion.div
        className="f1-layer f1-layer-top"
        style={{
          backgroundImage: `radial-gradient(1200px 640px at 50% 35%, rgba(255,255,255,0.08), transparent 62%), url(${topTrackStraightBg})`,
          backgroundPosition: topLayerBackgroundPosition,
        }}
        initial="fpv"
        animate={mode}
        variants={{
          fpv: { opacity: 0, scale: 1.12, filter: "blur(8px)" },
          transition: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
          },
          top: { opacity: 1, scale: 1, filter: "blur(0px)" },
        }}
      />

      <div className="f1-car-top-anchor">
        <motion.div className="f1-car-top-shift" style={{ x: carX, y: carWiggleY }}>
          <motion.img
            src={carTopSprite}
            alt="F1 car top"
            className="f1-car-top"
            initial="fpv"
            animate={mode}
            variants={{
              fpv: { opacity: 0, scale: 0.9 },
              transition: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.52, delay: 0.1, ease: "easeOut" },
              },
              top: { opacity: 1, scale: 1 },
            }}
          />
        </motion.div>
      </div>

      {mode === "top" && (
        <div className="f1-cards-layer">
          <motion.article className="f1-pit-card" style={{ opacity: cardOpacity, scale: cardScale, y: cardY }}>
            <p className="f1-pit-card-subtitle">{activeSection.subtitle}</p>
            <h2 className="f1-pit-card-title">{activeSection.title}</h2>
            <ul className="f1-pit-card-list">
              {activeSection.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      )}
    </>
  );
}
