import {
  useCompoundBody,
  useCylinder,
  useRaycastVehicle,
  type Triplet,
} from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Object3D } from "three";

import F1CarModel from "./components/F1CarModel";

type CarProps = {
  followTargetRef?: React.MutableRefObject<Object3D | null>;
};

type Controls = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  Space: boolean;
};

const initialControls: Controls = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};

export default function Car({ followTargetRef }: CarProps) {
  const width = 0.9;
  const height = 0.35;
  const front = 1.2;
  const wheelRadius = 0.32;

  const controlsRef = useRef<Controls>(initialControls);
  const linearSpeedRef = useRef(0);
  const yawSpeedRef = useRef(0);
  const angularVelocityRef = useRef<Triplet>([0, 0, 0]);

  const wheelFL = useRef<Object3D>(null);
  const wheelFR = useRef<Object3D>(null);
  const wheelRL = useRef<Object3D>(null);
  const wheelRR = useRef<Object3D>(null);
  const vehicleRef = useRef<Group>(null);

  const wheelBodyConfig = () => ({
    args: [wheelRadius, wheelRadius, 0.18, 16] as [number, number, number, number],
    mass: 1,
    type: "Kinematic" as const,
    collisionFilterGroup: 0,
    rotation: [0, 0, -Math.PI / 2] as Triplet,
  });

  useCylinder(wheelBodyConfig, wheelFL);
  useCylinder(wheelBodyConfig, wheelFR);
  useCylinder(wheelBodyConfig, wheelRL);
  useCylinder(wheelBodyConfig, wheelRR);

  const chassisShape = [width, height, front * 2] as Triplet;
  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      mass: 240,
      // Start near resting suspension height so the car does not "drop from sky" on load.
      position: [0, 0.52, 0],
      rotation: [0, 0, 0],
      linearDamping: 0.48,
      angularDamping: 0.86,
      shapes: [
        { type: "Box", args: chassisShape, position: [0, 0, 0] },
        {
          type: "Box",
          args: [width * 0.85, height * 0.7, front * 0.6] as Triplet,
          position: [0, height * 0.8, 0],
        },
      ],
    }),
    useRef<Object3D>(null),
  );

  const wheelInfo = {
    radius: wheelRadius,
    directionLocal: [0, -1, 0] as Triplet,
    axleLocal: [1, 0, 0] as Triplet,
    suspensionStiffness: 22,
    suspensionRestLength: 0.14,
    frictionSlip: 2.8,
    dampingRelaxation: 3.1,
    dampingCompression: 4.6,
    maxSuspensionForce: 24000,
    maxSuspensionTravel: 0.22,
    rollInfluence: 0.06,
    customSlidingRotationalSpeed: -20,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.9, -height * 0.22, front] as Triplet,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.9, -height * 0.22, front] as Triplet,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.9, -height * 0.22, -front] as Triplet,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.9, -height * 0.22, -front] as Triplet,
    },
  ];

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheels: [wheelFL, wheelFR, wheelRL, wheelRR],
      wheelInfos,
    }),
    vehicleRef,
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key in initialControls) {
        controlsRef.current = {
          ...controlsRef.current,
          [event.key]: true,
        };
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key in initialControls) {
        controlsRef.current = {
          ...controlsRef.current,
          [event.key]: false,
        };
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const unsubscribeVelocity = chassisApi.velocity.subscribe((velocity) => {
      linearSpeedRef.current = Math.hypot(velocity[0], velocity[2]);
    });
    const unsubscribeAngular = chassisApi.angularVelocity.subscribe((angularVelocity) => {
      angularVelocityRef.current = angularVelocity;
      yawSpeedRef.current = Math.abs(angularVelocity[1]);
    });

    return () => {
      unsubscribeVelocity();
      unsubscribeAngular();
    };
  }, [chassisApi.angularVelocity, chassisApi.velocity]);

  useFrame(() => {
    if (followTargetRef) {
      followTargetRef.current = chassisBody.current as Object3D | null;
    }

    const controls = controlsRef.current;

    let engine = 0;
    if (controls.ArrowUp) {
      engine = 1200;
    } else if (controls.ArrowDown) {
      engine = -850;
    }

    vehicleApi.applyEngineForce(engine, 2);
    vehicleApi.applyEngineForce(engine, 3);

    const steer = controls.ArrowLeft ? -0.35 : controls.ArrowRight ? 0.35 : 0;
    vehicleApi.setSteeringValue(steer, 0);
    vehicleApi.setSteeringValue(steer, 1);
    vehicleApi.setSteeringValue(0, 2);
    vehicleApi.setSteeringValue(0, 3);

    const isIdle = !controls.ArrowUp && !controls.ArrowDown && !controls.ArrowLeft && !controls.ArrowRight;
    const idleBrake = isIdle
      ? Math.min(4.2, Math.max(0.9, linearSpeedRef.current * 2.8))
      : 0;
    const brake = controls.Space ? 15 : idleBrake;
    vehicleApi.setBrake(brake, 0);
    vehicleApi.setBrake(brake, 1);
    vehicleApi.setBrake(brake, 2);
    vehicleApi.setBrake(brake, 3);

    // Extra angular damping at very low speed to suppress idle spin drift from contact jitter.
    if (isIdle && linearSpeedRef.current < 0.25) {
      const [ax, , az] = angularVelocityRef.current;
      // Keep yaw fully clamped while idle; this removes residual slow spin on stop.
      chassisApi.angularVelocity.set(ax * 0.15, 0, az * 0.15);
    }

    // Snap to full stop only when almost stopped, to avoid endless micro-drift.
    if (isIdle && linearSpeedRef.current < 0.12) {
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.velocity.set(0, 0, 0);
    }
  });

  return (
    <group ref={vehicle}>
      <group ref={chassisBody as React.RefObject<Object3D>}>
        <F1CarModel
          rotation={[0, -Math.PI / 2, 0]}
          position={[0, -0.34, 0]}
          targetLength={front * 2.2}
          groundOffset={0}
        />
      </group>

      <group ref={wheelFL as React.RefObject<Group>} visible={false} />
      <group ref={wheelFR as React.RefObject<Group>} visible={false} />
      <group ref={wheelRL as React.RefObject<Group>} visible={false} />
      <group ref={wheelRR as React.RefObject<Group>} visible={false} />
    </group>
  );
}
