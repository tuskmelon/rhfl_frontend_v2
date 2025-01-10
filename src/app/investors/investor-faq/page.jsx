import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import { getInvestorsFAQ } from '@/api/InvestorsApi';
import FaqComponent from '@/components/FaqComponent';
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Investor FAQs | Repco Home Loans";
    const description = "Repco Home Loans - Investor FAQs ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page =async () => {
    let investorFAQs = await getInvestorsFAQ()
    return (
        <div className="max-w-[1280px] m-auto ">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Investor FAQs
                </h2>
            </div>
            <FaqComponent
                queries={investorFAQs}
            />
            {/* <Accordion alwaysOpen={false}>
                {investorFAQs.length > 0
                    ? investorFAQs.map((faqs, index) => (
                        <Accordion.Panel key={index}>
                            <Accordion.Title>
                                <span style={{ fontWeight: "bold" }}>{faqs.FAQName}</span>
                            </Accordion.Title>
                            <Accordion.Content>
                                <div
                                    style={{ marginTop: "1rem" }}
                                    dangerouslySetInnerHTML={{ __html: faqs.FAQDescription }}
                                />
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))
                    : "No FAQs available"}
            </Accordion> */}
        </div>
    )
}

export default Page