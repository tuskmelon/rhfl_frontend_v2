import Breadcrumbs from "@/components/Breadcrumbs";
import CorporateGovernance from "./CorporateGovernance";
import { MetaTags } from "@/components/MetaTags";


export async function generateMetadata() {
  const title = "Corporate Governance | Repco Home Loans";
  const description = "Corporate Governance";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static';
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
  return <div className="max-w-[1280px] m-auto">

    <Breadcrumbs />
    <h2
      className=" mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem] mt-5"
    // style={{ marginTop: "5rem" }}
    >
      Corporate Governance
    </h2>

    <CorporateGovernance />
  </div>;
};

export default Page;
