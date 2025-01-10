import { getReturns } from '@/api/AnnualReturns';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Annual Returns | Repco Home Loans";
    const description = "Repco Home Loans - Annual Returns";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let returns = [];
    let error = null;

    try {
        returns = await getReturns();
    } catch (err) {
        console.error("Error fetching annual returns:", err);
        error = "Failed to load Annual Returns. Please try again later.";
    }

    // console.log(returns, "returns")

    return (
        <div className="max-w-[1380px] m-auto">

            <Breadcrumbs />
            <div className="announcementsBackground mb-0 mt-10">
                <p className="headings announcements text-center flex justify-center">
                    Annual Returns
                </p>
            </div>

            {error ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : returns?.length > 0 ? (
                <Accordion className="mt-10 mb-10 md:m-1 m-4">
                    {returns.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:!text-md text-sm break-all">
                                {item?.AnnualReturnTitle}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10">
                                {item?.AnnualReturnDocument?.length > 0 ? (
                                    item?.AnnualReturnDocument.map((idocs, index) => (
                                        <Link
                                            key={index}
                                            href={idocs?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className="flex break-all gap-3 hover:text-[#ff0169] text-left text-[14px] sm:text-[14px] md:text-[16px]">
                                                <Image
                                                    src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                    className="max-h-[25px]"
                                                    width={25}
                                                    height={25}
                                                    alt="PDF Icon"
                                                />
                                                &nbsp;{idocs?.name.split('_').slice(0, -1).join(' ')}
                                                {idocs.caption && (
                                                    <span className="pdfCaption hover:text-[#ff0169]">
                                                        {idocs.caption}
                                                    </span>
                                                )}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No documents available.</p>
                                )}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">
                        No annual returns available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Page;
