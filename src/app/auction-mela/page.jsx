import React from 'react'
import AuctionMela from './AuctionMela'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
  const title = "Auction Mela | Repco Home Loans";
  const description = "Repco Home Loans - Auction Mela";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
    return (
        <div className="max-w-[1280px] m-auto ">
            
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                // style={{ marginTop: "5rem" }}
                >
                    Auction Mela
                </h2>
            </div>
            <AuctionMela />
        </div>
    )
}

export default Page