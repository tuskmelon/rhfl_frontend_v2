'use client'
import { branchDetails } from '@/api/BranchesApi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SatCenters = () => {
    const [state, setState] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState('')
    const [selectedRegion, setSelectedRegion] = useState([])

    useEffect(() => {
        getStateList()
    }, [])

    useEffect(() => {
        if (selectedState?.length > 0) {
            //console.log(selectedState, "selectedState");
            handleRegion()
        }
    }, [selectedState])

    useEffect(() => {
        if (selectedBranch?.length > 0) {
            //console.log(selectedBranch, "selectedState");
            handleSelectedRegion()
        }
    }, [selectedBranch])

    const getStateList = async () => {
        let stateList = await branchDetails('sat_centers')
        stateList = stateList.filter((item) => item.sat_centers.length > 0)
        //console.log(stateList, "stateList");
        setState(stateList)
    }

    const handleRegion = async () => {
        state?.map((branch, index) => {
            if (branch?.id == selectedState) {
                let region = branch.sat_centers.sort((a, b) => a.SatCentreName.localeCompare(b.SatCentreName))
                //console.log(region, "region");
                setBranches(region)
            }
        })
    }

    const handleSelectedRegion = () => {
        const filteredData = branches?.filter((item) => item.id == selectedBranch)
        setSelectedRegion(filteredData[0])
    }

    const filterSlashes = (content) => {
        let contentreturn = content?.replace(/\\r/g, " ");
        contentreturn = contentreturn?.replace(/\\n/g, " ");
        return contentreturn;
    }

    return (
        <>
            <div className='m-auto flex items-center justify-center flex-col'>
                <select
                    id="countries"
                    value={selectedState}
                    onChange={(e) => { setSelectedState(e.target.value); setSelectedBranch('') }}
                    className="bg-gray-50 max-w-[350px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled>Select State</option>  // Default option that is disabled
                    {
                        state?.length > 0 &&
                        state?.map((stateList, index) => (
                            <option value={stateList?.id} key={index}>{stateList?.State}</option>
                        ))
                    }
                </select>

                <select
                    id="branches"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="bg-gray-50 max-w-[350px] mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled>Select Branch</option>  // Default option that is disabled
                    {
                        branches?.map((branch, index) => (
                            <option key={branch?.id} value={branch?.id}>{branch?.SatCentreName}</option>
                        ))
                    }
                </select>



            </div >
            {
                selectedBranch?.length > 0 &&
                <div className="mt-10 mb-10 shadow-[5px_5px_20px_10px_rgba(0,0.1,0.1,0.1)] md:p-6 p-4  md:ps-10 md:pe-10 ps-6 pe-6 rounded-xl md:max-w-[60%] max-w-[95%] m-auto">
                    <h3 className='text-center font-semibold text-2xl mb-4 mt-4 text-[#ff0169]'>Sat-Center Details</h3>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Sat-Center Name :</h6>
                        <p className='font-medium text-black md:text-md text-sm leading-6   mt-1 '>
                            {selectedRegion.SatCentreName}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Address :</h6>
                        <p className='font-medium text-black md:text-md leading-6 text-sm'>
                            {filterSlashes(selectedRegion.SatCentreAddress)}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Sat-Center Incharge :</h6>
                        <p className='font-medium text-black md:text-md leading-6 text-sm'>
                            {selectedRegion.SatCentreIncharge}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Sat-Center Contact :</h6>
                        {
                            selectedRegion?.SatCentreContactNumber
                                ? selectedRegion.SatCentreContactNumber.split(",").map((item, index) => (
                                    <Link key={index} href={`tel:${item.trim()}`} className="font-medium text-black md:text-md text-sm">
                                        {item.trim()}{index < selectedRegion.SatCentreContactNumber.split(",").length - 1 ? ", " : ""}
                                    </Link>
                                ))
                                : <span>No contact numbers available</span>
                        }


                    </div>


                </div>
            }

            {
                selectedBranch?.length === 0 &&
                <p className='text-center mt-5 mb-5'>Choose a state and Branch to View the details</p>
            }
        </>
    )
}

export default SatCenters