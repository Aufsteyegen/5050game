import React, { useRef, useState, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

function Playbutton(props) {
  const { nodes, materials } = useGLTF("/playbutton3.glb")
  const ref = useRef()
  const [hovered, hover] = useState(false)
  return (
      <mesh
        {...props}
        ref={ref}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, Math.PI / 6, 0]}
        material-color={hovered ? 'red' : 'white'}
        material-roughness="0.1"
        material-metalness="0.6">
        </mesh>
  );
}

export { Playbutton }
