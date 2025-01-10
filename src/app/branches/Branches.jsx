'use client'
import { branchDetails } from '@/api/BranchesApi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Branches = () => {

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
        const stateList = await branchDetails('BranchLink')
        setState(stateList)
    }

    const handleRegion = async () => {
        state?.map((branch, index) => {
            if (branch?.id == selectedState) {
                let region = branch.BranchLink.sort((a, b) => a.BranchName.localeCompare(b.BranchName))
                //console.log(region, "region");
                setBranches(region)
            }
        })
    }

    const handleSelectedRegion = () => {
        const filteredData = branches?.filter((item) => item.id == selectedBranch)
        setSelectedRegion(filteredData[0])
    }

    //console.log(state, "branches", selectedState, "selectedState", selectedRegion, "selectedRegion");

    const filterSlashes = (content) => {
        let contentreturn = content?.replace(/\\r/g, " ");  // Replace '\\r' with space
        contentreturn = contentreturn?.replace(/\\n/g, " ");  // Replace '\\n' with space
        return contentreturn;
    }

    return (
        <>
            <div className='m-auto flex items-center justify-center flex-col'>
                <select
                    id="countries"
                    value={selectedState}
                    onChange={(e) => { setSelectedState(e.target.value), setSelectedBranch('') }}
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
                            <option key={branch?.id} value={branch?.id}>{branch?.BranchName}</option>
                        ))
                    }
                </select>



            </div >
            {
                selectedBranch?.length > 0 &&
                <div className="mt-10 mb-10 shadow-[5px_5px_20px_10px_rgba(0,0.1,0.1,0.1)] md:p-6 p-4  md:ps-10 md:pe-10 ps-6 pe-6 rounded-xl md:max-w-[60%] max-w-[95%] m-auto">
                    <h3 className='text-center font-semibold text-2xl mb-4 mt-4 text-[#ff0169]'>Branch Details</h3>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Branch Name :</h6>
                        <p className='font-medium text-black md:text-md text-sm leading-6   mt-1 '>
                            {selectedRegion.BranchAddress} - {selectedRegion.BranchName}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Address :</h6>
                        <p className='font-medium text-black md:text-md text-sm leading-6   mt-1 '>
                            {filterSlashes(selectedRegion.BranchStreet)}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>City :</h6>
                        <p className='font-medium text-black md:text-md text-sm leading-6   mt-1 '>
                            {selectedRegion.BranchCity} - {selectedRegion.BranchPin}
                        </p>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Email :</h6>
                        <Link href={`mailto:${selectedRegion.BranchEmail}`} className='font-medium text-black md:text-md text-sm'>
                            {selectedRegion.BranchEmail}
                        </Link>
                    </div>
                    <div className="leading-10 mb-3">
                        <h6 className='md:text-xl text-sm font-medium text-[#ff0169]'>Phone :</h6>
                        {
                            selectedRegion?.BranchContactDetails
                                ? selectedRegion?.BranchContactDetails?.split(",").map((item, index) => (
                                    <Link key={index} href={`tel:${item.trim()}`} className="font-medium text-black md:text-md text-sm">
                                        {item.trim()}{index < selectedRegion.BranchContactDetails.split(",").length - 1 ? ", " : ""}
                                    </Link>
                                ))
                                : <span>No contact numbers available</span>
                        }
                    </div>

                </div>
            }

            {
                selectedBranch?.length === 0 &&
                <p className='text-center mt-5 mb-5 p-3'>Choose a state and Branch to View the details</p>
            }
        </>
    )
}

export default Branches