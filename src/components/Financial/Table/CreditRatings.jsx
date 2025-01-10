import React from "react";

const CreditRatings = ({ creditRatings }) => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" md:text-base sm:text-sm  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg ">
                Rating Agency
              </th>
              <th scope="col" className="px-6 py-3 font-medium ">
                instrument
              </th>
              <th scope="col" className="px-6 py-3 font-medium rounded-tr-lg">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {creditRatings?.length > 0
              ? creditRatings[0].CreditRating.map((cRating, index) => (
                <tr
                  key={index}
                  className="bg-white sm:text-sm md:text-base text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 border-r">
                    {cRating.Rating_agency}
                  </td>
                  <td className="px-6 py-4 border-r">{cRating.Instrument}</td>
                  <td className="px-6 py-4">{cRating.Rating}</td>
                </tr>
              ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditRatings;
