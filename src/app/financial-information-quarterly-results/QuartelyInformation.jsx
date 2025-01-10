import { getQuarterlyResults } from '@/api/FinancialInformationApi';
import QuarterlyResults from '@/components/Financial/Table/QuterlyResults';
import React from 'react'

const QuartelyInformation = async() => {
    const quarterlyResults = await getQuarterlyResults();
    return (
        <>
            <QuarterlyResults quarterlyResults={quarterlyResults} />
        </>
    )
}

export default QuartelyInformation