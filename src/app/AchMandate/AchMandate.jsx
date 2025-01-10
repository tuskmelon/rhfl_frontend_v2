// 'use cache'
import Image from 'next/image';
import Link from 'next/link'
import image1 from '../../assets/NACH Manual registration form.png'
import image2 from '../../assets/NACH registration 1.png'
import image3 from '../../assets/NACH registration 2.png'
import image4 from '../../assets/image.png'
import React from 'react'
export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export const fetchCache = 'force-cache';
const AchMandate = () => {
    return (
        <>
            <div
                className="headings text-2xl BranchNetworkHeading mt-4 mb-4 text-center"

            > NACH-E-Mandate
            </div>
            <div className="e-Mandate p-3" data-aos="fade-up">

                <h1 >e-Mandate Registration Guide</h1>

                <h2 >Step 1: Go-to Camspay Link</h2>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3" data-aos="fade-left">
                    <div className="my-auto">
                        <p>Visit the following link to begin the process:</p>
                        <p><Link href="https://one.camspay.com/recurring/repcohomeregistration" target="_blank">https://one.camspay.com/recurring/repcohomeregistration</Link></p>
                    </div>
                    <div className="flex items-center">
                        <video loading="lazy" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} controls>
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_1_0db66fa585_8b7353eb52.mp4'} type="video/mp4" />
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_1_0db66fa585_8b7353eb52.mp4'} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                {/* <p>Visit the following link to begin the process:</p>
<p><Link href="https://one.camspay.com/recurring/repcohomeregistration" target="_blank">https://one.camspay.com/recurring/repcohomeregistration</Link></p> */}



                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 my-10" data-aos="fade-right">
                    <div className="my-auto">
                        <h2>Step 2: Fill the Customer Details</h2>
                        <p className="py-3">Complete the following fields:</p>
                        <ul className='list-disc ps-5 ms-3'>
                            <li className="font-semibold">Name as per Bank Records*</li>
                            <li className="font-semibold">Mobile Number*</li>
                            <li className="font-semibold">Transaction No* <span className="font-normal">(Enter Loan Account Number/Application ID)</span></li>
                            <li className="font-semibold">Authentication Mode*</li>
                            <ul>
                                <li className='list-disc ms-3'>Net banking</li>
                                <li className='list-disc ms-3'>Debit Card</li>
                                <li className='list-disc ms-3'>Aadhaar (eSign)</li>
                            </ul>
                            <li className="font-semibold">Branches*<span className="font-normal">(Select your RHFL service Branch from drop-down list)</span></li>
                        </ul>
                    </div>
                    <div className="md:mt-1 mt-4 flex items-center">
                        <video loading="lazy" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} controls>
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_2_b77318d476_34aefb519b.mp4'} type="video/mp4" />
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_2_b77318d476_34aefb519b.mp4'} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>



                <div className="grid md:grid-cols-2 grid-cols-1 my-10" data-aos="fade-left">
                    <div className="my-auto">
                        <h2>Step 3: Bank Details</h2>
                        <p className="py-3">Enter the following information:</p>
                        <ul className='list-disc ms-3 ps-5'>
                            <li className="font-semibold">Bank Name*<span className="font-normal">(Select from drop-down list)</span></li>
                            <li className="font-semibold">Bank Type*<span className="font-normal"> (Select from drop-down list)</span></li>
                            <li className="font-semibold">Enter Bank Account No*</li>
                            <li className="font-semibold">Enter Confirm Bank Account No*</li>
                            <li className="font-semibold">Enter Bank IFSC Code*</li>
                        </ul>
                    </div>
                    <div className="md:mt-1 mt-4 flex items-center">
                        <video loading="lazy" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} controls>
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_3_db87bb122c_f958e4e79c.mp4'} type="video/mp4" />
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_3_db87bb122c_f958e4e79c.mp4'} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>




                <div className="grid md:grid-cols-2 grid-cols-1 my-10" data-aos="fade-right">
                    <div className="my-auto pe-4">
                        <h2>Step 4: Mandate Details</h2>
                        <p className="py-3">Complete the following fields:</p>
                        <ul className='list-disc ms-4 ps-5'>
                            <li className="font-semibold">Frequency Option*<span className="font-normal">(Select Monthly from drop-down list)</span></li>
                            <li className="font-semibold">Debit Type*<span className="font-normal">(Select Maximum from drop-down list)</span></li>
                            <li className="font-semibold">Mandate Category* <span className="font-normal"> (Select Loan Instalment payment)</span></li>
                            <li className="font-semibold">Mandate Start Date*<span className="font-normal">(Select EMI start date as 07th, 10th, or 11th)</span></li>
                            <li className="font-semibold">Mandate End Date* <span className="font-normal">(Select EMI END date up to 30 years)</span></li>
                            <li className="font-semibold">eNACH Payment* <span className="font-normal">(Select to process eNACH Mandate from drop-down list)</span></li>
                            <li className="font-semibold">Amount* <span className="font-normal">(Type twice the EMI amount)</span></li>
                        </ul>
                        <p className="py-3"><em>Note:</em> Maximum Amount per mandate will be twice the EMI (i.e. EMI X 2). The 'maximum amount' is to
                            take care of changes in EMI during Increase of rate of interest. However, your bank account will
                            normally be debited with 1 EMI per month. </p>
                    </div>
                    <div className="md:mt-1 mt-4 flex items-center">
                        <video loading="lazy" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} controls>
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_4_c6efcff0e7_8fd5fea735.mp4'} type="video/mp4" />
                            <source src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/Step_4_c6efcff0e7_8fd5fea735.mp4'} type="video/ogg" />
                            Your bgrid grid-col-2ser does not support the video tag.
                        </video>
                    </div>

                </div>
                <div data-aos="fade-left">
                    <h2>Step 5: Registration Completion</h2>
                    <p>Once all details are filled out:</p>
                    <ul className='list-disc ms-4 ps-5'>
                        <li>Redirected to respective banking portal, where bank account holder will be prompted to enter required banking
                            details for authentication. </li>
                        <li>If banking authentication is successfully done, then E-Mandate is registered. </li>
                    </ul>

                    <h2>NACH UPDATION/CANCELLATION/SUSPENSION/REVOKE SUSPENSION</h2>
                    <p>In case you want to update any mandate details/cancel the mandate/suspend the mandate/revoke
                        the suspension, please visit the nearest RHFL Branch.</p>
                    <p><Link href="https://www.repcohome.com/branches" target="_blank">https://www.repcohome.com/branches</Link></p>

                    <h2>Frequently Asked Questions (FAQs)</h2>
                    <ul className='list-disc ms-4 ps-5'>
                        <li><strong>What is the difference between physical mandate and e-Mandate?</strong>
                            <p>In physical mandate, Customer has to fill his Bank details along with his signature. If any difference is found in
                                signature, Mandate will not be activated. But for activation of e-Mandate, signature is not required. CVV
                                number in the Debit card, Net Banking or AADHAR linked mobile number is enough for activation. </p>
                        </li>
                        <li><strong>Is e-Mandate available with all Banks? </strong>
                            <p>No. Only NPCI registered banks are having this facility. It can be verified at <Link href="https://www.npci.org.in/PDF/nach/live-members-e-mandates/Live-Banks-in-API-E-Mandate.pdf" target="_blank">https://www.npci.org.in/PDF/nach/live-members-e-mandates/Live-Banks-in-API-E-Mandate.pdf</Link>
                                You can register for it through the Internet Banking, Debit card and Aadhar card.</p>
                        </li>
                        <li><strong>What are the requirements for e-Mandate?</strong>
                            <p>The requirements to set up an e-Mandate is that one must have a Bank account that supports it. Few Banks in India
                                does not provide this facility. In all the other Banks, e-Mandate can be activated through Debit card / Net
                                Banking / AADHAR linked mobile number. So, please go through the guidelines of the concerned Bank for activating
                                e-Mandate. </p>
                        </li>
                        <li><strong>Can the cancelled mandate be revoked and make active again? </strong>
                            <p>No, mandate once cancelled cannot be revoked. Customer has to visit the nearest RHFL Branch for re
                                activation. </p>
                        </li>
                        <li><strong>What are the applicable charges for Mandate creation and cancellation? </strong>
                            <p>It depends on the Bank in which Customer maintains his account. </p>
                        </li>
                    </ul>


                    <h2>Types of Mandate that eNACH provides: </h2>
                    <ul className='list-disc ms-4 ps-5'>
                        <li>
                            Aadhar card
                        </li>
                        <li>
                            Debit Card
                        </li>
                        <li>
                            Internet Banking
                        </li>
                        <li>
                            Physical Mandate
                        </li>
                    </ul>
                </div>

                <h2>ENACH REGISTRATION PROCESS I:  </h2>
                <Image className=" m-auto d-flex" alt='' src={image4} />
                <div className="mt-4 m-auto" >
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                        <div className="" data-aos="fade-up" data-aos-duration="1000" >
                            <Image src={image2} className="m-auto" width={300} height={300} alt='new_image1' />
                        </div>
                        <div className="" data-aos="fade-up" data-aos-duration="1300">
                            <Image src={image3} className="m-auto" width={300} height={300} alt='new_image2' />
                        </div>
                        <div className="" data-aos="fade-up" data-aos-duration="1600">
                            <Image src={image1} className="m-auto" width={300} height={300} alt='new_image3' />
                        </div>
                    </div>
                </div>

                <div data-aos="fade-left" data-aos-duration="1600">
                    <h2>Conclusion</h2>
                    <p>Repayment by e-NACH is the best way to solve the recurrent payment issue in a dynamic digital finance era. Say
                        goodbye to worries about missed due dates, as these digital solutions make the process easier, smoother and
                        efficient for customers and merchants. To sum up it’s apparent that the future of recurring payment is in e-
                        NACH. Enter this virtual world of hassle-free financial transactions and get ready to enjoy an expedited and
                        hassle-free journey in finance. </p>

                </div>
            </div>
        </>
    )
}

export default AchMandate