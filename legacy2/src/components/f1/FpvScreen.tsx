import { motion } from "framer-motion";

import fpvStartBg from "../../assets/fpv-start.png";
import carRearSprite from "../../assets/car-rear.png";
import type { Mode } from "./types";

type Props = {
  mode: Mode;
};

export function FpvScreen({ mode }: Props) {
  return (
    <>
      <motion.div
        className="f1-layer f1-layer-fpv"
        style={{ backgroundImage: `url(${fpvStartBg})` }}
        initial="fpv"
        animate={mode}
        variants={{
          fpv: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
          transition: {
            opacity: 0,
            scale: 0.72,
            y: 120,
            filter: "blur(6px)",
            transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
          },
          top: { opacity: 0, scale: 0.72, y: 120, filter: "blur(6px)" },
        }}
      />

      <motion.img
        src={carRearSprite}
        alt="F1 car rear"
        className="f1-car-rear"
        initial="fpv"
        animate={mode}
        variants={{
          fpv: { opacity: 1, scale: 1, y: 0 },
          transition: {
            opacity: 0,
            scale: 0.75,
            y: 30,
            transition: { duration: 0.45, ease: "easeInOut" },
          },
          top: { opacity: 0, scale: 0.75, y: 30 },
        }}
      />
    </>
  );
}
