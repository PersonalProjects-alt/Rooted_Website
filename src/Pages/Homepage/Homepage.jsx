import { useState } from 'react'
import './Homepage.css'
import "@fontsource-variable/montserrat"; // Defaults to wght axis
import "@fontsource-variable/montserrat/wght.css"; // Specify axis
import "@fontsource-variable/montserrat/wght-italic.css"; // Specify axis and style
import Header from '../../ui/header.jsx'


function App() {
  return (
    <div> 
      <Header />
    </div>
  )
}

export default App
