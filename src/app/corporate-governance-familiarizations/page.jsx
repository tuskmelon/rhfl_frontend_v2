import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import CorporateGovernanceFamiliarizations from './CorporateGovernanceFamiliarizations'
import { MetaTags } from '@/components/MetaTags';


export async function generateMetadata() {
    const title = "Corporate Governance Familiarizations | Repco Home Loans";
    const description = "Repco Home Loans - Corporate Governance Familiarizations ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
    return (
        <div className="max-w-[1280px] m-auto" >
            <Breadcrumbs />
            <CorporateGovernanceFamiliarizations />
        </div >
    )
}

export default Page