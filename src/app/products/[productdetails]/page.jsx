import { handleSpecificProductData } from "@/api/HomePageApi";
import Product from "../../../components/Products/Product";

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60;
export const fetchCache = 'force-cache';
export async function generateMetadata({ params }) {
  let { productdetails } = await params;
  // const data = await blogList(blogDetails);

  let productList = await handleSpecificProductData(productdetails);

  // console.log("productList", productList);

  return {
    title: productList[0]?.Seo?.title,
    description: productList[0]?.Seo?.description,
    openGraph: {
      type: "website",
      title: productList[0]?.Seo?.title,
      description: productList[0]?.Seo?.description,
      images: ['https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_repcohome_logo_7c80641cfb_ef59cbb762.png'],
    },
  };
}

const Page = async ({ params }) => {
  let { productdetails } = await params;

  return (
    <>
      <div className="">
        <Product
          productdetails={productdetails}
        />
      </div>
    </>
  );
};

export default Page;
