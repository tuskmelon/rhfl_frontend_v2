'use client'

import Link from 'next/link';
import React, { useState } from 'react'

const SubMenu1 = () => {
    const [isOpen, setIsOpen] = useState(false);
    // console.log(isOpen, "isOpen");
    return (
        <> <li className="relative group">
            <button className="navHeadli py-2 text-sm text-gray-600 flex items-center rounded md:hover:text-[#FF0169]" onMouseEnter={() => setIsOpen(true)}>
                Customer Relation
                <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute min-w-[200px] top-full  left-0 right-0 hidden group-hover:block rounded-b-[10px]  rounded z-10">
                    <div className="mt-3 bg-transparent">
                    </div>
                    <ul className="text-sm bg-white m-auto  border-t-[1px] border-[#ff0169]  text-gray-700 shadow-md rounded-b-[10px] dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                        <li>
                            <Link
                                prefetch={true}
                                href="/AchMandate"
                                onClick={() => { setIsOpen(false); }}
                                className="flex flex-nowrap items-center justify-center px-4 text-center py-4 font-medium rounded-t-none rounded-b-[10px] hover:text-white hover:bg-[#FF0169] dark:hover:bg-white dark:hover:text-white whitespace-nowrap"
                            >
                                NACH-E-Mandate
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </li></>
    )
}

export default SubMenu1