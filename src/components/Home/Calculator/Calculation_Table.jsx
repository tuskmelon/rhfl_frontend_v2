'use client';
import React, { useState } from 'react'
import { CalculationModal } from '@/components/Modals/CalculationModal';

const Calculation_Table = ({ monthlyAmortizationDetails, amortizationDetails, formatValue, eligibleEMI }) => {
    //console.log(amortizationDetails, "monthlyAmortizationDetails", monthlyAmortizationDetails, "amortizationDetails");
    const [openModal, setOpenModal] = useState(false);
    const [filteredValue, setFilteredValue] = useState([]);
    const [year, setYear] = useState("")

    const handleTablePopUp = (year) => {
        const filteredData = monthlyAmortizationDetails
            .map((item) => item.paymentYear == year && item)
            .filter(Boolean);
        setFilteredValue(filteredData)
        setYear(year)
        setOpenModal(true)
        //console.log(filteredData, "monthlyAmortizationDetails");
    }

    // console.log(filteredValue, "filteredValue", amortizationDetails);


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 md:m-1 m-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="md:text-base sm:text-sm  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="md:!px-6 md:py-3 sm:px-3 sm:!py-1 !py-2 !px-2 font-medium rounded-tl-lg ">
                            No
                        </th>
                        <th scope="col" className="md:px-6 md:py-3 sm:px-3 sm:py-1 py-2 px-2 font-medium">
                            <div className="flex items-center">
                                Principal Payment
                            </div>
                        </th>
                        <th scope="col" className="md:px-6 md:py-3 sm:px-3 sm:py-1 py-2 px-2 font-medium">
                            <div className="flex items-center">
                                Interest Payment
                            </div>
                        </th>
                        <th scope="col" className="md:px-6 md:py-3 sm:px-3 sm:py-1 py-2 px-2 font-medium">
                            <div className="flex items-center">
                                Amount to be paid every Year
                            </div>
                        </th>
                        <th scope="col" className="md:px-6 md:py-3 sm:px-3 sm:py-1 py-2 px-2  font-medium rounded-tr-lg ">
                            <div className="flex items-center">
                                Year
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {amortizationDetails?.length > 0 ?
                        amortizationDetails?.map((amortization, index) => (
                            <tr key={amortization?.paymentNumber || index} className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={() => handleTablePopUp(amortization.year)}>
                                <td className="md:px-6 md:py-4 sm:px-3 sm:py-2 py-2 px-2 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"> {index + 1}</td>
                                <td className="md:px-6 md:py-4 sm:px-3 sm:py-2 py-2 px-2 border-r"> {eligibleEMI ? formatValue(
                                    (Number(amortization.totalPrincipal) || 0).toFixed(0),
                                ) : (Number(amortization?.totalPrincipal) || 0).toFixed(0)}</td>
                                <td className="md:px-6 md:py-4 sm:px-3 sm:py-2 py-2 px-2 border-r"> {eligibleEMI ? formatValue(Number(amortization?.totalInterest || 0)?.toFixed(0)) : Number(amortization?.totalInterest || 0)?.toFixed(0)}</td>
                                <td className="md:px-6 md:py-4 sm:px-3 sm:py-2 py-2 px-2 border-r">{eligibleEMI ? formatValue((Number(amortization?.totalPayment) || 0).toFixed(0)) : (Number(amortization?.totalPayment) || 0).toFixed(0)}</td>
                                <td className="md:px-6 md:py-4 sm:px-3 sm:py-2 py-2 px-2 border-r">{amortization.year}</td>
                            </tr>
                        ))
                        : <tr><td colSpan="5" className="px-6 py-4 text-center">No Data To Show</td></tr>
                    }


                </tbody>
            </table>

            <CalculationModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                filteredValue={filteredValue}
                year={year}
                divide={eligibleEMI}
            />

        </div>
    )
}

export default Calculation_Table