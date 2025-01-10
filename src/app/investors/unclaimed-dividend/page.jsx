import { getInvestorsUnclaimedDividends } from '@/api/InvestorsApi'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export async function generateMetadata() {
    const title = "Unclaimed Dividend | Repco Home Loans";
    const description = "Repco Home Loans - Unclaimed Dividend ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page =async () => {
    let unclaimedDividend = await getInvestorsUnclaimedDividends()

    return (
        <div className="max-w-[1280px] m-auto ">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Unclaimed Dividend
                </h2>
            </div>
            <div className=' bg-white rounded-xl md:p-10 p-5 mb-5  md:m-1 m-4' style={{ boxShadow: ' rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                {
                    unclaimedDividend?.map((dividend, index) => (
                        <Link className="pdfHighlight-line-space text-left" key={index} target="_blank" href={ dividend.UnclaimedDividend.url}>
                            <p className="text-[#011419] flex gap-4 md:text-lg text-sm mb-5 hover:text-[#ff0169]">
                                <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />

                                &nbsp;{(dividend.UnclaimedDividend.name).split(dividend.UnclaimedDividend.ext)[0]}
                                {dividend.UnclaimedDividend.caption ? <span className="pdfCaption">{dividend.UnclaimedDividend.caption}</span> : ""}
                            </p>
                        </Link>
                    ))
                }

            </div>

        </div>
    )
}

export default Page