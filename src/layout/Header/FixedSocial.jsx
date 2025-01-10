import { handleFixedSocialMedia } from '@/api/LayoutApi'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const FixedSocial = async () => {
    const socialMediaFixed = await handleFixedSocialMedia();
    return (
        <>
            {
                socialMediaFixed?.SocialIconsFloat?.map((item, index) => (

                    <li className={'rounded-md '} style={{ backgroundColor: item.bgColor }} key={index} >
                        <Link href={item.link || "#"} target="_blank">
                            {
                                item?.img?.url && (
                                    <Image
                                        className='hover:scale-90 transition-all ease-in-out duration-300'
                                        style={{ width: "1.9rem" }}
                                        src={item?.img?.url || null}
                                        width={30}
                                        height={30}
                                        alt="Social Media Links"
                                    />
                                )
                            }
                        </Link>
                    </li>
                ))
            }
        </ >
    )
}

export default FixedSocial