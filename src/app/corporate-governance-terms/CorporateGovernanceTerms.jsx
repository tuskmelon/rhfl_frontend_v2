import { getCorporateGovernance } from '@/api/CorporateGovernanceApi';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import Link from 'next/link';
import { REACT_APP_BASE_URL } from '@/env/env';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const CorporateGovernanceTerms = async () => {
    const corporateGoverence = await getCorporateGovernance();
    // console.log(corporateGoverence, "corporateGoverence");
    return (
        <div className='mt-5'>
            {corporateGoverence?.length > 0 ? corporateGoverence?.map((cgovern, index) => (
                cgovern?.Letters?.length > 0 &&
                    <Accordion key={index} className='rounded-md md:m-1 m-4'>
                        <AccordionPanel>
                            <AccordionTitle className='font-semibold p-[1.5rem] text-[16px] sm:text-[16px] md:text-[16px] text-black'>
                                Letters
                            </AccordionTitle>
                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                {cgovern?.Letters?.length > 0 ? cgovern.Letters?.map((files, index) => (
                                    <div key={index} className='md:leading-10 sm:leading-8 xs:leading-7'>
                                        <Link href={files.url} target='_blank'>
                                            <p className="pdfHighlight text-left break-all m-0 mb-2 text-[14px] sm:text-[14px] md:text-[16px]  hover:text-[#ff0169] text-wrap gap-3 flex">
                                                <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                                &nbsp;{files.name.split(files.ext)[0]}
                                                {files.caption ? <span className="pdfCaption">{files.caption}</span> : ""}
                                            </p>
                                        </Link>
                                    </div>
                                )) : null}
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
            )) : ""}
        </div>
    )
}

export default CorporateGovernanceTerms