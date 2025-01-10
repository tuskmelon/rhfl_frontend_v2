import Announcements from "@/components/Announcements/Announcements";
import { MetaTags } from '@/components/MetaTags'


export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
  const title = "Announcements | Repco Home Loans";
  const description = "Stay up-to-date with the latest announcements, updates, and news from Repco Home Loans.";

  const metaData = MetaTags({ title, description });

  return metaData;
}

const Page = () => {
  return <div>
    <Announcements />
  </div>;
};

export default Page;
