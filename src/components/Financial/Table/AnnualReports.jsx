import { REACT_APP_BASE_URL } from "@/env/env";
import Link from "next/link";
import React from "react";

const AnnualReports = ({ annualReports }) => {
  const extractYear = (reportName) => {
    const nameParts = reportName.split(".");
    const baseName = nameParts.slice(0, -1).join(".");
    const yearPart = baseName.split("Annual Report")[1].split("-")[1];
    const year = yearPart.split("20")[1];
    return year || "20";
  };
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="flex justify-center">
          <img
            src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_businesswoman_ad42c94801.jpg"
            alt=""
            className="md:w-[60%] w-[100%] rounded-lg"
          />
        </div>
        <div>
          <div className="grid md:grid-cols-4 grid-cols-3 md:text-lg text-sm md:mt-auto mt-4 gap-1 ">
            {annualReports?.AnnualReport
              ? annualReports?.AnnualReport?.map((report, index) => (
                <Link
                  key={index}
                  className="border-black border hoverEffect p-3 text-center text-heading hover:text-white hover:bg-[#ff0169] hover:border-[#ff0169] transition duration-500 ease-in-out"
                  style={{ cursor: "pointer" }}
                  href={report.url}
                  target="_blank"
                >
                  <p className=" font-medium">
                    FY {`'${extractYear(report.name)}`}
                  </p>
                </Link>
              ))
              : "No reports available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReports;
