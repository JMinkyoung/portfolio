import { Physics } from "@react-three/cannon";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Quaternion, Vector3, type Object3D } from "three";

import Car from "./Car";
import { Ground } from "./Ground";

function FollowCamera({
  targetRef,
}: {
  targetRef: React.MutableRefObject<Object3D | null>;
}) {
  const { camera } = useThree();
  const worldPos = useRef(new Vector3());
  const worldQuat = useRef(new Quaternion());
  const rawForward = useRef(new Vector3(0, 0, -1));
  const smoothedForward = useRef(new Vector3(0, 0, -1));
  const smoothedRight = useRef(new Vector3(1, 0, 0));
  const rawAnchor = useRef(new Vector3());
  const prevRawAnchor = useRef(new Vector3());
  const movement = useRef(new Vector3());
  const smoothedAnchor = useRef(new Vector3());
  const desiredPos = useRef(new Vector3());
  const desiredLookAtPos = useRef(new Vector3());
  const lookAtPos = useRef(new Vector3());
  const initialized = useRef(false);

  const followDistance = 8.2;
  const sideOffset = -2.4;
  const lookAheadDistance = 5.2;
  const fixedCameraHeight = 3.2;
  const fixedLookHeight = 0.9;

  useFrame((_, delta) => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    target.getWorldPosition(worldPos.current);
    target.getWorldQuaternion(worldQuat.current);

    rawAnchor.current.set(worldPos.current.x, 0, worldPos.current.z);

    if (!initialized.current) {
      rawForward.current.set(0, 0, -1).applyQuaternion(worldQuat.current);
      rawForward.current.y = 0;
      if (rawForward.current.lengthSq() < 1e-6) {
        rawForward.current.set(0, 0, -1);
      } else {
        rawForward.current.normalize();
      }

      prevRawAnchor.current.copy(rawAnchor.current);
      smoothedAnchor.current.copy(rawAnchor.current);
      smoothedForward.current.copy(rawForward.current);
      lookAtPos.current
        .copy(rawAnchor.current)
        .addScaledVector(rawForward.current, lookAheadDistance);
      lookAtPos.current.y = fixedLookHeight;
      initialized.current = true;
    } else {
      movement.current.copy(rawAnchor.current).sub(prevRawAnchor.current);
      if (movement.current.lengthSq() > 0.00002) {
        rawForward.current.copy(movement.current).normalize();
      }
      prevRawAnchor.current.copy(rawAnchor.current);
    }

    const anchorDamping = 1 - Math.exp(-delta * 8);
    const forwardDamping = 1 - Math.exp(-delta * 7);
    const lookAtDamping = 1 - Math.exp(-delta * 8);
    smoothedAnchor.current.lerp(rawAnchor.current, anchorDamping);
    smoothedForward.current
      .lerp(rawForward.current, forwardDamping)
      .normalize();
    smoothedRight.current
      .set(smoothedForward.current.z, 0, -smoothedForward.current.x)
      .normalize();

    desiredPos.current
      .copy(smoothedAnchor.current)
      .addScaledVector(smoothedForward.current, -followDistance)
      .addScaledVector(smoothedRight.current, sideOffset);
    desiredPos.current.y = fixedCameraHeight;

    const cameraDamping = 1 - Math.exp(-delta * 8);
    camera.position.lerp(desiredPos.current, cameraDamping);

    desiredLookAtPos.current
      .copy(smoothedAnchor.current)
      .addScaledVector(smoothedForward.current, lookAheadDistance);
    desiredLookAtPos.current.y = fixedLookHeight;
    lookAtPos.current.lerp(desiredLookAtPos.current, lookAtDamping);
    camera.lookAt(lookAtPos.current);
  });

  return null;
}

export default function Scene() {
  const followTargetRef = useRef<Object3D | null>(null);

  return (
    <Canvas
      shadows
      camera={{ fov: 48, position: [7, 5, 8] }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#9ec9ff"]} />
      <hemisphereLight intensity={0.45} groundColor="#6f7a67" />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[8, 14, 8]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Physics
        gravity={[0, -9.81, 0]}
        broadphase="SAP"
        allowSleep
        iterations={12}
        tolerance={0.001}
        stepSize={1 / 120}
        maxSubSteps={12}
      >
        <Car followTargetRef={followTargetRef} />
        <Ground />
      </Physics>

      <FollowCamera targetRef={followTargetRef} />
    </Canvas>
  );
}
