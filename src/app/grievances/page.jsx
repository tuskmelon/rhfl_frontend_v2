import React from "react";
import Breadcrumbs from '@/components/Breadcrumbs';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Link from 'next/link';
import { GrievancesApi } from '@/api/GrievancesApi';
import Image from "next/image";
import { MetaTags } from "@/components/MetaTags";

export const dynamic = 'force-static'; 
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Grievances | Repco Home Loans";
    const description = "Repco Home Loans - Grievances ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {
    let Grievances = [];
    try {
        Grievances = await GrievancesApi();
    } catch (error) {
        console.error("Error fetching Grievances:", error);
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="Downloadsbg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
                    Grievance Redressal
                </h2>
            </div>
            {Grievances?.length > 0 ? (
                <Accordion className="mt-10 mb-10 md:m-1 m-4">
                    {Grievances.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:text-lg text-md">
                                {item?.title}
                            </AccordionTitle>
                            <AccordionContent className="pt-10 pb-10">
                                {item?.files?.map((file, index2) => (
                                    <Link
                                        className="flex gap-2 mb-2"
                                        href={file?.file?.url || ''}
                                        target="_blank"
                                        key={index2}
                                    >
                                        <Image
                                            src={
                                                'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'
                                            }
                                            className="max-h-[25px]"
                                            width={25}
                                            height={25}
                                            alt=""
                                        />
                                        <p>{file?.title}</p>
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <p className="text-center mt-10">No grievances available at the moment.</p>
            )}
        </div>
    );
};

export default Page;
