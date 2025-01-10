'use client'

import React, { useState } from 'react'

const FormData = ({ tabs }) => {
    // const router = useRouter();
    // const token = sessionStorage.getItem('token')
    // useEffect(() => {
    //     if (!token) {
    //         router.push('/admin-login')
    //     }
    // }, [token]);

    const [tabSection, setTabSection] = useState("Repco Leads");
    return (
        <>

            <div className="mb-4 md:mt-8 mt-5  border-b border-[#fdb515] dark:border-gray-700">
                <ul className="grid   md:grid-cols-5 sm:grid-cols-1 -mb-px text-sm font-normal text-center" role="tablist">
                    {tabs.map((tab) => (
                        <li
                            key={tab.label}
                            className={`
                            md:me-2 md:ms-1 
                            ms-5 me-5     
                            text-base font-normal
                            ${tabSection === tab.label ? "bg-[#fdb515] text-white  md:rounded-t-lg   transition duration-100" : "text - black"}
                    `}

                        >
                            <button
                                className="inline-block p-4 border-[#fdb515] rounded-t-lg"
                                onClick={() => setTabSection(tab.label)}
                                role="tab"
                                aria-controls={tab.label}
                                aria-selected={tabSection === tab.label}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="default-tab-content">
                {tabs?.map((tab) => (
                    <div
                        key={tab.label}
                        className={`p-4 rounded-lg md:text-base text-xs bg-gray-50 dark:bg-gray-800 ${tabSection === tab.label ? "" : "hidden"}`}
                        id={tab.label}
                        role="tabpanel"
                        aria-labelledby={`${tab.label}-tab`}
                    >
                        {tab.component}
                    </div>
                ))}
            </div >
        </>
    )
}

export default FormData