'use client'
import { REACT_APP_BASE_URL } from "@/env/env";
import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import Link from "next/link";



const GallerySection = ({ galleryValue }) => {
    // Dynamic mode (current implementation)
    const processedGallery = galleryValue?.map((album) => {
        const firstImage = album.AlbumImages[0];
        return {
            id: album.id,
            src: (firstImage.formats?.medium?.url || firstImage.url),
            albumName: album.AlbumName,
            images: album.AlbumImages.map((img) => ({
                src: (img.formats?.large?.url || img.url),
                caption: album.AlbumName,
            })),
        };
    });

    // console.log(processedGallery, "processedGallery");

    return (
        <div className="mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedGallery?.map((album) => (
                    <div key={album?.id} className="flex flex-col items-center">
                        {/* Dynamic Mode: Uses dynamicEl prop */}
                        {/* <LightGallery
                            plugins={[lgZoom, lgVideo]}
                            speed={500}
                            dynamic  // This is key
                            dynamicEl={album?.images}
                        >
                            <img
                                src={album?.src}
                                alt={album?.albumName}
                                className="w-full max-w-sm rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
                            />
                        </LightGallery> */}

                        <LightGallery
                            plugins={[lgZoom, lgVideo]}
                            speed={500}
                        >
                            {album.images.map((img, index) => (
                                <Link
                                    key={index}
                                    href={img.src}
                                    data-caption={img.caption}
                                >
                                    {index === 0 && (
                                        <img
                                            src={img.src}
                                            alt={album.albumName}

                                            className="w-full max-w-sm rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
                                        />
                                    )}
                                </Link>
                            ))}
                        </LightGallery>

                        <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center mt-3">
                            {album.albumName}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GallerySection;
