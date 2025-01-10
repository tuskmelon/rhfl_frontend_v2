import { getDisclouser } from '@/api/DisclouserApi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { REACT_APP_BASE_URL } from '@/env/env';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import React from 'react';
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Events or Information Disclosed Under Regulation | Repco Home Loans";
    const description = "Repco Home Loans - Events or Information Disclosed Under Regulation ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    let disclosedUnderRegulation = [];
    let error = null;

    try {
        disclosedUnderRegulation = await getDisclouser();
    } catch (err) {
        console.error("Error fetching disclosure data:", err);
        error = "Failed to load disclosed information. Please try again later.";
    }

    // console.log(disclosedUnderRegulation, "disclosedUnderRegulation");
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="Downloadsbg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
                    Events or Information Disclosed Under Regulation 30 of LODR
                </h2>
            </div>

            {error ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : disclosedUnderRegulation?.length > 0 ? (
                <Accordion className="rounded-md md:m-1 m-4">
                    {disclosedUnderRegulation.map((regulation, index) => (
                        <AccordionPanel key={index}>
                            <AccordionTitle className="font-semibold p-[1.5rem] text-black">
                                {regulation.DisclosedTitle}
                            </AccordionTitle>
                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                {regulation.DisclosedDocument?.length > 0 ? (
                                    regulation.DisclosedDocument.map((files, index) => (
                                        <div key={index} className="md:leading-10 sm:leading-8 xs:leading-6">
                                            <Link href={files?.url} target="_blank" rel="noopener noreferrer">
                                                <p className="pdfHighlight text-left break-all m-0 mb-2 md:text-[16px] sm:text-[14px] text-[12px] hover:text-[#ff0169] gap-3 flex">
                                                    <Image
                                                        src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                        className="max-h-[25px]"
                                                        width={25}
                                                        height={25}
                                                        alt="PDF Icon"
                                                    />
                                                    &nbsp;{files.name.split(files.ext)[0]}
                                                    {files.caption && <span className="pdfCaption">{files.caption}</span>}
                                                </p>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>No documents available</p> // Optional: Add a fallback message
                                )}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">No disclosed information available.</p>
                </div>
            )}
        </div>
    );
};

export default Page;
