import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import CareerTabSection from './CareerTabSection'
import CareerAvailable from './CareerAvailable'
import { getRHFLCareer } from '@/api/CareerApi'
import { MetaTags } from '@/components/MetaTags'

export async function generateMetadata() {
    const title = "Careers | Repco Home Loans";
    const description = "Repco Home Loans - Careers";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let response = await getRHFLCareer();
    return (
        <div className="max-w-[1280px] m-auto ">

            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                // style={{ marginTop: "5rem" }}
                >
                    Careers
                </h2>
            </div>
            <CareerTabSection response={response} CareerAvailableComponent={<CareerAvailable />} />
        </div>
    )
}

export default Page