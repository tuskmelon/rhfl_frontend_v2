import { contactUsApi } from '@/api/ContactUsApi'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import DOMPurify from 'dompurify';


export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Contact Us | Repco Home Loans";
    const description = "Contact Repco Home Loans for expert advice on home loans. Whether you have questions or need assistance, we're here to help!";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = async () => {

    let contactUsInfo = await contactUsApi()
    // console.log(contactUsInfo, "contactUsInfo");
    return (
        <div className="max-w-[1280px] m-auto ">

            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                // style={{ marginTop: "5rem" }}
                >
                    Contact Us
                </h2>
            </div>
            <div className="grid md:grid-cols-3 md:p-1 p-3 gap-4">

                <div className="">
                    <Image src="https://doc.repcohome.com/uploads/contact_us_2_36e9bbd40c.jpeg" alt="Contact Us Image" width={700} height={700} className="w-full m-auto  rounded-lg" />
                </div>


                <div className="col-span-2">
                    <div className="text-left  mb-8 md:text-lg text-sm  whitespace-pre-wrap mx-auto  ">
                        {contactUsInfo ? (
                            <div className="text-left w-fit mx-auto leading-6" dangerouslySetInnerHTML={{ __html: (contactUsInfo?.RepcoRegisteredOfficeAddress) }}></div>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                    <Link href="/apply-now" prefetch={true} className="bg-[#fdb515]  text-white md:text-lg text-sm mt-10 mb-5 border-none px-6 py-2 rounded-md">
                        Apply for Home Loan
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Page