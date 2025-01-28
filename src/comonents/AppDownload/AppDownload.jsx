import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='app-downlod' id='app-downlod'>
      <p>For Better Experience Download <br /> MAVY App</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
