import './App.css'
import './index.css'
import { useRef, Suspense  } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Float, Center, Environment } from '@react-three/drei'
import { Statsicon, Qmarkicon, Wordmark } from './animatedbuttons.js'
import { StatsMap } from './States/statsmap.js'
import Button from '@mui/material/Button';

function App() {
  const view1 = useRef()
  const view2 = useRef()
  const view3 = useRef()
  const view4 = useRef()
  const ref = useRef()
  const how2play = useRef()
  const stats = useRef()
  function modalVisibility (props) {
    if (props.current.style.visibility === "hidden") {
      props.current.style.visibility = "visible"
    } else {
      props.current.style.visibility = "hidden";
    }
  }
  const time = new Date()
  return (
  <>
  <div ref={ref} className="container">
      <section className="header">
        <nav>
          <div className="navelements">
            <a href="../public/index.html">
            <button id="wordmark" title="5 0 5 0 game (refresh)" ref={ view3 }>
                <h1>5 0 5 0</h1></button></a>
            <Button id="statsbutton" title="Player stats" ref={ view1 } 
            onClick={() => modalVisibility(stats)}/>
            <Button id="how2playbutton" title="How to play" ref={ view2 }  
            onClick={() => modalVisibility(how2play)} />
          </div>
        </nav>
      </section>
      <section className="hero" > 
    <div className="modalcontainer">
        <span id="how2playbuttoncontent" ref = { how2play }
        style={{visibility: "hidden"}}>
              <span className="closebutton1"><button  className="closebutton2" 
              title="Close" 
              onClick={() => modalVisibility(how2play)}>X</button></span>
              <h3 className="modaltitle">How to play</h3>
              <hr id="modalline"></hr>
              <div className="modaltxtbackground">
              <div className="Inner"><b>Guess the year of statehood for 50 
                states in 50 seconds!</b></div>
              <div className="separator"></div>
              <div className="Inner">Incorrect guesses will flicker red. 
              Correct guesses will disappear into the ether.</div>
              <div className="separator"></div>
              <div className="Inner">If multiple states were admitted in a 
              given year, the order in which each was admitted will appear
              in parentheses.</div>
              <div className="separator"></div>
              <div className="Inner">For this game,
              "statehood" is either: <ol><li>the year a state ratified the 1787 
                Constitution, 
              or </li> <li>the year a state was admitted per Act of Congress.
                </li></ol> (It is not when (if) a state ratified the Articles 
                of Confederation,
              nor re-admittance to the Union after the Civil War.)</div>
              </div>
        </span>
    </div>
    <div className="modalcontainer">
        <span id="statsbuttoncontent" ref = { stats }
            style={{visibility: "hidden"}}>
              <span className="closebutton1"><button  className="closebutton2" 
              title="Close" onClick={() => modalVisibility(stats)}
              >X</button></span>
              <h3 className="modaltitle">Your stats</h3>
              <hr id="modalline"></hr>
              <div className="modaltxtbackground">
              <div className="Inner">Updates on page refresh!</div>
              <div className="Inner"><b>Total plays:</b><span>
               {JSON.parse(localStorage.getItem('plays'))}</span></div>
              <div className="separator"></div>
              <div className="Inner"><b>Total correct guesses:</b><span> 
              {JSON.parse(localStorage.getItem('guesses'))}</span>
              out of
              <span>{50 * JSON.parse(localStorage.getItem('plays'))}</span></div>
              <div className="separator"></div>
              <div className="Inner"><b>Total wins:</b>
                <span>{JSON.parse(localStorage.getItem('curwins'))}
                </span> </div>
              
              </div>
        </span>
    </div>
      </section>
      <section>
        <div id="maingame" ref={ view4 } />
      </section>  
      <section className="footer">
        <p className="subhead"> A project by:
          <a href="https://github.com/Aufsteyegen" id="githublogo1">
            <img src={require("./gith.png")} alt="Aufsteyegen's GitHub" id="githublogo2" title="My Github" />
          </a> 
        </p>
      </section>
    </div>
    <div>
      <Canvas shadows className="canvas" eventSource={ref} >
      <Suspense fallback={null}>
          <View track= { view1 } >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Center position={[0, 0, 0]}>
            <Float
                speed={3} 
                rotationIntensity={1} 
                floatIntensity={0.4} 
                floatingRange={[0, 0]}>
              <Statsicon />
            </ Float>
            </ Center>
        </View>
        <View track= { view2 } >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Center position={[0, 0, 0]}>
            <Float
                speed={3} 
                rotationIntensity={0.5} 
                floatIntensity={0.4} 
                floatingRange={[-1.7, 1.3]}>
              <Qmarkicon />
            </ Float>
            </ Center>
        </View>
        <View track= { view3 } >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Center position={[0, 0, 0]}>
            <Float
                speed={3} 
                rotationIntensity={0.1} 
                floatIntensity={0.1} 
                floatingRange={[-1.7, 1.3]}>
              <Wordmark />
            </ Float>
            </ Center>
        </View>
        <View track= { view4 } >
          <ambientLight intensity={0.2} />
          <spotLight position={[-2, 36, 39]} intensity={0.025} penumbra={1} 
          angle={0.3} color="rgb(43, 255, 0)" />
          <fog attach="fog" args={['#cee7ff',5, 35]} />
          <Environment preset='park' />
          <Center position={[0, 0, -12]}>
            <StatsMap expiryTimestamp={time} />
          </Center>
        </View>
        </Suspense>
      </Canvas>
      </div>
      </>
  )
}

export default App
