import { RecoveryAgencyApi } from '@/api/RecoveryAgencyApi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MetaTags } from '@/components/MetaTags';
import React from 'react';

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60;
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Recovery Agency | Repco Home Loans";
    const description = "Repco Home Loans - Recovery Agency ";

    const metaData = MetaTags({ title, description });

    return metaData;
}
const Page = async () => {
    let recoveryAgency = await RecoveryAgencyApi();
    // console.log(recoveryAgency, "recoveryAgency");
    // recoveryAgency = JSON.parse(recoveryAgency[0]?.json || "[]");

    return (
        <div className="max-w-[1280px] m-auto">
            <Breadcrumbs />
            <div className="newupdatebg">
                <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
                    Recovery Agency
                </h2>
            </div>

            {recoveryAgency &&recoveryAgency[0]?.length === 0 ? (
                <p className="text-center text-xl text-gray-500 mt-10">No data available</p>
            ) : (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10 md:m-1 m-4">
                        <thead className="md:text-lg text-sm text-white bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg font-medium">
                                    S.No
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-tr-lg font-medium">
                                    Name of the empanelled Recovery Agency
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recoveryAgency && recoveryAgency[0]?.json.map((item, index) => (
                                <tr className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td className="px-6 py-4 text-wrap border-r">{index + 1}.</td>
                                    <td className="px-6 py-4 text-wrap border-r break-all">
                                        {item?.name} <br />
                                        {item?.address}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Page;
