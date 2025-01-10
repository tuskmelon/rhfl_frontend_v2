import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags';
import Link from 'next/link'
import React from 'react'

export async function generateMetadata() {
    const title = "Investors | Repco Home Loans";
    const description = "Repco Home Loans - Investors ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60;
export const fetchCache = 'force-cache';

const Page = () => {
    return (
        <div className="max-w-[1280px] m-auto ">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                // style={{ marginTop: "5rem" }}
                >
                    Investor Information
                </h2>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="800"
                        href={"/investors/investor-calendar"} className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        Investor Calendar
                    </Link>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="1000"
                        href={"/investors/investor-faq"} className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        Investor FAQ
                    </Link>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="1200"
                        href={"/investors/investor-contact"} className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        Investor Contact
                    </Link>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="1400"
                        href={"/investors/unclaimed-dividend"} className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        Unclaimed Dividend
                    </Link>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="1600"
                        href={"/investors/tds-dividend"} className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        TDS on Dividend
                    </Link>
                    <Link prefetch={true}
                        data-aos="fade-up" data-aos-duration="1800"
                        href={"https://smartodr.in/login"} target='_blank' className='bg-[#ff0169] m-auto pt-[5rem] pb-[5rem]  cursor-pointer rounded-md font-semibold text-center max-w-[80%] w-[80%] text-white'>
                        SMARTODR
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page