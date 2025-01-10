
import { GuidelineValuesApi } from '@/api/GuidelineValuesApi';
import Link from 'next/link';
import React from 'react'

const GuidelineValues = async () => {
    // const { data, isLoading } = useGuidelineValues();
    const data = await GuidelineValuesApi();
    console.log(data, "data");
    return (
        <>
            <div className="headings text-center mt-6 mb-6">Guideline Values</div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6 md:m-1 m-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="md:text-sm text-xs  text-white text-center uppercase bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                State Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Guideline value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((guideline, index) => (
                                <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                    <th scope="row" className="md:px-6 md:py-4 px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="md:px-6 md:py-4 px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {guideline.StateName}
                                    </th>
                                    <td className="md:px-6 md:py-4 px-3 py-2">
                                        <Link href={guideline.LinkToGuideline} target="_blank" className="font-medium text-[#FDB515] dark:text-blue-500 hover:underline">Link to guideline</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GuidelineValues