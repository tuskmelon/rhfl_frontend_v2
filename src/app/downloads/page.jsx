import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { DownloadsApi } from '@/api/DownloadsApi';
import Link from 'next/link';
import Image from 'next/image';
import { MetaTags } from '@/components/MetaTags';


export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Downloads | Repco Home Loans";
    const description = "Repco Home Loans - Downloads ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let Downloads = [];
    let error = null;

    try {
        Downloads = await DownloadsApi();
        console.log("Downloads data:", Downloads);
    } catch (err) {
        console.error("Error fetching Downloads data:", err);
        error = "Failed to load Downloads. Please try again later.";
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="Downloadsbg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem] sm:text-[1.3rem]">
                    Downloads
                </h2>
            </div>

            {error ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : Downloads?.length > 0 ? (
                <Accordion className="mt-10 mb-10 sm:m-auto m-3">
                    {Downloads.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:text-lg text-md">
                                {item.DownloadType}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10 md:pt-8 md:pb-4">
                                {item?.DownloadItems?.length > 0 ? (
                                    item.DownloadItems.map((idocs, index) => (
                                        <Link
                                            key={index}
                                            href={idocs?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className="pdfHighlight hover:text-[#ff0169] md:text-md text-sm text-[#011419] text-left flex gap-4 mb-4 md:mb-3">
                                                <Image
                                                    src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                    className="max-h-[25px]"
                                                    width={25}
                                                    height={25}
                                                    alt="PDF Icon"
                                                />
                                                &nbsp;{idocs?.name.split('.').slice(0, -1).join(' ')}
                                                {idocs.caption && (
                                                    <span className="pdfCaption">{idocs.caption}</span>
                                                )}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No documents available</p>
                                )}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">No downloads available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default Page;
