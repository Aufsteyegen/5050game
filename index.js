import { React, useRef, useState }  from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, View, Float, Text3D, Center, Environment, Backdrop } from '@react-three/drei'
import * as THREE from 'three'
import { qmark, statsbut } from './modules/upperqbuttons.js'
import { Playbutton } from './modules/playbutton.js'

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 4}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

function App() {
    const upperqb = qmark()
    const statsbutton = statsbut()
    const scene1 = useRef(document.getElementById('how2playbutton'))
    const scene2 = useRef(document.getElementById('statsbutton'))
    const scene3 = useRef(document.getElementById('maingame'))
    const boxRef = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const scene4 = useRef()
    const ref = useRef()
    return (
    <div ref={ref}>
        <div ref={ scene4 } />
        <Canvas onCreated={(state) => state.events.connect(ref.current)} className="canvas">
            <View track={ scene1 }>
                { upperqb }
            </View>
            <View track={ scene2 }>
                { statsbutton }
            </View>
            <View track={ scene3 }>
                <ambientLight intensity={1.2} />
                <spotLight intensity={1} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            </View>
            <View track={ scene4 }>
                <Environment preset="park" />
                <ambientLight intensity={0.5} />
                <spotLight intensity={1} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Box />
            </View>
        </ Canvas>
    </ div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)