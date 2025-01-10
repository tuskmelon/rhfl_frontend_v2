import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
// import HomeLoanTaxBenefits from './HomeLoanTaxBenefits'
import FaqComponent from '@/components/FaqComponent'
import { getHomeLoanGuideQueries } from '@/api/FaqApi'
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Home Loan Tax Benefits FAQ | Repco Home Loans";
    const description = "Repco Home Loans - Home Loan Tax Benefits FAQ ";

    const metaData = MetaTags({ title, description });


    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    let homeLoanTax = await getHomeLoanGuideQueries()
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <h2
                className=" mb-5 mt-5 md:m-1 m-3 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"

            >
                FAQ - Home Loan Guide - Tax Benefits
            </h2>
            {/* <HomeLoanTaxBenefits /> */}
            <FaqComponent
                queries={homeLoanTax}
            />

        </div>
    )
}

export default Page