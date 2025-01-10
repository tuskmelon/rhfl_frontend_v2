import { handleSocialMediaLogo } from '@/api/LayoutApi'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const FooterSocialMedia = async () => {
    const SocialMedia = await handleSocialMediaLogo();
    // console.log(SocialMedia, "SocialMedia");
    return (
        <>
            {
                SocialMedia?.SocialIcons?.map((item, index) => (
                    <Link
                        href={item?.link || "#"}
                        target="_blank"
                        key={index}
                        className=' rounded-full p-1'
                        style={{border:"1px solid black"}}
                    >
                        <Image
                            src={
                                item?.img?.url
                            }
                            alt="Social Media Logo "
                            width={100}
                            height={100}
                            style={{
                                width: "1.25rem",
                                // marginRight: "1rem",
                                cursor: "pointer",
                                color: "transparent",
                            }}
                            className='m-auto'
                            loading="lazy"
                            decoding="async"
                        />
                    </Link>
                ))
            }

        </>
    )
}

export default FooterSocialMedia