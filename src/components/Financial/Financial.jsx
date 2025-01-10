
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import FinancialHighlights from "./Table/FinancialHighlights";
import QuarterlyResults from "./Table/QuterlyResults";
import AnnualReports from "./Table/AnnualReports";
import CreditRatings from "./Table/CreditRatings";
import { getAnnualReports, getCreditRatings, getFinancialInformation, getQuarterlyResults } from "@/api/FinancialInformationApi";
import FinancialTabs from "./FinancialTabs";

const Financial = async () => {

  // const [tabSection, setTabSection] = useState("Financial Highlights");

  // let tabSection = "Financial Highlights"

  const convertToFormattedValue = (value) => {
    if (value != null && value % 1 === 0) {
      const totalFormatted = value.toString();
      const lastThree = totalFormatted.substring(totalFormatted?.length - 3);
      const otherNumbers = totalFormatted.substring(0, totalFormatted?.length - 3);
      const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
      return res;
    } else return value;
  };


  const financialInformation = await getFinancialInformation();
  const quarterlyResults = await getQuarterlyResults();
  const annualReports = await getAnnualReports()
  const creditRatings = await getCreditRatings()


  const tabs = [
    { label: "Financial Highlights", component: <FinancialHighlights financialInformation={financialInformation} convertToFormattedValue={convertToFormattedValue} /> },
    { label: "Quarterly Results", component: <QuarterlyResults quarterlyResults={quarterlyResults} /> },
    { label: "Annual Reports", component: <AnnualReports annualReports={annualReports} /> },
    { label: "Credit Ratings", component: <CreditRatings creditRatings={creditRatings} /> }
  ];


  const handleTabClick = (lable) => {
    // tabSection = lable
  }

  return (
    <div className="max-w-[1280px] m-auto">
      <Breadcrumbs />
      <div className="headings text-center mt-4 mb-4">
        Financial Information
      </div>
      <div className="max-w-[1380px] m-auto">
        <FinancialTabs
          tabs={tabs}
        />
        {/* <div className="mb-4 mt-8 border-b border-[#fdb515] dark:border-gray-700">
          <ul className="grid grid-cols-5 -mb-px text-sm font-normal text-center" role="tablist">
            {tabs.map((tab) => (
              <li
                key={tab.label}
                className={`me-2 text-base font-normal ${tabSection === tab.label ? "bg-[#fdb515] text-white rounded-t-lg transition duration-100" : "text-black"}`}
              >
                <button
                  className="inline-block p-4 border-[#fdb515] rounded-t-lg"
                  // onClick={() => handleTabClick(tab.label)}
                  role="tab"
                  aria-controls={tab.label}
                  aria-selected={tabSection === tab.label}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div id="default-tab-content">
          {tabs?.map((tab) => (
            <div
              key={tab.label}
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${tabSection === tab.label ? "" : "hidden"}`}
              id={tab.label}
              role="tabpanel"
              aria-labelledby={`${tab.label}-tab`}
            >
              {tab.component}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Financial;
