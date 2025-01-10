'use client'
import { REACT_APP_BASE_URL } from '@/env/env';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react'
import Link from 'next/link';

const Product_TabSection = ({ productList, downloadDetails }) => {

    const [tabSection, setTabSection] = useState("Features");
    console.log(downloadDetails, "tabSection", productList[0]?.ProductFeatures);

    return (
        <div className="max-w-[1380px] m-auto bg-[#FCFCFC] mt-10">
            <div className="pt-1">
                <div className="mb-4 mt-4  m-5 bg-[#FFF9EA] rounded-xl border-[#fdb515] dark:border-gray-700">
                    <ul
                        className="grid flex-wrap md:grid-cols-4  -mb-px text-sm font-medium text-center  m-5"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li
                            className={`me-2 m-3 text-lg font-medium ${tabSection === "Features"
                                ? " bg-[#fdb515]  text-white  rounded-2xl transition duration-100 cursor-pointer"
                                : "text-[#8C8B8B]  border border-[#CECECE] rounded-2xl"
                                }`}
                            onClick={() => setTabSection("Features")}
                            role="presentation"
                        >
                            <button
                                className={`inline-block  m-3 text-lg `}

                            >
                                Features
                            </button>
                        </li>
                        <li
                            className={`me-2 m-3 text-lg font-medium ${tabSection === "Eligibility"
                                ? " bg-[#fdb515] text-white  rounded-2xl transition duration-100 cursor-pointer"
                                : "text-[#8C8B8B]  border border-[#CECECE] rounded-2xl cursor-pointer"
                                }`}
                            onClick={() => setTabSection("Eligibility")}
                            role="presentation"
                        >
                            <p
                                className={`inline-block  m-3 text-lg `}

                            >
                                Eligibility
                            </p>

                        </li>
                        <li
                            className={`me-2 m-3 text-lg font-medium ${tabSection === "Interest"
                                ? " bg-[#fdb515]  text-white  rounded-2xl transition duration-100 cursor-pointer"
                                : "text-[#8C8B8B]  border border-[#CECECE] rounded-2xl"
                                }`}
                            onClick={() => setTabSection("Interest")}
                            role="presentation"
                        >
                            <button
                                className={`inline-block  m-3 text-lg `}

                            >
                                Interest Rates and Fees
                            </button>

                        </li>
                        <li
                            className={`me-2 m-3 text-lg font-medium ${tabSection === "Document Required"
                                ? " bg-[#fdb515] text-white  rounded-2xl transition duration-100 cursor-pointer"
                                : "text-[#8C8B8B]  border border-[#CECECE] rounded-2xl"
                                }`}
                            role="presentation"
                            onClick={() => setTabSection("Document Required")}
                        >
                            <button
                                className={`inline-block  m-3 text-lg `}

                            >
                                Document Required
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="default-tab-content" className="p-md-5 p-2">
                    {tabSection === "Features" ? (
                        <div
                            className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            <h3 className="leading-8 text-[0.9rem] ps-md-10 ps-5">
                                {
                                    productList[0]?.ProductFeatures?.length > 0 ? (
                                        <div
                                            className="list-disc liEnable"
                                            dangerouslySetInnerHTML={{
                                                __html: productList
                                                    ? productList[0]?.ProductFeatures
                                                    : "Loading...",
                                            }}
                                        ></div>
                                    ) : (
                                        <p className="text-[#FF0169] font-semibold text-xl text-center">No data</p>
                                    )
                                }

                            </h3>
                        </div>
                    ) : tabSection === "Eligibility" ? (
                        <div
                            className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                            id="dashboard"
                            role="tabpanel"
                            aria-labelledby="dashboard-tab"
                        >
                            <h3 className="leading-8 text-[0.9rem] liEnable ps-10">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: productList
                                            ? productList[0]?.ProductEligibility
                                            : "Loading...",
                                    }}
                                ></div>
                            </h3>
                        </div>
                    ) : tabSection === "Interest" ? (
                        <div
                            className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ps-10"
                            id="settings"
                            role="tabpanel"
                            aria-labelledby="settings-tab"
                        >
                            {" "}
                            <div className='leading-6'>
                                {
                                    downloadDetails?.map((item, index) => (
                                        item?.documentId === "ewgshg65s122ekxwt3x7n5g5" &&
                                        item?.DownloadItems?.map((file, index) => (
                                            <p key={index}>Rate of interest starts from <span className='font-medium text-[#FF0169]'><Link href={file?.url}>Click Here</Link> </span></p>
                                        ))
                                    ))
                                }
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: productList
                                        ? productList[0]?.ProductInterestRatesAndFees
                                        : "Loading...",
                                }}
                                className="leading-6"
                            ></div>
                            <div className="leading-6 ">
                                {downloadDetails?.length > 0 && downloadDetails?.id === 5 ? downloadDetails.DownloadItems.map((file, index) => {
                                    return (
                                        <span key={index} className="mt-3" style={{ display: 'inline' }}>
                                            Rate of interest starts from&nbsp;
                                            <a target="_blank" rel="noreferrer" href={file.url}>
                                                <span style={{ color: "#ffa500" }}>Click Here</span>
                                            </a>.&nbsp;
                                        </span>
                                    )
                                }) : null}
                                {downloadDetails?.length > 0
                                    ? downloadDetails.map((downloads, index) =>
                                        downloads.DownloadItems.length > 0
                                            ? downloads.DownloadType === "Schedule of Charges"
                                                ? downloads.DownloadItems.map((file, index) => (
                                                    <div key={index}>

                                                        <p className="mt-3" key={index}>
                                                            <Link
                                                                target="_blank"
                                                                href={file?.url}
                                                            >
                                                                <FontAwesomeIcon
                                                                    style={{ color: "red" }}
                                                                    icon={faFilePdf}
                                                                ></FontAwesomeIcon>{" "}
                                                                &nbsp;
                                                                {file.name}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                ))
                                                : null
                                            : null
                                    )
                                    : null}{" "}
                            </div>
                        </div>
                    ) : tabSection === "Document Required" ? (
                        <div
                            className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                            id="contacts"
                            role="tabpanel"
                            aria-labelledby="contacts-tab"
                        >
                            <div
                                className="Documents-Required"
                                dangerouslySetInnerHTML={{
                                    __html: productList
                                        ? productList[0]?.DocumentsRequired
                                        : "Loading...",
                                }}
                            ></div>
                        </div>
                    ) : (
                        "Loading"
                    )}
                </div>
            </div>
        </div>
    )
}

export default Product_TabSection