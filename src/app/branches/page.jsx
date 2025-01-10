import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import Branches from './Branches'
import { MetaTags } from '@/components/MetaTags';


export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

export async function generateMetadata() {
    const title = "Branch Locator | Repco Home Loans";
    const description = "Repco Home Loans - Branch Locator";

    const metaData = MetaTags({ title, description });

    return metaData;
}

const Page = () => {

    // const branches = await branchDetails()
    // //console.log(branches, "branches");

    // const [state, setState] = useState('')

    // useEffect(() => {
    //     getBranches()
    // }, [])

    // const getBranches = async () => {
    //     const branches = await branchDetails()
    //     setBranches(branches)
    // }

    // const [branches, setBranches] = useState([])

    return (
        <div className="max-w-[1280px] m-auto ">

            <Breadcrumbs />
            <div className="newupdatebg">
                <h2
                    className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
                >
                    Branch Locator
                </h2>
            </div>
            {/* <div className='m-auto flex items-center justify-center flex-col'>
                <select id="countries" value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-gray-50 max-w-[350px]  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option  value="" disabled>Select State</option>
                    {
                        branches?.map((branch, index) => (
                            <option value={branch?.id} key={index}>{branch?.State}</option>
                        ))
                    }
                    
                </select>
                <select id="countries" className="bg-gray-50 max-w-[350px] mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="" disabled>Select Branch</option>
                </select>
            </div> */}

            <Branches />


        </div>
    )
}

export default Page