import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { IntimationApi } from '@/api/IntimationStockApi';
import Link from 'next/link';
import { REACT_APP_BASE_URL } from '@/env/env';
import Image from 'next/image';

const IntimationStockExchange = async () => {
    let stockExchange = [];
    let error = null;

    try {
        stockExchange = await IntimationApi();
    } catch (err) {
        console.error("Error fetching stock exchange data:", err);
        error = "Failed to load stock exchange data. Please try again later.";
    }

    const removeExtensionAndLastPart = (filename) => {

        const fileNameWithoutExtension = filename?.substring(0, filename?.lastIndexOf('.'));

        const fileNameWithSpaces = fileNameWithoutExtension?.replace(/_/g, ' ');

        const finalFileName = fileNameWithSpaces?.substring(0, fileNameWithSpaces?.lastIndexOf(''));
        let finalValue = finalFileName?.split(' ')?.slice(0, -1)?.join(' ');
        // console.log(finalValue, "finalValue");
        return finalValue;
    };


    return (
        <div className="mt-10 mb-10 md:m-1 m-4">
            {error ? (
                <div className="text-center">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : stockExchange?.length > 0 ? (
                <Accordion>
                    {stockExchange.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:text-lg text-[16px]">
                                {item.IntimationTitle}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10">
                                {item?.IntimationDocuments?.length > 0 ? (
                                    item.IntimationDocuments.map((idocs, index) => (
                                        <Link key={index} href={idocs.url} target="_blank">
                                            <p className="pdfHighlight break-all hover:text-[#ff0169] text-[#011419] text-left flex md:text-lg text-sm gap-4 mb-4">
                                                <Image
                                                    src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'}
                                                    className='max-h-[25px]'
                                                    width={25}
                                                    height={25}
                                                    alt="PDF Icon"
                                                />
                                                {/* Use the removeExtension function to display the filename without extension */}
                                                {removeExtensionAndLastPart(idocs?.name)}
                                                {idocs?.caption && (
                                                    <span className="pdfCaption text-wrap whitespace-pre-wrap">
                                                        {idocs?.caption}
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
                <div className="text-center">
                    <p className="text-lg text-gray-500">No stock exchange data available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default IntimationStockExchange;
