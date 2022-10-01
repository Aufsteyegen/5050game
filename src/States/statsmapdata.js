import React from "react"
import '../App.css'
import '../index.css'
import { Html } from "@react-three/drei"

//Drei HTML; attatches state abbreviations to state mesh
function HtmlUpdate (props) {
    return (
    <Html distanceFactor={35} className="mapbutton_background" center 
    style={{visibility : props.visible ? 'visible' : 'hidden',
    pointerEvents : 'none' }}>
        <span className="tooltip">
        <div>
            <div className="mapbutton"> {props.name} <br />  </div>
        </div>
          
        </span>
    </Html>
    )
}

export { HtmlUpdate }

