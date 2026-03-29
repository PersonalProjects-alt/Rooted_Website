import React from 'react'
import { OrbitProgress } from 'react-loading-indicators'
import './loadingComponent.css'

function LoadingComponent() {
  return (
    <div className='loadingDic'>
        <OrbitProgress variant="disc" color="#b4b4b4" size="medium" text="" textColor="" />
        <p className='loadingText'>Loading Content</p>
    </div>
  )
}

export default LoadingComponent 