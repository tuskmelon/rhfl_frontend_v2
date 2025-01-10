import React from 'react'

import { getCreditRatings } from '../../api/FinancialInformationApi'
import CreditRatings from '../../components/Financial/Table/CreditRatings'

const FinancialInformationCreditRatings = async() => {
    const creditRatings = await getCreditRatings()
    // console.log(creditRatings,"creditRatings")
    return (
        <div>
            <CreditRatings creditRatings={creditRatings} />
        </div>
    )
}

export default FinancialInformationCreditRatings