
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RepcoLogo from '../../assets/image 8.png'
import ThankYouGif from '../../assets/thank-you.gif'


const ThankYou = () => {

    return (
        <>

            <div className="bg">
                <div className=" mq-cnt ">
                    <Link href="/"><Image src={RepcoLogo} alt="logo" width={100} height={100} className="img-fluid " /></Link>
                </div>
            </div>
            <div className="cnt">
                <Image src={ThankYouGif} alt="ThankYou" className="image m-auto" width={500} height={500} />
            </div>
            <div className="text-center mt-5 ">
                <p className="font ">Thank you for submitting your response,</p>
                <p className="font">we will contact you soon!</p>
            </div>
        </>
    )
}

export default ThankYou