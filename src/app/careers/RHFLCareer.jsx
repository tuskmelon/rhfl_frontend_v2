import React from 'react'
import { Accordion, AccordionTitle, AccordionPanel, AccordionContent } from 'flowbite-react';
import Link from 'next/link';
import { getRHFLCareer } from '@/api/CareerApi';

const RHFLCareer = ({ response }) => {

    // console.log(response, "response");
    return (
        <Accordion className='mt-5 mb-10 md:m-1 m-4'>
            <AccordionPanel>
                <AccordionTitle className="acc-togl border-none md:text-lg text-sm text-left font-medium">
                    CAREERS IN REPCO HOME FINANCE LIMITED
                </AccordionTitle>

                <AccordionContent>
                    <div style={{ marginTop: '30px' }}>
                        {
                            response?.map((item, index) => (
                                <Accordion key={index} className='mb-4'>
                                    <AccordionPanel>
                                        <AccordionTitle className="acc-togl border-none md:text-lg text-sm text-left font-medium text-black" >
                                            {item?.title}
                                        </AccordionTitle>

                                        <AccordionContent>
                                            {
                                                item?.subTitle &&
                                                <h4 className='lg:text-2xl md:text-lg  mb-4 mt-4'>{item?.subTitle}</h4>
                                            }

                                            {
                                                item?.Accordian &&
                                                item?.Accordian.map((subMenu, index1) => (
                                                    < Accordion collapseAll key={index1} className='mb-3'>
                                                        <AccordionPanel>
                                                            <AccordionTitle className="acc-togl border-none md:text-lg text-sm text-left font-medium text-black ">
                                                                {subMenu?.title}
                                                            </AccordionTitle>

                                                            <AccordionContent
                                                                dangerouslySetInnerHTML={{
                                                                    __html: subMenu?.content
                                                                }}
                                                            >
                                                                {/* <ol className="leading-10 list-decimal list-inside">
                                                                    <li>Age not exceeding 25 years (relaxation for few years can be considered based on commensurate and relevant prior experience).</li>
                                                                    <li>Preference will be given for experience in HFCs/ Banks/ FIs/ NBFCs in Home Loan.</li>
                                                                    <li>For the position of Assistant Manager, minimum 3 years of prior experience is mandatory.</li>
                                                                </ol> */}
                                                            </AccordionContent>
                                                        </AccordionPanel>
                                                    </Accordion>
                                                ))
                                            }
                                        </AccordionContent>
                                    </AccordionPanel>
                                </Accordion>
                            ))
                        }
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion >
    )
}

export default RHFLCareer