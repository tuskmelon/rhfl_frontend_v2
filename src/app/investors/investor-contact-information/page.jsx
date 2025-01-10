import { getInvestorsContactInformation } from '@/api/InvestorsApi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import React from 'react';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Investor Contact Information | Repco Home Loans";
    const description = "Repco Home Loans - Investor Contact Information ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let investorContact = [];
    try {
        investorContact = await getInvestorsContactInformation();
    } catch (error) {
        console.error("Error fetching investor contact information:", error);
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
                    Investor FAQs
                </h2>
            </div>

            {investorContact?.length > 0 ? (
                <Accordion className="mt-10 mb-10">
                    {investorContact.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black text-lg">
                                {item.ContactHeading}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10">
                                <div
                                    className="mb-2 text-[#212529] leading-9 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: item?.ContactInformation1 || "Loading...",
                                    }}
                                />
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <p className="text-center mt-10">No contact information available at the moment.</p>
            )}
        </div>
    );
};

export default Page;
