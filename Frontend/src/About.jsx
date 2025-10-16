import React from 'react'
import { Link } from 'react-router-dom'
import aboutImg from "./assets/about_wrapper.jpg"
import KachaBazar from './components/kachaBazar/KachaBazar'
import AboutCom from './components/AboutCom/AboutCom'
import OurTeam from './components/OurTeam/OurTeam'

const About = () => {
  return (
    <>
      <div className='about_wrapper' style={{
        backgroundImage: `url(${aboutImg})`, // ✅ fixed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className='container'>
          <div className='text-center'>
            <h1>About Us</h1>
          </div>
        </div>
      </div>
      <AboutCom/>
      <OurTeam/>
      <KachaBazar />

    </>
  )
}

export default About
