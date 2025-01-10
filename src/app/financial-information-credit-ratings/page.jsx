import React from 'react'
import FinancialInformationCreditRatings from './FinancialInformationCreditRatings'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Financial Information Credit Ratings | Repco Home Loans";
    const description = "Repco Home Loans - Credit Ratings ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = () => {
    return (
        <div className='max-w-[1280px] m-auto'>
            <Breadcrumbs />
            <div className="announcementsBackground mb-0 mt-10 md:m-1 m-4">
                <p className="headings mb-5 announcements text-center flex justify-center">
                    Credit Ratings
                </p>
                <FinancialInformationCreditRatings />
            </div>
        </div>
    )
}

export default Page