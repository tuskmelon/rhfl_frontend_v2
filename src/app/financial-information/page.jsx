import Financial from '@/components/Financial/Financial'
import { MetaTags } from '@/components/MetaTags';
import React from 'react'

export async function generateMetadata() {
    const title = "Financial Information | Repco Home Loans";
    const description = "Repco Home Loans - Financial Information ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static';
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page =() => {
  return (
    <div><Financial/></div>
  )
}

export default Page