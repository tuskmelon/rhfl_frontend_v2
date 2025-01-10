import React from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { REACT_APP_BASE_URL } from "@/env/env";

const ShareHolding = ({ shareDetails }) => {
  return (
    <div className="mt-10">
      <Accordion>
        <AccordionPanel>
          <AccordionTitle className="focus:ring-0 bg-gray-100 text-black rounded-md duration-300 transition">
            Share Holding Patterns
          </AccordionTitle>
          <AccordionContent className="md:pl-8 md:pr-8 pl-4 pr-4 relative overflow-x-auto">
            <table className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-base text-center text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium rounded-tl-lg "
                  >
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium ">
                    Q1
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium ">
                    Q2
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium ">
                    Q3
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium rounded-tr-lg"
                  >
                    Q4
                  </th>
                </tr>
              </thead>
              <tbody>
                {shareDetails
                  ? shareDetails?.map((shareFiles, index) => (
                    <tr key={index} className="bg-white text-center text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700" >
                      <td className="md:px-6 md:py-4 border-r font-medium">
                        {shareFiles.Year}
                      </td>
                      <td className="px-6 py-4 border-r">
                        {shareFiles ? (
                          shareFiles.QuarterOne ? (
                            <Link
                              className="pdfHighlight"
                              target="_blank"
                              href={

                                shareFiles.QuarterOne.url
                              }
                            >
                              <FontAwesomeIcon
                                size="lg"
                                className="text-[#FDB515] hover:text-[#ff0169] "
                                style={{ width: "24px" }}
                                icon={faChartLine}

                              ></FontAwesomeIcon>
                            </Link>
                          ) : (
                            "-"
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 border-r">
                        {shareFiles ? (
                          shareFiles.QuarterTwo ? (
                            <Link
                              className="pdfHighlight"
                              target="_blank"
                              href={

                                shareFiles.QuarterTwo.url
                              }
                            >
                              <FontAwesomeIcon
                                size="2x"
                                className="text-[#FDB515] hover:text-[#ff0169] "
                                style={{ width: "24px" }}
                                icon={faChartLine}
                              ></FontAwesomeIcon>
                            </Link>
                          ) : (
                            "-"
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 border-r">
                        {shareFiles ? (
                          shareFiles.QuarterThree ? (
                            <Link
                              className="pdfHighlight"
                              target="_blank"
                              href={

                                shareFiles.QuarterThree.url
                              }
                            >
                              <FontAwesomeIcon
                                size="2x"
                                className="text-[#FDB515] hover:text-[#ff0169] "
                                style={{ width: "24px" }}
                                icon={faChartLine}
                              ></FontAwesomeIcon>
                            </Link>
                          ) : (
                            "-"
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 border-r">
                        {shareFiles ? (
                          shareFiles.QuarterFour ? (
                            <Link
                              className="pdfHighlight"
                              target="_blank"
                              href={

                                shareFiles.QuarterFour.url
                              }
                            >
                              <FontAwesomeIcon
                                size="2x"
                                className="text-[#FDB515] hover:text-[#ff0169] "
                                style={{ width: "24px" }}
                                icon={faChartLine}
                              ></FontAwesomeIcon>
                            </Link>
                          ) : (
                            "-"
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                  : "Loading"}
              </tbody>
            </table>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default ShareHolding;
