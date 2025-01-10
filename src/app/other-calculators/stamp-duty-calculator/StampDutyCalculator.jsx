'use client'

import { useStampDutyCalculator } from '@/query/useQuery';
import React, { useState } from 'react'

const StampDutyCalculator = () => {

    const [stateName, setStateName] = useState("");
    const [propertyValue, setPropertyValue] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const changedState = (event) => {
        let stateData = event.target.value.split(",");
        //console.log(event.target.value.split(","));
        setPercentage(stateData[0])
        setStateName(stateData[1])
    };

    const handleChange = (event) => {
        let regex = new RegExp('^[0-9]*$');
        let propertyVal = event.target.value;
        if (regex.test(propertyVal)) {
            setPropertyValue(propertyVal)
        }
    }

    const { data, isLoading } = useStampDutyCalculator();

    //console.log(data, "states");


    return (
        <>
            <div className="headings text-center mt-6 mb-4">Stamp Duty Calculator</div>
            <div className='border border-[#00000020] lg:p-10 md:p-6 p-4 rounded-md mb-6 md:m-1 m-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => { changedState(e); setPropertyValue(0) }} value={stateName}>
                            <option value="" disabled>Choose a State</option>
                            {
                                data?.length > 0 && data?.map((item, index) => (
                                    <option value={[item.StampDutyPercentage, item.StateName]} key={index}>{item.StateName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Property Amount (in Rs.)</label>
                        <input type="number" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={propertyValue} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                {stateName ?
                    <div className="my-5 max-w-[90%] text-center m-auto min-h-[3rem] rounded-md bg-[#ff0169] text-white p-4">
                        <p>The estimated stamp duty will be {(propertyValue * percentage) / 100} (Rs.) for the property value of {propertyValue} (Rs.) in the state of {stateName}</p> </div> :
                    <div className="my-5 max-w-[90%] text-center m-auto min-h-[3rem] rounded-md bg-[#ff0169] text-white p-4"
                    >
                        <p>  Choose a state and enter the property value</p>
                    </div>
                }

                <p className="mb-5 text-[#ff0169] mt-8 md:text-lg text-sm">
                    * The Values displayed here are only indicative, For actual charges, Please refer to the respective State government Website.
                </p>
            </div>
        </>
    )
}

export default StampDutyCalculator