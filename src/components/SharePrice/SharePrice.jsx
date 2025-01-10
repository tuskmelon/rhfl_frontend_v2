
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import CurrentSharePrice from "./Table/CurrentSharePrice";
import ShareHolding from "./Table/ShareHolding";
import { getExternalSharePriceInfoBSE, getExternalSharePriceInfoNSE, getShareprice, getSharepriceDetails } from "@/api/ShareDetailsApi";

const SharePrice = async () => {


  const filterBreaks = (content) => {
    let contentreturn = "";
    contentreturn = content?.replace("<br>", "");
    return contentreturn;
  };

  let nsePrice = '-';
  let bsePrice = '-';

  let getSharePrice = await getShareprice();
  if (getSharePrice?.UseValuesORFetchFromScript) {
    const response = await getExternalSharePriceInfoNSE();
    if (response?.length > 0) {
      nsePrice = filterBreaks(response?.data?.toString())
    } else {
      nsePrice = '-'
    }
    const response2 = await getExternalSharePriceInfoBSE();

    bsePrice = filterBreaks(response2?.data?.toString())

  } else {
    bsePrice = getSharePrice?.BSEPrice
    nsePrice = getSharePrice?.NSEPrice
  }

  let shareDetails = await getSharepriceDetails();
  return (
    <div className="max-w-[1280px] m-auto">
      <Breadcrumbs />
      <h2 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">
        Current Share Price
      </h2>
      <div className="md:m-1 m-4">
        <CurrentSharePrice nsePrice={nsePrice} bsePrice={bsePrice} />
        <ShareHolding shareDetails={shareDetails} />
      </div>
    </div>
  );
};

export default SharePrice;
