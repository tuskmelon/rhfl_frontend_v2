import { getInvestorsCalender } from '@/api/InvestorsApi'
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';
export async function generateMetadata() {
  const title = "Investor Calender | Repco Home Loans";
  const description = "Repco Home Loans - Investor Calender ";

  const metaData = MetaTags({ title, description });

  return metaData;
}

const Page = async () => {
  let calendar = await getInvestorsCalender()
  // console.log(calendar, "calendar");
  return (
    <div className="max-w-[1280px] m-auto ">
      <Breadcrumbs />
      <div className="newupdatebg">
        <h2
          className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
        // style={{ marginTop: "5rem" }}
        >
          Investor Calender
        </h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 md:m-1 m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-base  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg ">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <div className="flex items-center">
                  Event
                </div>
              </th>
              <th scope="col" className="px-6 py-3 font-medium rounded-tr-lg">
                <div className="flex items-center">
                  Details
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {

              calendar?.length > 0 ?
                calendar?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  >
                    <td className="px-6 py-4 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.EventDate}</td>
                    <td className="px-6 py-4 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.EventName}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link href={item?.EventDetails?.url || ''} target="_blank" ><p className='flex items-center' style={{ color: "rgb(253 181 21)", fontWeight: "bold" }}>
                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />&nbsp;{item?.EventDetails?.name?.split(item?.EventDetails?.ext)[0]}{item?.EventDetails?.caption ? <span className="pdfCaption">{item?.EventDetails?.caption}</span> : ""}</p></Link></td>
                  </tr>
                ))
                : <tr

                  className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"> No Data Found</td>
                  <td className="px-6 py-4 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"> No Data Found</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">No Data Found</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <p className="mt-7 mb-5 font-semibold text-center">Note: All future dates are indicative only and subject to change!</p>
    </div >
  )
}

export default Page
