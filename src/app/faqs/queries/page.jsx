import Breadcrumbs from '@/components/Breadcrumbs'
// import QueriesAccordion from './QueriesAccordion';
import { handleQueries } from '@/api/FaqApi';
import FaqComponent from '@/components/FaqComponent';
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Queries FAQ | Repco Home Loans";
    const description = "Repco Home Loans - Queries FAQ ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    const faqQueries = await handleQueries();
    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <h2
                className="mb-5 mt-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.4rem]"
            // style={{ marginTop: "5rem" }}
            >
                FAQ - Queries / Complaints
            </h2>
            <FaqComponent
                queries={faqQueries}
            />
            {/* <QueriesAccordion /> */}

        </div>
    )
}

export default Page;
