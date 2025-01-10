import { Head } from 'next/head';
import moment from "moment";
import "./Blogs.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogList } from "@/api/BlogApi";
import { MetaTags } from '@/components/MetaTags';



export async function generateMetadata({ params }) {
  const { 'blog-details': blogDetails } = params;
  const data = await blogList(blogDetails);

  return {
    title: blogDetails,
    description: data[0]?.Seo?.description,
    openGraph: {
      type: "website",
      title: blogDetails,
      description: data[0]?.Seo?.description,
      images: ['https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_repcohome_logo_7c80641cfb_ef59cbb762.png'],
    },
  };
}


const Page = async ({ params }) => {
  const blogDetails =  params['blog-details'];
  const data = await blogList(blogDetails);

  // console.log(data, "data");

  if (!data || data?.length === 0) {
    return <div>Blog not found</div>;
  }



  // Get metadata object from generateMetadata
  // const metadata = await generateMetadata(blogDetails, data[0]?.Seo?.description);

  return (
    <>
      {/* <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="../../assets/repcologo.png" />
      </Head> */}

      <div className="max-w-[1280px] m-auto">
        <Breadcrumbs />
        <div
          className="BlogCard my-3 p-4 bg-white rounded-[.25rem] overflow-hidden shadow-[0_13px_27px_-5px_hsla(240,30.1%,28%,0.25),0_8px_16px_-8px_hsla(0,0%,0%,0.3),0_-6px_16px_-6px_hsla(0,0%,0.03)] transition-all ease-[ease] duration-200"
        >
          <h1 className="text-center py-5 text-[#ff0169] md:text-[2.75rem] text-[1.5rem] font-medium">{data[0]?.Title}</h1>
          <img
            width={"100%"}
            src={data[0]?.Featured_img?.url || "#"}
            alt={`Image for ${data[0]?.Title}`}
            className="object-cover min-h-80"
          />
          <p className="py-4 font-semibold text-[1.5rem]">
            Published On - <span className="font-normal">{moment(data[0]?.date).format("MMMM Do YYYY")}</span>
          </p>
          <div
            className="blog_details"
            dangerouslySetInnerHTML={{
              __html: data[0]?.Description1 || "Loading..."
            }}
          />
        </div>
      </div>
    </>
  );
};


export default Page;

