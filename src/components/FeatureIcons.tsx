import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Torus, Box, Octahedron, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function SoftwareIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} args={[1.8, 1.8, 1.8]}>
        <MeshDistortMaterial color="#3b82f6" speed={2} distort={0.2} radius={1} />
      </Box>
    </Float>
  );
}

function WebIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Torus ref={meshRef} args={[1.2, 0.4, 16, 32]}>
        <MeshDistortMaterial color="#8b5cf6" speed={2} distort={0.3} radius={1} />
      </Torus>
    </Float>
  );
}

function ToolIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Octahedron ref={meshRef} args={[1.5]}>
        <MeshDistortMaterial color="#10b981" speed={2} distort={0.2} radius={1} />
      </Octahedron>
    </Float>
  );
}

interface SceneProps {
  type: 'software' | 'web' | 'tool';
}

export function FeatureScene({ type }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />
      {type === 'software' && <SoftwareIcon />}
      {type === 'web' && <WebIcon />}
      {type === 'tool' && <ToolIcon />}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
