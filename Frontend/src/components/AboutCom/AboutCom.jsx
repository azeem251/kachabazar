import React from 'react'
import aboutImgRight from "../../assets/about_right_img.jpg"
import aboutmain from "../../assets/main_about.jpg"
const AboutCom = () => {
  return (
    <div className='about_welcome_wrapper py-5'>
    <div className='container'>
        <div className='aboutwelcom_row'>
            <div className='row gy-4 items-center'>
                <div className='col-lg-6'>
                    <div className='left_aboutcontent'>
                        <h2>Welcome to our KachaBazar shop</h2>
                        <p className='mt-3'>Holisticly seize parallel metrics and functional ROI.Seamlessly revolutionize error-free internal or organic sources before effective scenarios. Progressively incentivize state of the art applications for efficient intellectual capital. Credibly leverage existing distinctive mindshare through cutting-edge schemas. Proactively procrastinate team building paradigms coordinate client-centric total transparent internal. Dynamically embrace diverse customer service and installed base paradigms. Credibly seize enterprise-wide experiences for end-to-end data. Professionally brand flexible alignments and cost effective architectures. Enthusiastically incentivize seamless communities with seamlessly facilitate revolutionary metrics with strategic theme areas.</p>
                    </div>
                    <div className='row gy-4'>
                        <div className='col-lg-6 col-md-6'>
                            <div className='box_about bg-blue-50 p-3 mt-3 flex flex-col gap-2 rounded'>
                                      <h4><strong>8K</strong></h4>
                                <h4><strong>Lovely Customer</strong></h4>
                                <p>Competently productize virtual models without performance.</p>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                            <div className='box_about bg-blue-50 p-3 mt-3  flex flex-col gap-2 rounded'>
                                <h4><strong>10K</strong></h4>
                                <h4><strong>Listed Products</strong></h4>
                                <p className=''>Dynamically morph team driven partnerships after vertical.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 '>
                    <div className='right_img_about'>
                        <img src={aboutImgRight} alt="about-img-right" className='img-fluid'/>
                    </div>
                </div>
            </div>
        </div>

        <div className='bottom_content mt-5'>
            <p>Holisticly seize parallel metrics and functional ROI. Seamlessly revolutionize error-free internal or organic sources before effective scenarios. Progressively incentivize state of the art applications for efficient intellectual capital. Credibly leverage existing distinctive mindshare through cutting-edge schemas. Proactively procrastinate team building paradigms coordinate client-centric total transparent internal. Energistically reconceptualize global leadership for high-quality networks. Credibly restore an expanded array of systems rather than accurate results. Collaboratively synergize backend bandwidth without 24/7 functionalities. Credibly utilize proactive ideas whereas cross-media core competencies. Uniquely maximize professional best practices through resource maximizing services. Conveniently architect cross-unit web services for e-business imperatives.</p>
            <p className='mt-3'>Appropriately visualize market-driven data before one-to-one scenarios. Collaboratively productize multifunctional ROI through intuitive supply chains. Enthusiastically seize revolutionary value and process-centric services. Competently harness intuitive information after interoperable markets. Interactively revolutionize future-proof value before granular sources. Dynamically embrace diverse customer service and installed base paradigms. Credibly seize enterprise-wide experiences for end-to-end data. Professionally brand flexible alignments and cost effective architectures. Enthusiastically incentivize seamless communities with seamlessly facilitate revolutionary metrics with strategic theme areas.</p>
            <div className='mt-5'>
                <div>
                    <img src={aboutmain} alt="about_main" className='img-fluid rounded-2xl' />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AboutCom
