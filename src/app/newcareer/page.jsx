import React from 'react'
import NewCareer from './NewCareer'
import { branchDetails } from '@/api/BranchesApi';

const Page =async () => {
    const branches = await branchDetails('BranchLink');

    return (
        <div>
            <NewCareer
                branches={branches}
            />
        </div>
    )
}

export default Page