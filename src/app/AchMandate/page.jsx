// 'use cache';
import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import '../AchMandate/e-Mandate.css'

import Image from 'next/image'
import Link from 'next/link'
import { MetaTags } from '@/components/MetaTags'
import AchMandate from './AchMandate'

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 3600; 
export const fetchCache = 'force-cache';
export async function generateMetadata() {
    const title = 'Ach Mandate | Repco Home Finance';
    const description = 'Ach Mandate | Repco Home Finance';

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = () => {
    return (
        <div className=' mb-8 max-w-[1280px] m-auto md:p-1 p-2 overflow-hidden'>

            <Breadcrumbs />
            <AchMandate />
        </div>
    )
}

export default Page