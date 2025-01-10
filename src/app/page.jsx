import Banner from "@/components/Home/Banner/Banner";
import HomeLoanCalculator from "@/components/Home/Calculator/HomeLoanCalculator";
import DocumentsList from "@/components/Home/DocumentsList/DocumentsList";
import Products from "@/components/Home/Products/Products";
import ReachUs from "@/components/Home/ReachUs/ReachUs";
import Stats from "@/components/Home/Stats/Stats";
import Updates from "@/components/Home/NewsUpdate/Updates";

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
  return (
    <>
      <Banner />
      <Updates />
      <DocumentsList />
      <HomeLoanCalculator />
      <Products />
      <ReachUs />
      <Stats />
    </>
  )
};

export default Page;
