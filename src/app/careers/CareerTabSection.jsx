'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import RHFLCareer from './RHFLCareer';
// import CareerAvailable from './CareerAvailable';

const CareerTabSection = ({ response, CareerAvailableComponent }) => {

    const [careerTab, setCareerTab] = useState('openings')

    return (
        <div>

            <div className="mb-4 mt-8  border-b-2  border-[#fdb515] dark:border-gray-700">
                <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 text-sm font-normal text-center" role="tablist">

                    <li
                        key={'openings'}
                        className={`me-2 text-base font-normal ${careerTab === 'openings' ? "bg-[#fdb515] text-white rounded-t-lg transition duration-100" : "text-black"}`}
                    >
                        <button
                            className="inline-block md:p-4 p-3 border-[#fdb515] rounded-t-lg"
                            onClick={() => setCareerTab('openings')}
                            role="tab"
                            aria-controls={'openings'}
                            aria-selected={careerTab === 'openings'}
                        >
                            Current Openings
                        </button>
                    </li>
                    <li
                        key={'careersInRHFL'}
                        className={`me-2 text-base font-normal ${careerTab === 'careersInRHFL' ? "bg-[#fdb515] text-white rounded-t-lg transition duration-100" : "text-black"}`}
                    >
                        <button
                            className="inline-block md:p-4 p-3 border-[#fdb515] rounded-t-lg"
                            onClick={() => setCareerTab('careersInRHFL')}
                            role="tab"
                            aria-controls={'careersInRHFL'}
                            aria-selected={careerTab === 'careersInRHFL'}
                        >
                            Careers in RHFL
                        </button>
                    </li>

                </ul>

            </div>
            {
                careerTab === "openings" &&
                <>
                    {/* <CareerAvailable /> */}
                    {CareerAvailableComponent}
                    <div className='flex md:m-1 m-4 font-medium justify-between items-center p-4 bg-slate-50 rounded-lg border border-gray-200 mt-5 mb-5 cursor-pointer'>
                        Career in RHFL
                        <Link href="/newcareer"
                            prefetch={true}
                            className='bg-[#ff0169] p-2.5 text-white rounded-lg text-xs'> Apply now</Link>
                    </div>
                    <div className='flex md:m-1 m-4 font-medium justify-between items-center p-4 bg-slate-50 rounded-lg border border-gray-200 mt-5 mb-5 cursor-pointer'>
                        Sales Role Openings
                        <Link prefetch={true} href="/salescareer" className='bg-[#ff0169] p-2.5 text-white rounded-lg text-xs'> Apply now</Link>
                    </div>
                </>

            }

            {
                careerTab === "careersInRHFL" &&
                <RHFLCareer response={response} />
            }
        </div>
    )
}

export default CareerTabSection