import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

const Model: React.FC = () => {
  const gltf = useGLTF('/path-to-your-3d-model.gltf');
  return <primitive object={gltf.scene} scale={0.5} />;
};

const ThreeDScene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDScene;
