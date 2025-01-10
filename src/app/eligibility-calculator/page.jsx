import Breadcrumbs from '@/components/Breadcrumbs'
import EligibileCalci from '@/components/EligibilityCalculator/EligibileCalci'
import { MetaTags } from '@/components/MetaTags';
import React from 'react'

export async function generateMetadata() {
    const title = "Eligibility Calculator | Repco Home Loans";
    const description = "Repco Home Loans - Eligibility Calculator ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = () => {
    return (
        <div className=' mb-8 max-w-[1280px] m-auto'>
            <Breadcrumbs />
            <EligibileCalci />
        </div>
    )
}

export default Page
