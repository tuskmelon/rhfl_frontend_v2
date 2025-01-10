
"use client";

import { Button, Modal } from "flowbite-react";
import moment from "moment";

export function CalculationModal({ openModal, setOpenModal, filteredValue, year, divide }) {

    console.log(moment(filteredValue[0]?.paymentDate, "MM/DD/YYYY", true).isValid(), typeof filteredValue[0]?.paymentDate, "filteredValue", filteredValue);
    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="md:text-lg text-sm">Monthly Amortization for the year {year} </Modal.Header>
                <Modal.Body >
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ maxHeight: "30rem" }}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="md:px-6 md:py-4 sm:px-3 sm:py-2 xs:py-2 xs:px-2">
                                        Month
                                    </th>
                                    <th scope="col" className="md:px-6 md:py-4 sm:px-3 sm:py-2 xs:py-2 xs:px-2">
                                        Principal Payment
                                    </th>
                                    <th scope="col" className="md:px-6 md:py-4 sm:px-3 sm:py-2 xs:py-2 xs:px-2">
                                        Interest Payment
                                    </th>
                                    <th scope="col" className="md:px-6 md:py-4 sm:px-3 sm:py-2 xs:py-2 xs:px-2">
                                        Amount to be paid every Month
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredValue?.map((item, index) => (

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    divide
                                                        ? moment(`${item?.paymentDate}-01-${item?.paymentYear}`, "MM-01-YYYY", true).isValid()
                                                            ? moment(`${item?.paymentDate}-01-${item?.paymentYear}`, "MM-01-YYYY").format('MMMM')
                                                            : "Invalid Date"
                                                        : item?.paymentMonth
                                                }
                                            </th>
                                            <td className="px-6 py-4">
                                                {divide ? (item.principalPaymentRounded / 100).toFixed(2) : (item.principalPaymentRounded).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {divide ? (item.interestPaymentRounded / 100).toFixed(2) : (item.interestPaymentRounded).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {divide ? (item.payment / 100).toFixed(2) : (item.payment).toFixed(2)}
                                            </td>

                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}
