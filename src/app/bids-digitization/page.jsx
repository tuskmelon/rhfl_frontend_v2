import Breadcrumbs from "@/components/Breadcrumbs"
import BidsDigitization from "./BidsDigitization"
import { MetaTags } from "@/components/MetaTags";

export async function generateMetadata() {
  const title = "Bids Digitization | Repco Home Loans";
  const description = "Repco Home Loans - Bids Digitization";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
    return (
        <div className=' mb-8 max-w-[1280px] m-auto'>
           
            <Breadcrumbs />
            <h1 className="headings text-center mt-6 mb-4">Bids Digitization</h1>
            <BidsDigitization />
        </div>
    )
}

export default Page