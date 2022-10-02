import { React, useRef, useState}  from 'react'
import { Text3D, Environment, Center, useGLTF } from '@react-three/drei'
import { useSpring } from "@react-spring/core"
import { a } from "@react-spring/three"

function ButtonBox() {
    return (
    <mesh>
        <boxGeometry args={[9, 9, 9]} />
        <meshStandardMaterial 
        opacity={0} transparent= {true} />
    </mesh>
    )
}

function Statsicon(props) {
    const { nodes } = useGLTF("/statsiconfinal5.glb")
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [active, setActive] = useState(0)
    const { spring } = useSpring({
        spring: active,
        config: { mass: 1, tension: 500, friction: 30, precision: 0.0001 }
    })
    const scale = spring.to([0, 1], [0.3, 0.4])
    return (
        <a.mesh
        scale-x={scale} 
        scale-z={scale}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
        {...props}
        ref={ref}
        onPointerDown={() => [setActive(Number(!active)), click(true)]}
        onPointerUp={() => [setActive(Number(!active)), click(false)]}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.40, 0, 0]}>
        <ButtonBox />
        <meshStandardMaterial
            color={clicked ? "#25e000" : hovered ? "red" : "#0073ff"}
            roughness={0.1}
            metalness={0.6} />
        <Environment preset="park" />
    </a.mesh>
    )
}

function Qmarkicon(props) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [active, setActive] = useState(0)
    const { spring } = useSpring({
        spring: active,
        config: { mass: 4, tension: 400, friction: 30, precision: 0.0001 }
    })
    const rotation = spring.to([0, 1], [0, 2 * Math.PI])
    return (
        <a.mesh
            {...props}
            rotation-y={rotation}
            ref={ref}
            scale={0.8}
            onPointerDown={() => [setActive(Number(!active)), click(true)]}
            onPointerUp={() => [setActive(Number(!active)), click(false)]}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[8, 8, 8]} />
            <meshStandardMaterial 
            opacity={0} transparent= {true} />
            <Center position={[0, 0, 0]}>
            <Text3D
                font={'/plexmonbold.json'} 
                size={5}
                height={1}>
                {`?`}
                <meshStandardMaterial 
                color={clicked ? "#25e000" : hovered ? "red" : "#0073ff"}
                roughness={0.1}
                metalness={0.6} />
            </ Text3D>
            </Center>
            <Environment preset="park" />
        </a.mesh>
    )
}

function Wordmark(props) {
    const ref = useRef()
    return (
        <a.mesh
            {...props}
            ref={ref}
            scale={0.8}>
            <boxGeometry args={[8, 8, 8]} />
            <meshStandardMaterial 
            opacity={0} transparent= {true} />
            <Center position={[-3, 0, 0]}>
            <Text3D
                font={'/plexmonbold.json'} 
                size={4}
                height={0.35}>
                {`5 0 5 0`}
                <meshStandardMaterial 
                color={"#0073ff"}
                roughness={0.1}
                metalness={0.6} />
            </ Text3D>
            </Center>
            <Environment preset="park" />
        </a.mesh>
    )
}

export { Statsicon, Qmarkicon, Wordmark }