
import { getBidsDigitization } from '@/api/BidsDigitizationApi';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BidsDigitization = async () => {

    // const { data, isLoading } = useBidsDigitization();
    // //console.log(getBidsDigitization())
    const response = await getBidsDigitization();
    console.log(response,"response")
    // //console.log(data, "data1");
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="md:text-base text-sm  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-tl-lg">
                            RFP No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End Date
                        </th>
                        <th scope="col-span-2" colSpan="6" className="px-6 py-3 text-center rounded-tr-lg">
                            Downloads
                        </th>
                    </tr>

                </thead>
                <tbody>
                    <tr className="bg-white md:text-sm text-xs text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700" >
                        <td className="px-6 py-4 font-medium text-gray-900  border-r  dark:text-white"></td>
                        <td className="px-6 py-4 font-medium text-gray-900  border-r  dark:text-white"></td>
                        <td className="px-6 py-4 font-medium text-gray-900  border-r  dark:text-white"></td>
                        <td className="px-6 py-4 font-medium text-gray-900  border-r  dark:text-white"></td>
                        <td colSpan="3" style={{ color: "#ff0169" }} className="font-bold border-r  text-center">RFP</td>
                        <td colSpan="3" style={{ color: "#ff0169" }} className="font-bold text-center">Addendum</td>
                    </tr>
                    {
                        response?.length > 0 &&
                        response?.map((item, index) => (
                            <tr key={index} className="bg-white md:text-sm text-xs text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900  border-r  dark:text-white">
                                    {item?.RFPNumber}
                                </th>
                                <td className="px-6 py-4 text-wrap border-r">
                                    {item?.Description}
                                </td>
                                <td className="px-6 py-4 text-wrap border-r">
                                    {moment(item?.StartDate).format('MMMM Do YYYY')}
                                </td>
                                <td className="px-6 py-4 text-wrap border-r">
                                    {moment(item?.EndDate).format('MMMM Do YYYY')}
                                </td>
                                <td className=" border-r " colSpan="3">

                                    <Link href={item?.RFPDownloadFiles ?  item.RFPDownloadFiles.url : "#"} target='_blank' className='text-[#ff0169] text-center '>

                                        <div className='text-wrap text-center flex gap-1 flex-wrap justify-center items-center text-xs break-keep'>
                                            {
                                                item?.RFPDownloadFiles ?
                                                    <>
                                                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                                                        {item.RFPDownloadFiles.name}
                                                    </>
                                                    :
                                                    "-"
                                            }
                                        </div>

                                    </Link>

                                </td>
                                <td colSpan="3">
                                    <Link href={item.AddendumDownloadFiles ?  item.AddendumDownloadFiles.url : "#"} target='_blank' className='text-[#ff0169] flex gap-1  text-center items-center'>
                                        <div className='text-wrap text-center m-auto flex-wrap flex gap-1 justify-center items-center text-xs break-keep'>
                                            {item.AddendumDownloadFiles ? (
                                                <>
                                                    {/* <FontAwesomeIcon style={{ color: "red", width: "24px" }} icon={faFilePdf} /> */}
                                                    <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" /> 
                                                    {item.AddendumDownloadFiles.name}
                                                </>
                                            ) : "-"}
                                        </div>
                                    </Link>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                {/* {getBidsDigitization()} */}
                {/* <tbody>
                    {
                        data?.map((item, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <th  className="px-6 py-4 font-medium text-gray-900   dark:text-white">
                                    {item.RFPNumber}
                                </th>
                                <td className="px-6 py-4 text-wrap">
                                    {item.Description}
                                </td>
                                <td className="px-6 py-4 text-wrap">
                                    {item.StartDate}
                                </td>
                                <td className="px-6 py-4 text-wrap">
                                    {item.EndDate}
                                </td>
                                <td className="">
                                    <div className="grid grid-cols-2 gap-9">
                                        <p className='text-wrap '>{item.RFPDownloadFiles ? item.RFPDownloadFiles.name : "-"}</p>
                                        <p className='text-wrap '>{item.AddendumDownloadFiles ? item.AddendumDownloadFiles.name : "-"}</p>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody> */}
            </table>
        </div>
    )
}

export default BidsDigitization;
