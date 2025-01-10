import React from 'react'
import SalesCareer from './SalesCareer'
import { branchDetails } from '@/api/BranchesApi';
import { MetaTags } from '@/components/MetaTags';


export async function generateMetadata() {
    const title = "Sales Career | Repco Home Loans";
    const description = "Repco Home Loans - Sales Career ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    const branches = await branchDetails("BranchLink");
    console.log(branches, "branches");

    return (
        <div>
            <SalesCareer
                branches={branches}
            />
        </div>
    )
}

export default Page