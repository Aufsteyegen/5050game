import React, { useState, useEffect } from "react"
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
          <div className="mapbutton">{props.name}<br /></div>
        </div>
        </span>
    </Html>
    )
}

//Helper adapted from: 
//https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue
    })
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
  }

export { HtmlUpdate, useStickyState }

