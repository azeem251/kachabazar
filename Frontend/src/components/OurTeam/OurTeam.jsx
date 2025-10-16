import React from 'react'
import teamone from "../../assets/team_1.webp"
import teamtwo from "../../assets/team_2.webp"
import teamthree from "../../assets/team_3.webp"
import teamfour from "../../assets/team_4.webp"
import teamfive from "../../assets/team_5.webp"
import teamsix from "../../assets/team_6.webp"
const OurTeam = () => {
  return (
    <div className='our_tema_wrapper py-5 bg-slate-100'>
      <div className='container'>
        <div>
            <h3 className='mb-2'>Our Team</h3>
            <p>We’re impartial and independent, and every day we create distinctive, world-class </p>
            <p>reintermediate backend supply programmes.</p>
        </div>
        <div className='row gy-4 mt-3'>
            <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamone} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Niamh Shea</strong>
                        <p>Co-founder & Executive</p>
                    </div>
                </div>
            </div>
             <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamtwo} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Orla Dwyer</strong>
                        <p>Orla Dwyer</p>
                    </div>
                </div>
            </div>
             <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamthree} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Danien James</strong>
                        <p>Co-founder, Chairman</p>
                    </div>
                </div>
            </div>
             <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamfour} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Dara Frazier</strong>
                        <p>Chief Strategy Officer</p>
                    </div>
                </div>
            </div>
             <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamfive} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Glenda Arvidson</strong>
                        <p>HR Officer</p>
                    </div>
                </div>
            </div>
             <div className='col-lg-2 col-md-6 col-sm-6'>
                <div>
                    <img src={teamsix} className='img-fluid rounded-xl' alt="" />
                    <div className='mt-3'>
                        <strong>Melvin Davis</strong>
                        <p>Lead Developer</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OurTeam
