import { getInvestorsTDS } from '@/api/InvestorsApi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import { REACT_APP_BASE_URL } from '@/env/env';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata() {
    const title = "TDS on Dividend | Repco Home Loans";
    const description = "Repco Home Loans - TDS on Dividend ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page =async () => {
    let TDSonDividend = [];
    let error = null;

    try {
        TDSonDividend = await getInvestorsTDS();
    } catch (err) {
        console.error("Error fetching TDS on Dividend data:", err);
        error = "Failed to load TDS on Dividend data. Please try again later.";
    }

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    TDS on Dividend
                </h2>
            </div>
            <div className="shadow-xl bg-white rounded-xl p-10 mb-5 md:m-1 m-4">
                {error ? (
                    <div className="text-center">
                        <p className="text-lg text-red-500">{error}</p>
                    </div>
                ) : TDSonDividend?.[0]?.TDSonDividend?.length > 0 ? (
                    TDSonDividend[0]?.TDSonDividend.map((tds, index) => (
                        <Link
                            className="pdfHighlight-line-space text-left"
                            key={index}
                            target="_blank"
                            href={tds?.url}
                        >
                            <p className="text-[#011419] flex md:text-lg text-sm gap-4 mb-5 hover:text-[#ff0169]">
                                {/* <Image
                                    src={'/uploads/vscode_icons_file_type_pdf2_2_04f50ba11e.png'}
                                    className="max-h-[25px]"
                                    width={25}
                                    height={25}
                                    alt=""
                                /> */}
                                <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                &nbsp;{(tds?.name)?.split(tds?.ext)[0]}
                                {tds.caption ? (
                                    <span className="pdfCaption">{tds.caption}</span>
                                ) : (
                                    ""
                                )}
                            </p>
                        </Link>
                    ))
                ) : (
                    <div className="text-center">
                        <p className="text-lg text-gray-500">No TDS on Dividend data available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
