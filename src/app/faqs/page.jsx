import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags';
import HomeLoanModal from '@/components/Modals/HomeLoanModal'
import Link from 'next/link'
import React from 'react'

export async function generateMetadata() {
    const title = "Frequently Asked Questions | Repco Home Loans";
    const description = "Repco Home Loans - Frequently Asked Questions ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
    return (
        <div className="max-w-[1280px] md:m-auto m-3">
            <Breadcrumbs />
            <h2
                className=" mb-5 mt-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
            >
                Frequently Asked Questions
            </h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-9 gap-4 mb-10 mt-10'>
                <Link prefetch={true} href={'faqs/queries'} className='bg-[#ff0169] lg:p-[5rem] p-[3rem] cursor-pointer rounded-md font-semibold text-center'>
                    <p className='text-white'>Queries / Complaints</p>
                </Link>
                {/* <div  className='bg-[#ff0169] p-[5rem]  cursor-pointer rounded-md font-semibold text-center'>
                    <p className='text-white'> Home Loan Guide</p>
                </div> */}
                <HomeLoanModal />
                <Link prefetch={true} href={"faqs/general"} className='bg-[#ff0169] lg:p-[5rem] p-[3rem]  cursor-pointer rounded-md font-semibold text-center'>
                    <p className='text-white'>General Information</p>
                </Link>
            </div>
        </div>
    )
}

export default Page