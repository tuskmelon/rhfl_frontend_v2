import { handleInterestPercentage } from '@/api/HomePageApi';
import React from 'react'

const HeaderPercentage = async () => {
    const percentage = await handleInterestPercentage();
    // console.log(percentage, "percentage");
    return (
        <div>
            {percentage?.InterestRate}
        </div>
    )
}

export default HeaderPercentage