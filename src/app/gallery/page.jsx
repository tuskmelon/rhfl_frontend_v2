import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import GallerySection from './Gallery'
import { getGallery } from '@/api/GalleryApi';
import { MetaTags } from '@/components/MetaTags';

export async function generateMetadata() {
    const title = "Gallery | Repco Home Loans";
    const description = "Repco Home Loans - Gallery ";

    const metaData = MetaTags({ title, description });

    return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
    const galleryValue = await getGallery();
    return (
        <div className="max-w-[1280px] m-auto ">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Gallery
                </h2>
            </div>
            <GallerySection
                galleryValue={galleryValue}
            />
        </div>
    )
}

export default Page