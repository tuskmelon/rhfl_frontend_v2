import { getAuctionSales } from '@/api/AuctionSalesApi';
import React from 'react'
import TabSection from './TabSection';
const AuctionSaleNotices = async () => {

  let response = await getAuctionSales();

  return (
    <div>
      <TabSection
        response={response}
      />
    </div>
  )
}

export default AuctionSaleNotices