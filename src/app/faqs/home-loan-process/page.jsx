import React from 'react'
// import HomeLoanProcess from './HomeLoanProcess'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqComponent from '@/components/FaqComponent'
import { getHomeLoanProcessQueries } from '@/api/FaqApi'
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Home Loan Process FAQ | Repco Home Loans";
    const description = "Repco Home Loans - Home Loan Process FAQ ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    let homeLoanProcess = await getHomeLoanProcessQueries()
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <h2
                className=" mb-5 mt-5 md:m-1 m-3 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
            // style={{ marginTop: "5rem" }}
            >
                FAQ - Home Loan Guide - Home Loan Process at RHFL
            </h2>
            {/* <HomeLoanProcess /> */}
            <FaqComponent
                queries={homeLoanProcess}
            />
        </div>
    )
}

export default Page