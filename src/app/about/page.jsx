import { MetaTags } from '@/components/MetaTags'
import About from "./About";
export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';
export async function generateMetadata() {
  const title = 'About Page | Repco Home Finance';
  const description = 'About  | Repco Home Finance';

  const metaData = MetaTags({ title, description });

  return metaData;
}
const Page = () => {
  return (
    <div>

      <About />
    </div>
  );
};

export default Page;
