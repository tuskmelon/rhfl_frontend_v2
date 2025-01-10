import { SecretarialComplianceReport } from '@/api/SecretarialComplianceReport';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import React from 'react';
import { MetaTags } from '@/components/MetaTags';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Secretarial Compliance Report | Repco Home Loans";
    const description = "Repco Home Loans - Secretarial Compliance Report ";

    const metaData = MetaTags({ title, description });

    return metaData;
}


const Page = async () => {
    let secretarialComplianceReport = [];

    try {
        secretarialComplianceReport = await SecretarialComplianceReport();
    } catch (err) {
        console.error("Error fetching secretarial compliance report:", err);
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
                    Secretarial Compliance Report
                </h2>
            </div>

            {secretarialComplianceReport?.length > 0 ? (
                <Accordion className="rounded-md md:m-1 m-4">
                    {secretarialComplianceReport.map((secretarialcomplaint, index) => (
                        <AccordionPanel key={index}>
                            <AccordionTitle className="font-semibold p-[1.5rem] text-black">
                                {secretarialcomplaint?.SecretarialTitle}
                            </AccordionTitle>
                            <AccordionContent style={{ paddingTop: '2rem' }}>
                                {secretarialcomplaint?.SecretarialDocuments?.length > 0 ? (
                                    secretarialcomplaint?.SecretarialDocuments.map((files, index) => (
                                        <div key={index} className="md:leading-10 sm:leading-8 xs:leading-6">
                                            <Link href={files.url} target="_blank" rel="noopener noreferrer">
                                                <p className="pdfHighlight break-all text-left m-0 mb-2 hover:text-[#ff0169] gap-3 flex">
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
                                    <p>No documents available.</p>
                                )}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">No secretarial compliance reports available.</p>
                </div>
            )}
        </div>
    );
};

export default Page;
