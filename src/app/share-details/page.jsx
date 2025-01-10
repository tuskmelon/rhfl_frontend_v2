import { MetaTags } from "@/components/MetaTags";
import SharePrice from "@/components/SharePrice/SharePrice";

export async function generateMetadata() {
  const title = "Share Details | Repco Home Loans";
  const description = "Repco Home Loans - Share Details ";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = () => {
  return (
    <div>
      <SharePrice />
    </div>
  );
}

export default Page;
