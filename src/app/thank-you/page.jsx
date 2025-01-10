import React from 'react'
import '../../../public/ThankYou/Style.css'
import ThankYou from './ThankYou'

// export const dynamic = 'force-static'; // or 'force-static'
// export const revalidate = 60; 
export const fetchCache = 'force-cache';
const Page = () => {

    return (
        <>
            <ThankYou />
        </>
    )
}

export default Page