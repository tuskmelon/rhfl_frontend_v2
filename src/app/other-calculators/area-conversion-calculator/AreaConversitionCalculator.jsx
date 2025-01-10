'use client'
import { useAreaCalculator, useStampDutyCalculator } from '@/query/useQuery';
import React, { useState } from 'react'

const AreaConversitionCalculator = () => {

    const [selectedConversion, setselectedConversion] = useState('');
    const [unit, setUnit] = useState([]);
    const [calculationUnit, setcalculationUnit] = useState([]);
    const [selectedUnitName, setselectedUnitName] = useState([]);
    const changeUnit = (event) => {
        setUnit(event.target.value)
        let calculationFormula = event.target.value / selectedConversion
        setcalculationUnit(calculationFormula)
        //console.log(event.target.value)
    }
    const changedConversionUnit = (event) => {
        setUnit(0)
        setcalculationUnit(0)
        let conversionData = event.target.value.split(",");
        console.log(conversionData[1],"conversionData");
        setselectedConversion(conversionData[0])
        setselectedUnitName(conversionData[1])
    }

    const { data, isLoading } = useAreaCalculator();
    return (
        <>
            <div className="headings text-center mt-6 mb-6">Area Conversion Calculator</div>
            <div className='border border-[#00000020] md:p-10 p-6 rounded-md mb-6 md:m-1 m-4'>
                <div className='grid md:grid-cols-2 gap-10'>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Unit</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => changedConversionUnit(e)} >
                            <option value=""  >Select Unit</option>
                            {
                                data?.length > 0 && data?.map((item, index) => (
                                    <option value={[item?.ConversionValue, item?.ConversionName]} key={index}>{item?.ConversionName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Unit Value</label>
                        <input type="number" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={unit} onChange={(e) => changeUnit(e)} />
                    </div>
                </div>

                {
                    unit > 0 && selectedConversion?.length > 0 ?
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-base  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Unit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((list, index) => (
                                            list.ConversionName != selectedUnitName ?
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {list.ConversionName}
                                                    </th>
                                                    <td className="px-6 py-4 text-black">
                                                        {calculationUnit * list?.ConversionValue}
                                                    </td>
                                                </tr> : null
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <p className="mt-5 md:text-xl text-lg">Choose a unit and enter a value to start</p>
                }
                <p className="my-5 font-semibold text-[12px] sm:text-[14px] md:text-[16px]"  >* The Roman numeral suffixes at the end of some of the units, e.g. Bigha I and Bigha II, indicate that more than one measure of area exists by the same name in different regions, and are not a part of the unit's nomenclature.</p>
                <p className="font-semibold text-[12px] sm:text-[14px] md:text-[16px]">
                    Disclaimer: We verify the accuracy of calculations pertaining to Metric and English measure of area up to two decimals. However, as several versions of the regional units exist in the sub-continent, we suggest users undertake a sample calculation to establish consonance between their unit measure and that used in our calculator.
                </p>

            </div>
        </>

    )
}

export default AreaConversitionCalculator