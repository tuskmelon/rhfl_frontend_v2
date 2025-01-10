import React from 'react'
import HeaderLogo from './HeaderLogo'
import Link from 'next/link'
import MobileHeader from './MobileHeader'
import HeaderPercentage from './HeaderPercentage'

const MobileHeader1 = ({ productList, headerLogo }) => {
    return (
        <header
            id="header"
            className={` top-0 lg:hidden  block transition-[top] duration-300 z-40 `}
        >
            <div className="bg-[#ff0169]">
                <h2
                    className="m-0 text-center font-medium text-white  md:text-[14px] text-[10px] leading-5"
                >
                    <HeaderPercentage />
                </h2>
            </div>
            <div id="">
                <div className=" transition-all duration-300 shadow-md">
                    <div className="">
                        <div className="flex justify-between items-center ps-4 pe-4">
                            <div>
                                <Link prefetch={true} href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <HeaderLogo
                                        headerLogo={headerLogo}
                                    />
                                </Link>
                            </div>
                            <MobileHeader
                                headerLogo={headerLogo}
                                productList={productList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default MobileHeader1