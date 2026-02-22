import { usePlane } from "@react-three/cannon";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";

function createTrackTexture(size = 2048) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  const grassGradient = ctx.createLinearGradient(0, 0, 0, size);
  grassGradient.addColorStop(0, "#4f7d3b");
  grassGradient.addColorStop(0.55, "#5e8f45");
  grassGradient.addColorStop(1, "#4b7337");
  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, 0, size, size);

  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#89b969";
  for (let y = 0; y < size; y += 46) {
    ctx.fillRect(0, y, size, 24);
  }
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.moveTo(410, 380);
  ctx.bezierCurveTo(850, 220, 1480, 260, 1640, 550);
  ctx.bezierCurveTo(1790, 820, 1540, 1490, 1110, 1570);
  ctx.bezierCurveTo(770, 1630, 410, 1500, 320, 1210);
  ctx.bezierCurveTo(240, 960, 260, 540, 410, 380);
  ctx.closePath();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "#beb197";
  ctx.lineWidth = 320;
  ctx.stroke();

  ctx.strokeStyle = "#c6322b";
  ctx.lineWidth = 286;
  ctx.setLineDash([44, 44]);
  ctx.lineDashOffset = 0;
  ctx.stroke();

  ctx.strokeStyle = "#f5f5f3";
  ctx.lineDashOffset = -44;
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.strokeStyle = "#2a2c30";
  ctx.lineWidth = 240;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 18]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#303238";
  ctx.fillRect(550, 170, 920, 82);
  ctx.strokeStyle = "#f2f2f2";
  ctx.lineWidth = 2;
  ctx.strokeRect(550, 170, 920, 82);

  const startX = 945;
  const startY = 260;
  const cols = 2;
  const rows = 10;
  const cellW = 12;
  const cellH = 12;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const isDark = (r + c) % 2 === 0;
      ctx.fillStyle = isDark ? "#171717" : "#f2f2f2";
      ctx.fillRect(startX + c * cellW, startY + r * cellH, cellW, cellH);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function Ground(props: ThreeElements["mesh"]) {
  const trackTexture = useMemo(() => createTrackTexture(), []);

  const [groundRef] = usePlane(
    () => ({
      args: [220, 220],
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 0, 0],
    }),
    undefined,
  );

  useEffect(() => {
    return () => {
      trackTexture.dispose();
    };
  }, [trackTexture]);

  return (
    <mesh ref={groundRef} receiveShadow {...props}>
      <planeGeometry args={[220, 220]} />
      <meshStandardMaterial map={trackTexture} roughness={0.92} metalness={0.03} />
    </mesh>
  );
}
