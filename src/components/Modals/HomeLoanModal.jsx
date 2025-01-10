'use client'

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from 'react';

const HomeLoanModal = () => {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <div className='bg-[#ff0169] lg:p-[5rem] p-[3rem] cursor-pointer rounded-md font-semibold text-center'
                onClick={() => setOpenModal(true)}
            >
                <p className='text-white text-lg'>Home Loan Guide</p>
            </div>

            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-4 py-6">
                        <h3 className="md:text-2xl text-lg font-semibold text-gray-900 dark:text-white">Home Loan Guide</h3>
                        <p className="text-gray-700 dark:text-gray-300 md:text-lg text-sm">
                            Welcome to the Home Loan Guide. Whether you're a first-time buyer or an experienced homeowner, this guide will help you navigate the process and maximize your benefits.
                            Please explore the following links to learn more:
                        </p>

                        <ul className="space-y-3 list-disc ">
                            <li>
                                <Link href="/faqs/home-loan-tax-benefits" prefetch={true}>
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Tax Benefits
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faqs/home-loan-process" prefetch={true}>
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Home Loan Process at RHFL
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faqs/home-loan-supporting-doc" prefetch={true}>
                                    <p className="text-[#ff0169] hover:text-[#a81a39] font-medium">
                                        Supporting Documents (RH-3)
                                    </p>
                                </Link>
                            </li>
                        </ul>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Need assistance? Please feel free to reach out to our support team for more information.
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default HomeLoanModal;
