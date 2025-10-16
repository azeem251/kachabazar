import React from 'react'
import aboutImg from "../../assets/about_wrapper.jpg"
import KachaBazar from '../kachaBazar/KachaBazar'
import ShoopingTimer from '../ShoopingTimer/ShoopingTimer'
import { Link } from 'react-router-dom'
const TearmsCondition = () => {
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
                        <h1>Terms & Conditions</h1>
                    </div>
                </div>
            </div>
            <div className='privacy_policy_wrapper py-5'>
                <div className='container'>
                    <div className='all_content_privacy_policy'>
                        <strong>Welcome to KachaBazar!</strong>
                        <p>These terms and conditions outline the rules and regulations for the use of KachaBazar's Website, located at <Link to={'https://kachabazaronrender.com'}>https://kachabazaronrender.com/</Link>. By accessing this website we assume you accept these terms and conditions. Do not continue to use KachaBazar if you do not agree to take all of the terms and conditions stated on this page.</p>
                        <p className='pt-3'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: Client, You and Your refers to you, the person log on this website and compliant to the Company’s terms and conditions. The Company, refers to our CompanyPartParties or Us refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
                        <div className='pt-3'>  <strong >Cookies</strong></div>
                        <p>We employ the use of cookies. By accessing KachaBazar, you agreed to use cookies in agreement with the KachaBazar's Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
                      
                        <div className='pt-3'>
                            <ul className='flex flex-col gap-2'>
                                <li><p>1. Identifiers (e.g. name, mailing address, email address, phone number, credit/debit card number)</p></li>
                                <li><p>2. Characteristics of protected classifications (e.g. gender, age)</p></li>
                                <li><p>3. Commercial information (e.g. products or services purchased, purchase history)</p></li>
                                <li><p>4. Internet or other electronic network activity (e.g. browse or search history)</p></li>
                                <li><p>5. Geo location data (e.g. latitude or longitude)</p></li>
                                <li><p>6. Audio, electronic, visual, or similar information (e.g. recording of Guest service calls)</p></li>
                                <li><p>7. Inferences drawn from any of the above (e.g. preferences or characteristics)</p></li>
                            </ul>
                            <p className='pt-3'>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. KachaBazar does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of KachaBazar,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, KachaBazar shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
                        </div>
                        <div className='pt-3'><strong>Content Liability</strong></div>
                        <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
                        <div className='pt-3'><strong>Your Privacy</strong></div>
                        <p>Please read Privacy Policy</p>
                        <div className='pt-3'><strong>Reservation of Rights</strong></div>
                        <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
                     
                        <div className='pt-3'><strong>Disclaimer</strong></div>
                        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                        <div className='pt-3'>
                            <ul className='flex flex-col gap-2'>
                                <li><p>1. limit or exclude our or your liability for death or personal injury;</p></li>
                                <li><p>2. limit or exclude our or your liability for fraud or fraudulent misrepresentation;</p></li>
                                <li><p>3. limit any of our or your liabilities in any way that is not permitted under applicable law; or</p></li>
                                <li><p>4. exclude any of our or your liabilities that may not be excluded under applicable law.</p></li>
                                <li><p>5. Geo location data (e.g. latitude or longitude)</p></li>
                                <li><p>6. Audio, electronic, visual, or similar information (e.g. recording of Guest service calls)</p></li>
                                <li><p>7. Inferences drawn from any of the above (e.g. preferences or characteristics)</p></li>
                            </ul>
                            <p className='pt-3'>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                         
                        </div>
                    </div>
                </div>
            </div>

            <KachaBazar />
            <ShoopingTimer />

        </>
    )
}

export default TearmsCondition
