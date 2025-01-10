import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import Link from 'next/link';
import { REACT_APP_BASE_URL } from '@/env/env';
import React from 'react';
import Image from 'next/image';
import { getCorporateGovernance } from '@/api/CorporateGovernanceApi';

const CorporateGovernanceFamiliarizations = async () => {
    let corporateGovernance = [];
    let error = null;

    try {
        corporateGovernance = await getCorporateGovernance();
    } catch (err) {
        console.error("Error fetching corporate governance data:", err);
        error = "Failed to load Familiarization Programmes. Please try again later.";
    }

    return (
        <div className="mt-5">
            {error ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : corporateGovernance?.length > 0 ? (
                corporateGovernance.map((cgovern, index) => (
                    cgovern?.FamiliarizationProgrammes?.length > 0 && (
                        <Accordion key={index} className="rounded-md md:m-1 m-4">
                            <AccordionPanel>
                                <AccordionTitle className="font-semibold p-[1.5rem] text-black">
                                    Familiarization Programmes
                                </AccordionTitle>
                                <AccordionContent className="pt-8">
                                    {cgovern.FamiliarizationProgrammes.map((files, idx) => (
                                        <div key={idx} className="md:leading-10 sm:leading-8 xs:leading-6">
                                            <Link
                                                href={`${files.url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p className="pdfHighlight break-all text-left m-0 mb-2 hover:text-[#ff0169] gap-3 flex">
                                                    <Image
                                                        src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                        className="max-h-[25px]"
                                                        width={25}
                                                        height={25}
                                                        alt="PDF Icon"
                                                    />
                                                    &nbsp;{files.name.split(files.ext)[0]}
                                                    {files.caption && (
                                                        <span className="pdfCaption">
                                                            {files.caption}
                                                        </span>
                                                    )}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                    )
                ))
            ) : (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-500">
                        No corporate governance data available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CorporateGovernanceFamiliarizations;
