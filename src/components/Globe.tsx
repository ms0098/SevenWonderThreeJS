import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { wonders, type Wonder } from "@/data/wonders";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

interface EarthProps {
  selectedWonder: Wonder | null;
  isTransitioning: boolean;
  onSelectWonder: (wonder: Wonder) => void;
}

function Earth({ selectedWonder, isTransitioning, onSelectWonder }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rotationSpeed = useRef(0.002);
  const transitionPhase = useRef<"idle" | "spinning" | "settling">("idle");
  const spinAccum = useRef(0);

  // Track previous wonder to detect changes
  const prevWonder = useRef<Wonder | null>(null);

  const [earthTexture, bumpTexture] = useLoader(THREE.TextureLoader, [
    "https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png",
  ]);

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    // Detect wonder selection change
    if (selectedWonder && !prevWonder.current) {
      transitionPhase.current = "spinning";
      spinAccum.current = 0;
    }
    if (!selectedWonder && prevWonder.current) {
      transitionPhase.current = "idle";
    }
    prevWonder.current = selectedWonder;

    // Target position: move LEFT when wonder selected (after spinning), center otherwise
    const targetX = selectedWonder ? -2.2 : 0;
    const targetPos = new THREE.Vector3(targetX, 0, 0);
    
    // Smooth lerp for position — always running, no jumps
    groupRef.current.position.lerp(targetPos, 0.035);

    // Rotation logic
    if (transitionPhase.current === "spinning") {
      // Accelerate rotation smoothly from current speed
      rotationSpeed.current = Math.min(rotationSpeed.current + delta * 0.08, 0.12);
      meshRef.current.rotation.y += rotationSpeed.current;
      spinAccum.current += delta;

      // After ~1.5s of spinning, start settling
      if (spinAccum.current > 1.2) {
        transitionPhase.current = "settling";
      }
    } else if (transitionPhase.current === "settling" && selectedWonder) {
      // Decelerate and settle to show the wonder's longitude
      rotationSpeed.current *= 0.94;
      meshRef.current.rotation.y += rotationSpeed.current;

      // When slow enough, gently rotate to target
      if (rotationSpeed.current < 0.005) {
        rotationSpeed.current = 0;
        const targetLng = -selectedWonder.lng * (Math.PI / 180) - Math.PI / 2;
        // Normalize angles for shortest path
        const current = meshRef.current.rotation.y % (Math.PI * 2);
        let diff = targetLng - current;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        meshRef.current.rotation.y += diff * 0.04;
      }
    } else {
      // Idle: gentle continuous rotation
      const targetSpeed = 0.002;
      rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 0.02;
      meshRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial color="#1a4a7a" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.08, 64, 64]}>
        <meshBasicMaterial color="#3a8adf" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      <mesh ref={meshRef} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} bumpMap={bumpTexture} bumpScale={0.05} roughness={0.7} metalness={0.1} />

        {/* Wonder markers — only when idle */}
        {!selectedWonder &&
          wonders.map((wonder) => {
            const pos = latLngToVector3(wonder.lat, wonder.lng, 2.05);
            return (
              <group key={wonder.id} position={pos}>
                <Html
                  distanceFactor={6}
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                  center
                >
                  <button
                    onClick={() => onSelectWonder(wonder)}
                    className="group flex flex-col items-center gap-1"
                  >
                    <div className="wonder-marker h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(38_80%_55%/0.6)]" />
                    <span className="whitespace-nowrap rounded-sm bg-background/80 px-2 py-0.5 font-body text-[10px] font-medium text-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      {wonder.name}
                    </span>
                  </button>
                </Html>
              </group>
            );
          })}
      </mesh>
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y += 0.0001;
  });

  return (
    <points ref={starsRef} geometry={geo}>
      <pointsMaterial size={0.05} color="#8899bb" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function CameraController({ selectedWonder }: { selectedWonder: Wonder | null }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Subtle camera shift when wonder is selected
    const targetCam = selectedWonder
      ? new THREE.Vector3(0, 0.3, 5)
      : new THREE.Vector3(0, 0.5, 5.5);
    camera.position.lerp(targetCam, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface GlobeProps {
  selectedWonder: Wonder | null;
  isTransitioning: boolean;
  onSelectWonder: (wonder: Wonder) => void;
}

export default function Globe({ selectedWonder, isTransitioning, onSelectWonder }: GlobeProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#060a12"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#c4a35a" />
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#3a6aaf" />
      <Stars />
      <Earth
        selectedWonder={selectedWonder}
        isTransitioning={isTransitioning}
        onSelectWonder={onSelectWonder}
      />
      <CameraController selectedWonder={selectedWonder} />
    </Canvas>
  );
}
