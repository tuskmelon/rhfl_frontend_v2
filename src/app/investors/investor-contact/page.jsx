import { getInvestorsContact } from '@/api/InvestorsApi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import React from 'react';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Investor Contact | Repco Home Loans";
    const description = "Repco Home Loans - Investor Contact ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let investorContact = [];
    let error = null;

    try {
        investorContact = await getInvestorsContact();
    } catch (err) {
        console.error("Error fetching investor contacts:", err);
        error = "Failed to load investor contacts. Please try again later.";
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Investor Contact
                </h2>
            </div>

            {error ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : investorContact?.length > 0 ? (
                <Accordion className="mt-10 mb-10 md:m-1 m-4">
                    {investorContact.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:text-lg text-sm">
                                {item?.ContactHeading || "Untitled Contact"}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10">
                                <div
                                    className="mb-2 text-[#212529] md:text-lg text-wrap text-sm md:leading-9 sm:leading-8 xs:leading-6 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: item?.ContactInformation1 || "Loading...",
                                    }}
                                />
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">No investor contacts available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default Page;
