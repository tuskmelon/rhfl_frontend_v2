'use client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import { Tabs } from "flowbite-react";
import Link from 'next/link';
import Image from 'next/image';

const TabSection = ({ response }) => {

    // console.log(response, "response");

    useEffect(() => {
        if (response) {
            fetchNotices(response);
        }
    }, [response]);

    const [activeTab, setActiveTab] = useState("TamilNadu")
    const [stateList, setStateList] = useState([])
    const [fileList, setFileList] = useState([]);

    const fetchNotices = async (response) => {
        try {

            const activeNotices = response.filter((notice) =>
                moment().isBetween(notice.StartDate, notice.EndDate)
            );

            const uniqueStates = [...new Set(activeNotices.map((notice) => notice?.State))];
            // console.log(uniqueStates, "uniqueStates");
            setStateList(uniqueStates);

            const stateWiseList = uniqueStates?.map((state) =>
                activeNotices?.filter((notice) => notice.State === state)
            );

            // console.log(stateWiseList, "stateWiseList");

            setFileList(stateWiseList);
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const handleTabClick = (state) => {
        setActiveTab(state);
    };

    const getActiveStateFiles = () => {
        if (!activeTab) return null;

        const stateIndex = stateList.indexOf(activeTab);
        return fileList[stateIndex] || [];
    };

    return (
        <div className="grid md:grid-cols-3 bg-white rounded-lg shadow-xl p-4">
            <div className='pe-5'>
                {stateList?.map((item, index) => (
                    <div
                        className={`p-2 m-2 cursor-pointer font-medium  rounded-lg  ${activeTab === item ? "bg-[#FFB200] text-white  rounded-lg" : "hover:bg-gray-200"}`}
                        onClick={() => handleTabClick(item)}
                        key={index}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div className="col-span-2 md:border-l md:border-l-[#FFB200] p-4">
                {activeTab ? (
                    <div>
                        <h3 className="text-xl font-bold mb-4">Notices for {activeTab}</h3>
                        {getActiveStateFiles()?.length > 0 ? (
                            getActiveStateFiles()?.map((file, index) => (
                                <div key={index} className="mb-2">
                                    <Link
                                        className="text-black flex  gap-3 mb-3  hover:underline hover:text-[#FFB200]"
                                        target="_blank"
                                        href={file?.AuctionNotice?.url}
                                        rel="noopener noreferrer"
                                    >

                                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                        {(file?.AuctionNotice?.name).split('_').slice(0, -1).join(' ')}
                                        {file.AuctionNotice.caption && (
                                            <span className="ml-2 text-sm text-gray-500">
                                                {file.AuctionNotice.caption}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No Auction Sale Notices for this state.</p>
                        )}
                    </div>
                ) : (
                    <p>Select a state to view notices.</p>
                )}
            </div>
        </div>
    )
}

export default TabSection