import { getGeneralQueries } from '@/api/FaqApi'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqComponent from '@/components/FaqComponent'
import { MetaTags } from '@/components/MetaTags';
import React from 'react'
// import GeneralAccordion from './GeneralAccordion'

export async function generateMetadata() {
    const title = "General FAQ | Repco Home Loans";
    const description = "Repco Home Loans - General FAQ ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    let generalQueries = await getGeneralQueries()
    console.log(generalQueries, "generalQueries");
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <h2
                className=" mb-5 mt-5 md:m-1 m-3 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
            // style={{ marginTop: "5rem" }}
            >
                FAQ - General Information
            </h2>
            {/* <GeneralAccordion /> */}

            <FaqComponent
                queries={generalQueries}
            />
        </div>
    )
}

export default Page