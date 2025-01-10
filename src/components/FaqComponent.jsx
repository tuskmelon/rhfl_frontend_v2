import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

const FaqComponent = ({ queries = [] }) => {
    console.log(queries, "queries");
    return (
        <div className="mt-10 mb-10 md:m-1 m-4">
            {queries?.length > 0 ? (
                <Accordion>
                    {queries[0]?.Accordian?.map((item, index) => (
                        <AccordionPanel key={index} className="rounded-md focus:ring-0">
                            <AccordionTitle className="text-black md:text-lg text-sm">
                                {item?.title}
                            </AccordionTitle>   
                            <AccordionContent className="pt-10 pb-10">
                                <div
                                    className="mb-2 text-[#212529] md:text-lg text-sm new_text_ol dark:text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: item?.content || "Loading...",
                                    }}
                                />
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center">
                    <p className="text-lg text-gray-500">No FAQs available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default FaqComponent;
