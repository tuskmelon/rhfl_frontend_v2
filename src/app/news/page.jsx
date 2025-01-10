import { MetaTags } from "@/components/MetaTags";
import News from "./News";
import "./News.css"
import Breadcrumbs from "@/components/Breadcrumbs";

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
  const title = "News Updates | Repco Home Loans";
  const description = "Repco Home Loans - News Updates ";

  const metaData = MetaTags({ title, description });

  return metaData;
}
const Page =() => {
  return (
    <>
      <div className="max-w-[1280px] m-auto ">
        <Breadcrumbs />
        <div className="newupdatebg flex items-center justify-center">
          <h2
            className=" mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
            style={{ marginTop: "5rem" }}
          >
            News Updates!
          </h2>
        </div>
        <News />
      </div>
    </>
  );
};

export default Page;
