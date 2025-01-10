import { MetaTags } from "@/components/MetaTags";
import Blogs from "./Blogs";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogCarousel } from "@/api/BlogApi";

export async function generateMetadata() {
  const title = "Blogs | Repco Home Loans";
  const description = "Repco Home Loans - Blogs";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60;
export const fetchCache = 'force-cache';

const Page = () => {
  // let data = await blogCarousel()
  return (
    <div className="max-w-[1280px] m-auto">

      <Breadcrumbs />
      <h2
        className=" mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
      // style={{ marginTop: "5rem" }}
      >
        Blogs
      </h2>
      <Blogs
      />
    </div>
  );
};

export default Page;
