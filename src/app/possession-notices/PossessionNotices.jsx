import { getPossessionNotices } from '@/api/PossessionNoticeApi';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Image from 'next/image';



const PossessionNotices = async () => {
    try {
        
        const Possession_Notice = await getPossessionNotices();

        
        if (!Possession_Notice || Possession_Notice.length === 0) {
            return (
                <div className="text-center mt-10 mb-10">
                    <p className="text-lg text-gray-500">No possession notices available at the moment.</p>
                </div>
            );
        }

        return (
            <Accordion className="mt-10 md:m-1 m-4">
                {Possession_Notice.map((possession, index) => (
                    <AccordionPanel key={index} className="rounded-md focus:ring-0">
                        <AccordionTitle className="text-black md:text-lg text-sm">
                            {possession.title}
                        </AccordionTitle>
                        <AccordionContent className="pt-10 pb-10">
                            <div className="mb-2 text-gray-500 dark:text-gray-400">
                                {possession.pdf?.length > 0 ? (
                                    possession.pdf.map((idocs, docIndex) => (
                                        <Link
                                            key={docIndex}
                                            href={idocs.url}
                                            target="_blank"
                                            className="flex gap-3 items-center"
                                            rel="noopener noreferrer"
                                        >
                                            <Image
                                                src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                className="max-h-[25px]"
                                                width={25}
                                                height={25}
                                                alt="PDF Icon"
                                            />
                                            <span className="leading-7 md:text-lg text-sm">
                                                {idocs.name}
                                            </span>
                                        </Link>
                                    ))
                                ) : (
                                    "No PDFs available"
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                ))}
            </Accordion>
        );
    } catch (error) {
        console.error("Error fetching possession notices:", error);
        return (
            <div className="text-center mt-10 mb-10">
                <p className="text-lg text-red-500">Failed to load possession notices. Please try again later.</p>
            </div>
        );
    }
};

export default PossessionNotices;
