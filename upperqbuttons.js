import { React, Suspense }  from 'react'
import { Float, Text3D, Center, Environment, MeshWobbleMaterial } from '@react-three/drei'


function qmark() {
    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={1} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Float
                speed={3} 
                rotationIntensity={0.5} 
                floatIntensity={0.4} 
                floatingRange={[-1.5, 1.5]} 
                >
                <Center position={[0, 0, 0]}>   
                    <Text3D 
                    font={'/plexmonbold.json'} 
                    size={5}
                    height={1}>
                    {`?`}
                    <meshStandardMaterial
                    color="#0073ff"
                    roughness="0.1"
                    metalness="0.6"
                    />
                    </ Text3D>
                    </Center> 
            </Float>
            <Environment preset="park" />
        </Suspense>
    )
}

function statsbut() {
    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={1} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Float
                speed={3} 
                rotationIntensity={0.5} 
                floatIntensity={0} 
                floatingRange={[-1.5, 1.5]} 
                >
                <Center position={[0, 0, 0]}>   
                    <Text3D 
                    font={'/plexmonbold.json'} 
                    size={5}
                    height={1}>
                    {`i`}
                    <meshStandardMaterial
                    color="#0073ff"
                    roughness="0.1"
                    metalness="0.6"
                    />
                    </ Text3D>
                    </Center> 
            </Float>
            <Environment preset="park" />
        </Suspense>
    )
}

export { qmark, statsbut }