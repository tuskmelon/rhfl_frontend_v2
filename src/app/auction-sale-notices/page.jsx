import Breadcrumbs from "@/components/Breadcrumbs"
import AuctionSaleNotices from "./AuctionSaleNotices"
import { MetaTags } from "@/components/MetaTags";


export async function generateMetadata() {
  const title = "Auction Sale Notices | Repco Home Loans";
  const description = "Repco Home Loans - Auction Sale Notices";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
  return (
    <div className=' pb-8 max-w-[1280px] md:!m-auto m-4'>
      <Breadcrumbs />
      <h1 className="headings text-center mt-6 mb-4">Auction Sale Notices</h1>
      <AuctionSaleNotices />
    </div>
  )
}

export default Page