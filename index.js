import { React, Suspense }  from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Model(props) {
    const { nodes, materials } = useGLTF("/29tst.glb");
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={materials.Glitter}
          position={[0, 0.22, -0.02]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.75}
        />
      </group>
  );
}

function App() {
    return (
      <span id="canvas-container">
        <Canvas>
        <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <Model />
            </Suspense>
        </Canvas>
      </span>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('playing'))