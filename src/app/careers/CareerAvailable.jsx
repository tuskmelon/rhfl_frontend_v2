import { getCareerList } from '@/api/CareerApi';
import moment from 'moment';
import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Link from 'next/link';
// import { REACT_APP_BASE_URL } from '@/env/env';
import Image from 'next/image';

const CareerAvailable = async () => {
    try {
        let careerDetails = await getCareerList();
        // console.log(careerDetails, "careerDetails");

        const currentDate = moment();

        careerDetails = careerDetails?.filter((item) => {
            return moment(item.ToDate)?.isAfter(currentDate, 'day') && moment(item?.FromDate)?.isBefore(currentDate, 'day');
        });

        if (!careerDetails || careerDetails.length === 0) {
            return (
                <div className="text-center mt-10 mb-10">
                    <p className="text-lg text-gray-500">No career opportunities available at the moment.</p>
                </div>
            );
        }

        return (
            <Accordion className="mt-10 mb-10 md:m-1 m-4">
                {careerDetails.map((detail, index) => (
                    <AccordionPanel key={index} className="rounded-md focus:ring-0">
                        <AccordionTitle className="text-black md:text-lg text-sm">
                            {detail?.JobTitle}
                        </AccordionTitle>
                        <AccordionContent className="pt-10 pb-10">
                            <Link className="flex gap-3 md:!text-lg text-sm" href={detail?.NotificationDocument?.url || ""} target="_blank">
                                <p className="pdfHighlight text-left m-0 flex gap-3" style={{ width: "90%" }}>
                                    <Image
                                        src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                        className="max-h-[25px]"
                                        width={25}
                                        height={25}
                                        alt=""
                                    />
                                    &nbsp;Notification for {detail?.JobTitle} {detail?.NotificationDocument?.caption ? <span className="pdfCaption">{detail.NotificationDocument.caption}</span> : ""}
                                </p>
                            </Link>
                            {!detail?.ArchivedJob && detail?.BioDataForm && (
                                detail.ApplyOffline ? (
                                    <Link className="flex gap-3 md:!text-lg text-sm"
                                        href={detail?.BioDataForm?.url}
                                        target="_blank">
                                        <p className="pdfHighlight text-left m-0 flex gap-3" style={{ width: "90%" }}>
                                            <Image
                                                src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                                className="max-h-[25px]"
                                                width={25}
                                                height={25}
                                                alt=""
                                            />
                                            &nbsp;Download bio-data for the post of {detail?.JobTitle} {detail?.BioDataForm?.caption ? <span className="pdfCaption">{detail.BioDataForm.caption}</span> : ""}
                                        </p>
                                    </Link>
                                ) : (
                                    <p className="pdfHighlight text-left m-0 flex gap-3 md:!text-lg text-sm">
                                        <Image
                                            src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp"
                                            className="max-h-[25px]"
                                            width={25}
                                            height={25}
                                            alt=""
                                        />
                                        &nbsp;Fill the Online Application form for the post of {detail?.JobTitle}
                                    </p>
                                )
                            )}
                        </AccordionContent>
                    </AccordionPanel>
                ))}
            </Accordion>
        );
    } catch (error) {
        console.error("Error fetching career details:", error);
        return (
            <div className="text-center mt-10 mb-10">
                <p className="text-lg text-red-500">Failed to load career opportunities. Please try again later.</p>
            </div>
        );
    }
};

export default CareerAvailable;
