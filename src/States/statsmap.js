import React, { useState, useEffect } from "react"
import { useGLTF, Html, Float  } from "@react-three/drei"
import { HtmlUpdate } from "./statsmapdata.js"
import { useSpring } from "@react-spring/core"
import { ShuffleArray, statenames, statehood, scales } from './playlogic.js'
import { useTimer } from 'react-timer-hook'
import { a } from "@react-spring/three"
import '../App.css'
import '../index.css'

var wins = ShuffleArray(statenames)
const reset = true

function StatsMap({ expiryTimestamp }) {
  const { nodes } = useGLTF("/all.glb")
  const { seconds, start, restart, pause } = useTimer({ 
    autoStart : false,
    expiryTimestamp, 
    onExpire: () => [setShow(true), setPlaying(false), 
        statenames.forEach(key => scales[key] = reset)]})
  const [scale] = useState(scales)
  const [hovered, setHovered] = useState(false)
  const [show, setShow] = useState(true)
  const [score, setScore] = useState('—')
  const [playing, setPlaying] = useState(false)
  const smaller = useSpring({
    config: { mass: 5, tension: 1500, friction: 210, precision: 0.0001 },
    x: show ? 0.3 : 0});
  const bounce = useSpring({
    config: { mass: 3, tension: 2000, friction: 300, precision: 0.0001 },
    z: show ? -8.27 : -8.66})
  useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  useEffect(()=> {
    wins = playing ? wins : ShuffleArray(statenames)
  },[playing]) 
  function PlayButton(props) {
    const { nodes } = useGLTF("/playbutton10.glb")
    return (
        <a.mesh
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
          onPointerOver={(e) => [setHovered(true), 
            e.object.material.color.set('#cee7ff')]}
          onPointerOut={(e) => [setHovered(false), 
            e.object.material.color.set('grey')]}
          onClick={() => [setShow(false), setPlaying(true), setScore(0)]}
          position={[0, 23.5, -7]}
          scale={smaller.x}
          rotation={[0, 3 * Math.PI / 2, -Math.PI / 2]}>
          <meshStandardMaterial roughness={0.17} metalness={1} 
          color={'rgb(0, 115, 255)'}  />
        </a.mesh>)}
    return (
    <>
      <a.mesh
        position-x={0}
        position-y={15}
        position-z={bounce.z}
        onPointerOver={(e) => e.stopPropagation()}
        onPointerOut={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        castShadow>
          <boxGeometry args={[60, 60, 1]} />
          <meshStandardMaterial color="#cee7ff" 
            roughness={0.4}
            metalness={0.3}
            transparent = {true}
            opacity={0.5}
            envMapIntensity={1} />
      </a.mesh>

      <a.mesh
        onClick={seconds > 49 ? start : () => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 50.9);
          restart(time)}}>
      <Float
          speed={1} 
          rotationIntensity={0} 
          floatIntensity={3} 
          floatingRange={[-0.1, 0.1]}>
          <PlayButton />
      </ Float>
      </a.mesh>

      <mesh scale={1} position={[0, 26.4, -8.20]}>
        <boxGeometry args={[0, 0, 0]} />
        <Html center style={{pointerEvents: 'none'}}>
          <div id="status1" >{ show ? 'Ready to play?' : 'Click a state!' }</div>
          <span id="status2">Score: {score}</span>
          <div id="status3" style={{visibility : show ? 'hidden' : 'visible'}}>
            { show ? '' : score === 50 ? 'WINNER!' : 'Statehood since ' } 
            { show ? '' : statehood[wins[score]] }</div>
          <div id="timer">
            <span style={{visibility : show ? 'hidden' : 'visible'}}>
            { seconds === 0 ? "Time's up!" : seconds } 
            { seconds === 0 ? '' : ' second(s) left!' }</span>
        </div>
        </Html>
      </mesh>

    <group  
        dispose={null}
        onPointerOver={(e) => [e.stopPropagation(), 
            e.object.material.color.set('#cee7ff'), setHovered(true)]}
        onPointerOut={(e) => [e.stopPropagation(), 
            e.object.material.color.set('grey'), setHovered(false)]}
        onPointerDown={(e) => [e.stopPropagation(), e.object.position.setZ(-8)]}
        onClick={e => {if (e.object.name === wins[score]) 
          {scales[e.object.name] = false
          setScore(score + 1)} 
          else {e.object.material.color.set('red')}}}
        onPointerUp={(e) => e.object.position.setZ(-8.22)}>
        
      <mesh
        scale={scale.Alabama ? 112.1 : 1}
        name="Alabama"
        castShadow 
        receiveShadow
        geometry={nodes.Alabama.geometry}
        position={[7.43, 9.69, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}> 
        <HtmlUpdate name="AL" visible={ show ? false : true} />
        <meshStandardMaterial
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />
      </mesh>
        
      <mesh
        scale={scale.Alaska ? 112.1 : 1}
        name="Alaska"
        castShadow
        receiveShadow
        geometry={nodes.Alaska.geometry}
        position={[-11.87, 6.42, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="AK" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />
    </mesh>
      
      <mesh
        scale={scale.Arizona ? 112.1 : 1}
        name="Arizona"
        castShadow
        receiveShadow
        geometry={nodes.Arizona.geometry}
        position={[-8.88, 11.43, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="AZ" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />
      </mesh>

      <mesh
        scale={scale.Arkansas ? 112.1 : 1}
        name="Arkansas"
        castShadow
        receiveShadow
        geometry={nodes.Arkansas.geometry}
        position={[3.63, 11.14, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="AR" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />
    </mesh>
      
      <mesh
        scale={scale.California ? 112.1 : 1}
        name="California"
        castShadow
        receiveShadow
        geometry={nodes.California.geometry}
        position={[-13.32, 14.74, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="CA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />
    </mesh>
      
      <mesh
        scale={scale.Colorado ? 112.1 : 1}
        name="Colorado"
        castShadow
        receiveShadow
        geometry={nodes.Colorado.geometry}
        position={[-4.54, 14.68, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="CO" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} 
        color={'grey'} />      
    </mesh>

      <mesh
        scale={scale.Connecticut ? 112.1 : 1}
        name="Connecticut"
        castShadow
        receiveShadow
        geometry={nodes.Connecticut.geometry}
        position={[14.97, 18.16, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="CT" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
      <mesh
        scale={scale.Delaware ? 112.1 : 1}
        name="Delaware"
        castShadow
        receiveShadow
        geometry={nodes.Delaware.geometry}
        position={[13.75, 15.92, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="DE" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
    </mesh>
      
      <mesh
        scale={scale.Florida ? 112.1 : 1}
        name="Florida"
        castShadow
        receiveShadow
        geometry={nodes.Florida.geometry}
        position={[10.8, 6.75, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="FL" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
    </mesh>
      
      <mesh
        scale={scale.Georgia ? 112.1 : 1}
        name="Georgia"
        castShadow
        receiveShadow
        geometry={nodes.Georgia.geometry}
        position={[9.7, 9.83, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="GA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
    </mesh>

      <mesh
        scale={scale.Hawaii ? 112.1 : 1}
        name="Hawaii"
        castShadow
        receiveShadow
        geometry={nodes.Hawaii.geometry}
        position={[-4.95, 4.56, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="HI"visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
    
      <mesh
        scale={scale.Idaho ? 112.1 : 1}
        name="Idaho"
        castShadow
        receiveShadow
        geometry={nodes.Idaho.geometry}
        position={[-9.22, 19.7, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="ID" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>

        <mesh
        scale={scale.Illinois ? 112.1 : 1}
        name="Illinois"
        castShadow
        receiveShadow
        geometry={nodes.Illinois.geometry}
        position={[5.44, 15.36, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="IL" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
    
        <mesh
        scale={scale.Indiana ? 112.1 : 1}
        name="Indiana"
        castShadow
        receiveShadow
        geometry={nodes.Indiana.geometry}
        position={[7.21, 15.4, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="IN" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
    
        <mesh
        scale={scale.Iowa ? 112.1 : 1}
        name="Iowa"
        castShadow
        receiveShadow
        geometry={nodes.Iowa.geometry}
        position={[2.79, 16.87, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="IA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Kansas ? 112.1 : 1}
        name="Kansas"
        castShadow
        receiveShadow
        geometry={nodes.Kansas.geometry}
        position={[-0.17, 14, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="KS" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Kentucky ? 112.1 : 1}
        name="Kentucky"
        castShadow
        receiveShadow
        geometry={nodes.Kentucky.geometry}
        position={[8.01, 13.58, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="KY" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Louisiana ? 112.1 : 1}
        name="Louisiana"
        castShadow
        receiveShadow
        geometry={nodes.Louisiana.geometry}
        position={[4.05, 8.07, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="LA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Maine ? 112.1 : 1}
        name="Maine"
        castShadow
        receiveShadow
        geometry={nodes.Maine.geometry}
        position={[16.15, 21.57, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="ME" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Maryland ? 112.1 : 1}
        name="Maryland"
        castShadow
        receiveShadow
        geometry={nodes.Maryland.geometry}
        position={[13.05, 15.78, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MD" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Massachusetts ? 112.1 : 1}
        name="Massachusetts"
        castShadow
        receiveShadow
        geometry={nodes.Massachusetts.geometry}
        position={[15.41, 18.79, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Michigan ? 112.1 : 1}
        name="Michigan"
        castShadow
        receiveShadow
        geometry={nodes.Michigan.geometry}
        position={[7.02, 20.2, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MI" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Minnesota ? 112.1 : 1}
        name="Minnesota"
        castShadow
        receiveShadow
        geometry={nodes.Minnesota.geometry}
        position={[2.26, 20.22, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MN" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Mississippi ? 112.1 : 1}
        name="Mississippi"
        castShadow
        receiveShadow
        geometry={nodes.Mississippi.geometry}
        position={[5.54, 9.5, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MS" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Missouri ? 112.1 : 1}
        name="Missouri"
        castShadow
        receiveShadow
        geometry={nodes.Missouri.geometry}
        position={[3.5, 13.91, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MO" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Montana ? 112.1 : 1}
        name="Montana"
        castShadow
        receiveShadow
        geometry={nodes.Montana.geometry}
        position={[-6.12, 21.36, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="MT" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Nebraska ? 112.1 : 1}
        name="Nebraska"
        castShadow
        receiveShadow
        geometry={nodes.Nebraska.geometry}
        position={[-0.94, 16.47, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NE" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Nevada ? 112.1 : 1}
        name="Nevada"
        castShadow
        receiveShadow
        geometry={nodes.Nevada.geometry}
        position={[-11.2, 16.01, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NV" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NewHampshire ? 112.1 : 1}
        name="NewHampshire"
        castShadow
        receiveShadow
        geometry={nodes.New_Hampshire.geometry}
        position={[15.21, 19.93, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NH" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NewJersey ? 112.1 : 1}
        name="NewJersey"
        castShadow
        receiveShadow
        geometry={nodes.New_Jersey.geometry}
        position={[14.08, 16.76, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NJ" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NewMexico ? 112.1 : 1}
        name="NewMexico"
        castShadow
        receiveShadow
        geometry={nodes.New_Mexico.geometry}
        position={[-5.28, 11.05, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NM" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NewYork ? 112.1 : 1}
        name="NewYork"
        castShadow
        receiveShadow
        geometry={nodes.New_York.geometry}
        position={[13.14, 18.83, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NY" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NorthCarolina ? 112.1 : 1}
        name="NorthCarolina"
        castShadow
        receiveShadow
        geometry={nodes.North_Carolina.geometry}
        position={[12.01, 12.55, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="NC" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.NorthDakota ? 112.1 : 1}
        name="NorthDakota"
        castShadow
        receiveShadow
        geometry={nodes.North_Dakota.geometry}
        position={[-1.11, 21.19, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="ND" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Ohio ? 112.1 : 1}
        name="Ohio"
        castShadow
        receiveShadow
        geometry={nodes.Ohio.geometry}
        position={[9.27, 15.97, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="OH" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Oklahoma ? 112.1 : 1}
        name="Oklahoma"
        castShadow
        receiveShadow
        geometry={nodes.Oklahoma.geometry}
        position={[0.36, 11.65, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="OK" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Oregon ? 112.1 : 1}
        name="Oregon"
        castShadow
        receiveShadow
        geometry={nodes.Oregon.geometry}
        position={[-12.6, 20.15, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="OR" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Pennsylvania ? 112.1 : 1}
        name="Pennsylvania"
        castShadow
        receiveShadow
        geometry={nodes.Pennsylvania.geometry}
        position={[12.15, 16.93, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="PA" visible={ show ? false : true} />
        <meshStandardMaterial
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.RhodeIsland ? 112.1 : 1}
        name="RhodeIsland"
        castShadow
        receiveShadow
        geometry={nodes.Rhode_Island.geometry}
        position={[15.64, 18.37, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="RI" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.SouthCarolina ? 112.1 : 1}
        name="SouthCarolina"
        castShadow
        receiveShadow
        geometry={nodes.South_Carolina.geometry}
        position={[11.22, 11.08, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="SC" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.SouthDakota ? 112.1 : 1}
        name="SouthDakota"
        castShadow
        receiveShadow
        geometry={nodes.South_Dakota.geometry}
        position={[-1.08, 18.8, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="SD" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Tennessee ? 112.1 : 1}
        name="Tennessee"
        castShadow
        receiveShadow
        geometry={nodes.Tennessee.geometry}
        position={[7.5, 12.17, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="TN" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Texas ? 112.1 : 1}
        name="Texas"
        castShadow
        receiveShadow
        geometry={nodes.Texas.geometry}
        position={[-0.93, 8.4, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="TX" visible={ show ? false : true} />
        <meshStandardMaterial
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Utah ? 112.1 : 1}
        name="Utah"
        castShadow
        receiveShadow
        geometry={nodes.Utah.geometry}
        position={[-8.23, 15.42, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="UT" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Vermont ? 112.1 : 1}
        name="Vermont"
        castShadow
        receiveShadow
        geometry={nodes.Vermont.geometry}
        position={[14.53, 20.08, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="VT" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Virginia ? 112.1 : 1}
        name="Virginia"
        castShadow
        receiveShadow
        geometry={nodes.Virginia.geometry}
        position={[12.03, 14.16, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="VA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Washington ? 112.1 : 1}
        name="Washington"
        castShadow
        receiveShadow
        geometry={nodes.Washington.geometry}
        position={[-11.84, 22.78, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="WA" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.WestVirginia ? 112.1 : 1}
        name="WestVirginia"
        castShadow
        receiveShadow
        geometry={nodes.West_Virginia.geometry}
        position={[10.78, 14.85, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="WV" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Wisconsin ? 112.1 : 1}
        name="Wisconsin"
        castShadow
        receiveShadow
        geometry={nodes.Wisconsin.geometry}
        position={[4.73, 18.99, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="WI" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
      
        <mesh
        scale={scale.Wyoming ? 112.1 : 1}
        name="Wyoming"
        castShadow
        receiveShadow
        geometry={nodes.Wyoming.geometry}
        position={[-5.38, 18, -8.22]}
        rotation={[Math.PI / 2, 0, 0]}>
        <HtmlUpdate name="WY" visible={ show ? false : true} />
        <meshStandardMaterial 
        roughness={0.32} mirror={1} metalness={1} envMapIntensity={1} color={'grey'} />
        </mesh>
    </group>
    </>
  )
}

useGLTF.preload("/all.glb");

export { StatsMap }
