import React from "react";

const FinancialHighlights = ({
  financialInformation,
  convertToFormattedValue,
}) => {
  return (
    <div>
      <div className="relative overflow-x-auto" data-aos="fade-up" data-aos-duration="800">
        <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="md:text-base text-sm text-white bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg">
                Particulars
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Units
              </th>
              {financialInformation?.length > 0 &&
                Object.keys(financialInformation[0]?.FinancialHighlights[0])
                  .filter(key => key.startsWith("FY")) 
                  .map((yearKey) => (
                    <th key={yearKey} scope="col" className="px-6 py-3 font-medium">
                      {yearKey}
                    </th>
                  ))}
              <th scope="col" className="px-6 py-3 font-medium rounded-tr-lg">
                CAGR
              </th>
            </tr>
          </thead>
          <tbody>
            {financialInformation?.length > 0
              ? financialInformation[0]?.FinancialHighlights.map((financeHighlight, index) => (
                <tr
                  key={index}
                  className="bg-white md:text-sm text-xs text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 border-r">
                    {financeHighlight?.particulars}
                  </td>
                  <td className="px-6 py-4 border-r">{financeHighlight?.units}</td>
                  
                  {Object.keys(financeHighlight)
                    .filter(key => key.startsWith("FY"))
                    .map((yearKey) => (
                      <td key={yearKey} className="px-6 py-4 border-r">
                        {convertToFormattedValue(financeHighlight[yearKey])}
                      </td>
                    ))}
                  <td className="px-6 py-4">{financeHighlight?.CAGR}</td>
                </tr>
              ))
              : ""}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default FinancialHighlights;
