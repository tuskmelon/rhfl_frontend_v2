import React from "react";

const CurrentSharePrice = ({ nsePrice, bsePrice }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-center text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg ">
              Stock Exchange
            </th>
            <th scope="col" className="px-6 py-3 font-medium rounded-tr-lg">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr

            className="bg-white text-center text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4 border-r">NSE</td>
            <td className="px-6 py-4 border-r"> {nsePrice ? nsePrice : "-"}</td>
          </tr>
          <tr

            className="bg-white text-center text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4 border-r">BSE</td>
            <td className="px-6 py-4 border-r">{bsePrice ? bsePrice : "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CurrentSharePrice;
