'use client'

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from 'react';

const HeaderModal = () => {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <div className='PayOnline block truncate py-2 text-sm cursor-pointer text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                onClick={() => setOpenModal(true)}
            >
                Pay Online
            </div>

            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-2 py-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">By clicking on the 'Pay Online', you will be leaving repcohome.com and entering website operated by third parties (online.sbi). Repco Home Finance Ltd does not control or endorse such websites, and bears no responsibility for them</h3>
                        <div className="flex justify-between items-center">
                            <Link href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=928381" target="_blank" className=' block py-2 px-3 text-sm cursor-pointer bg-[#fdb515] text-white rounded hover:bg-[#fdb515]   dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                onClick={() => setOpenModal(false)}
                            >
                                Pay Online
                            </Link>
                            <div className=' block py-2 px-3 text-sm cursor-pointer bg-[#ff0169] text-white rounded-md   dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                onClick={() => setOpenModal(false)}
                            >
                                Close
                            </div>

                        </div>
                        {/* <p className="text-gray-700 dark:text-gray-300">
                            Welcome to the Home Loan Guide. Whether you're a first-time buyer or an experienced homeowner, this guide will help you navigate the process and maximize your benefits.
                            Please explore the following links to learn more:
                        </p>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/faqs/home-loan-tax-benefits">
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Tax Benefits
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faqs/home-loan-process">
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Home Loan Process at RHFL
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faqs/home-loan-supporting-doc">
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Supporting Documents (RH-3)
                                    </p>
                                </Link>
                            </li>
                        </ul>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Need assistance? Please feel free to reach out to our support team for more information.
                        </p> */}
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default HeaderModal