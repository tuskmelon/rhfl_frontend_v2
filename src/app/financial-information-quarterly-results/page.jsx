import React from 'react'
import QuartelyInformation from './QuartelyInformation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Financial Information Quarterly Results | Repco Home Loans";
    const description = "Repco Home Loans - Financial Information Quarterly Results ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = () => {
    return (
        <div className='max-w-[1280px] m-auto '>
            <Breadcrumbs />
            <div className=" mb-0 mt-10 md:m-1 m-4">
                <p className="headings mb-5 announcements text-center flex justify-center">
                    Financial Information
                </p>
                <h4 className='text-lg text-[#ff0169] font-medium  mb-5  text-center'>Quarterly Results</h4>
                <QuartelyInformation />
            </div>

        </div>
    )
}

export default Page