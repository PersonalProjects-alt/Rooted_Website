import { useState } from 'react'
import './Homepage.css'
import "@fontsource-variable/montserrat"; // Defaults to wght axis
import "@fontsource-variable/montserrat/wght.css"; // Specify axis
import "@fontsource-variable/montserrat/wght-italic.css"; // Specify axis and style
import Header from '../../ui/header.jsx'
import backgroundImage from '../../assets/HomepageImg1.png'

function App() {
  return (
    <div> 
      <Header />
      <div className='section1'>

      </div>
    </div>
  )
}

export default App
