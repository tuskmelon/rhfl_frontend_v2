import { getCorporateGovernance } from '@/api/CorporateGovernanceApi';
import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
// import DOMPurify from 'dompurify';

const CorporateGovernance = async () => {
    const corporateGoverence = await getCorporateGovernance();
    console.log(corporateGoverence, "corporateGoverence");

    return (
        <div className='md:m-1 m-4'>
            {corporateGoverence?.map((cgovern, index) => {
                if (!cgovern?.IsSectionAccordion) {
                    return (
                        <div key={index}>
                            <h4 className="text-left mb-4 font-semibold lg:text-2xl md:text-lg text-[#ff0169]">
                                {cgovern?.SectionHeading}
                            </h4>
                            <div
                                className="text-left lg:leading-10 leading-8"
                                dangerouslySetInnerHTML={{ __html: (cgovern?.SectionText) }}
                            ></div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index}>
                            {index === 1 && (
                                <h4 className="text-left mb-4 mt-5 font-semibold lg:text-2xl md:text-lg text-[#ff0169]">
                                    COMMITTEES OF THE BOARD
                                </h4>
                            )}
                            <Accordion className='mb-4' collapseAll={index === 1 ? false : true}>
                                <AccordionPanel>
                                    <AccordionTitle

                                        className='text-left text-black font-semibold md:text-lg text-sm p-[1.5rem] '
                                    >
                                        {cgovern.SectionHeading}
                                    </AccordionTitle>

                                    {
                                        cgovern?.documentId === "j2k40a8xj05a2ghbbc3roynv" ? (
                                            <AccordionContent
                                                className='text-left md:text-lg text-sm'
                                                style={{ lineHeight: "1.8rem" }}

                                            >
                                                <table className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    {/* <thead className=" md:text-base sm:text-sm  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="">
                                                            <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg ">
                                                                Rating Agency
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 font-medium ">
                                                                instrument
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 font-medium rounded-tr-lg">
                                                                Rating
                                                            </th>
                                                        </tr>
                                                    </thead> */}
                                                    <tbody>
                                                        {cgovern?.table?.data.map((data, index) => (
                                                            <tr
                                                                key={index}
                                                                className="bg-white sm:text-sm md:text-base text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700"
                                                            >
                                                                <td className="md:!px-6 md:!py-4 px-2 py-2 border-r">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="md:!px-6 md:!py-4 px-2 py-2 border-r w-[80%] text-wrap break-keep"><p className=''>
                                                                    {data.description}
                                                                </p></td>
                                                                <td className="md:!px-6 md:!py-4 px-2 py-2 lg:!w-[30%]">    
                                                                    <button>
                                                                        {
                                                                            data.type === 'file' ?
                                                                                <Link href={data.link} target='_blank' className='flex gap-2 rounded-md PayOnline md:text-[12px] text-[10px]' >
                                                                                    <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px] md:block hidden' width={25} height={25} alt="" />
                                                                                    <p>ViewFile</p>
                                                                                </Link> :
                                                                                <Link href={data.link} prefetch={true} target='_blank' className='rounded-md flex PayOnline md:text-[12px] text-[10px]'>
                                                                                 {data.link ==='#'? 'Not Applicable': 'Click Here'}   
                                                                                </Link>
                                                                        }
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        }
                                                    </tbody>
                                                </table>

                                            </AccordionContent>
                                        ) : (

                                            <AccordionContent
                                                className='text-left md:text-lg text-sm'
                                                style={{ lineHeight: "1.8rem" }}
                                                dangerouslySetInnerHTML={{
                                                    __html: cgovern.SectionText,
                                                }}
                                            />
                                        )

                                    }
                                </AccordionPanel>
                            </Accordion>
                        </div>
                    );
                }
            })}

            <h4 className="text-left mb-4 mt-5 font-semibold lg:text-2xl md:text-lg text-[#ff0169]">
                Downloads
            </h4>
            <Accordion alwaysOpen>
                <AccordionPanel>
                    <AccordionTitle className='font-semibold p-[1.5rem] text-black'>
                        Download Links
                    </AccordionTitle>
                    <AccordionContent>
                        {corporateGoverence?.length > 0 ? corporateGoverence.map((cgovern, index) => {
                            if (!cgovern.IsSectionAccordion) {
                                return (
                                    <Accordion key={index}>
                                        <AccordionPanel>
                                            <AccordionTitle className='font-semibold p-[1.5rem] text-black md:text-lg text-sm'>
                                                Business Responsibility Report
                                            </AccordionTitle>
                                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                                {cgovern.BusinessReponsibilityReport.length > 0 ? cgovern.BusinessReponsibilityReport.map((files, index) => (
                                                    <div key={index} className=''>
                                                        <Link href={files.url} target='_blank'>
                                                            <p className="pdfHighlight flex gap-2 break-all mb-3 md:leading-10 sm:leading-8 xs:leading-6 text-[14px] sm:text-[14px] md:text-[16px] text-left m-0  rounded-md md:text-lg text-sm">
                                                                <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                                                &nbsp;{files.name.split(files.ext)[0]}
                                                                {files.caption ? <span className="pdfCaption">{files.caption}</span> : ""}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                )) : null}
                                            </AccordionContent>
                                        </AccordionPanel>

                                        <AccordionPanel>
                                            <AccordionTitle className='font-semibold p-[1.5rem] text-black'>
                                                Familiarization Programmes
                                            </AccordionTitle>
                                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                                {cgovern.FamiliarizationProgrammes.length > 0 ? cgovern.FamiliarizationProgrammes.map((files, index) => (
                                                    <div key={index} className='md:leading-10 sm:leading-8 xs:leading-6'>
                                                        <Link href={files.url} target='_blank'>
                                                            <div className="overflow-x-auto">
                                                                <p className="pdfHighlight text-wrap break-all text-[14px] sm:text-[14px] md:text-[16px] flex gap-2 mb-3 text-left m-0  hover:text-[#ff0169]">
                                                                    <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                                                    &nbsp;{files.name.split(files.ext)[0]}
                                                                    {files.caption ? <span className="pdfCaption">{files.caption}</span> : ""}
                                                                </p>
                                                            </div>

                                                        </Link>
                                                    </div>
                                                )) : null}
                                            </AccordionContent>
                                        </AccordionPanel>

                                        <AccordionPanel>
                                            <AccordionTitle className='font-semibold p-[1.5rem] text-black'>
                                                Letters
                                            </AccordionTitle>
                                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                                {cgovern.Letters.length > 0 ? cgovern.Letters.map((files, index) => (

                                                    <div key={index} className='md:leading-10 sm:leading-8 xs:leading-6'>
                                                        <Link href={files.url} target='_blank'>
                                                            <p className="pdfHighlight break-all text-left m-0 text-[14px] sm:text-[14px] md:text-[16px]  hover:text-[#ff0169] flex gap-3 mb-3">
                                                                <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                                                &nbsp;{files.name.split(files.ext)[0]}
                                                                {files.caption ? <span className="pdfCaption">{files.caption}</span> : ""}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                )) : null}
                                            </AccordionContent>
                                        </AccordionPanel>

                                        <AccordionPanel>
                                            <AccordionTitle className='font-semibold p-[1.5rem] text-black'>
                                                Disclosures
                                            </AccordionTitle>
                                            <AccordionContent style={{ paddingTop: "2rem" }}>
                                                {cgovern.Others.length > 0 ? cgovern.Others.map((files, index) => (
                                                    <div key={index} className='md:leading-10 sm:leading-8 xs:leading-6'>
                                                        <Link href={files.url} target='_blank'>
                                                            <p className="pdfHighlight break-all flex gap-3 mb-3 text-[14px] sm:text-[14px] md:text-[16px] text-left m-0  hover:text-[#ff0169]">
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
                                );
                            }
                        }) : null}
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div >
    );
};

export default CorporateGovernance;
