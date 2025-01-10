import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
// import HomeLoanSupport from './HomeLoanSupport'
import { getHomeLoanSupportQueries } from '@/api/FaqApi'
import FaqComponent from '@/components/FaqComponent'
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Home Loan Support FAQ | Repco Home Loans";
    const description = "Repco Home Loans - Home Loan Support FAQ ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    let homeLoanSupport = await getHomeLoanSupportQueries()
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <h2
                className=" mb-5 mt-5 md:m-1 m-3 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
            // style={{ marginTop: "5rem" }}
            >
                FAQ - Home Loan Guide - Supporting Documents
            </h2>
            <FaqComponent
                queries={homeLoanSupport}
            />

        </div>
    )
}

export default Page