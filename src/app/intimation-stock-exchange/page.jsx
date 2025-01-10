import Breadcrumbs from '@/components/Breadcrumbs'
import IntimationStockExchange from './IntimationStockExchange'
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Intimation to Stock Exchanges | Repco Home Loans";
    const description = "Repco Home Loans - Intimation to Stock Exchanges ";

    const metaData = MetaTags({ title, description });

    return metaData;
}
export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const pages = async () => {

    return (
        <div className="max-w-[1280px] m-auto ">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Intimation to Stock Exchanges
                </h2>
            </div>
            <IntimationStockExchange />
        </div>
    )
}

export default pages