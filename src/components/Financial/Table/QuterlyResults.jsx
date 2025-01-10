'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { REACT_APP_BASE_URL } from "@/env/env";
import {
  faBookOpen,
  faChartLine,
  faKey,
  faMoneyCheck,
  faNewspaper,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const QuterlyResults = ({ quarterlyResults }) => {
  const [year, setYear] = useState(0);
  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3" data-aos="fade-up">
        <ul className="flex-column col-span-1   text-base font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {quarterlyResults?.map((quarter, index) => (

            <li className="mb-0 mt-1" key={index}>
              <div
                className={`${index === year ? "bg-[#FDB515] text-white  " : "text-black"
                  } inline-flex items-center md:text-base text-sm  px-4 py-3   cursor-pointer rounded-lg active w-full dark:bg-blue-600`}
                aria-current="page"
                onClick={() => setYear(index)}
              >
                {quarter.FinancialYear}
              </div>
            </li>

          ))}
        </ul>
        <div className="md:p-6 relative overflow-x-auto col-span-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {quarterlyResults
            ? quarterlyResults.map(
              (quarter, index) =>
                year === index && (
                  <table
                    className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    key={index}
                  >
                    <thead className="md:text-base text-sm  text-white  bg-[#ff0169] dark:bg-gray-700 dark:text-gray-400">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-6 py-3 font-normal rounded-tl-lg "
                        >
                          {quarter.FinancialYear}
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal ">
                          Q1
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal ">
                          Q2
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal">
                          Q3
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 font-normal rounded-tr-lg"
                        >
                          Q4
                        </th>
                      </tr>
                    </thead>
                    <tbody className="md:text-base text-sm">
                      <tr className="bg-gray-200  text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">Financial results</td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter?.QOneFinancialResults ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                  quarter?.QOneFinancialResults.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.25rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoFinancialResults ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QTwoFinancialResults.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.25rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreeFinancialResults ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QThreeFinancialResults.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.25rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourFinancialResults ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QFourFinancialResults.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.25rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                      <tr className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">
                          Earnings presentation / update
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QOneEarningsPresentationUpdate ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QOneEarningsPresentationUpdate.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faMoneyCheck}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoEarningsPresentationUpdate ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QTwoEarningsPresentationUpdate.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faMoneyCheck}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreeEarningsPresentationUpdate ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QThreeEarningsPresentationUpdate.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faMoneyCheck}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourEarningsPresentationUpdate ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QFourEarningsPresentationUpdate.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faMoneyCheck}
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
                      <tr className="bg-gray-200 text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">Earnings Call Invite</td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QOneEarningsConferenceCall ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QOneEarningsConferenceCall.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faNewspaper}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoEarningsConferenceCall ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QTwoEarningsConferenceCall.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faNewspaper}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreeEarningsConferenceCall ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QThreeEarningsConferenceCall.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faNewspaper}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourEarningsConferenceCall ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QFourEarningsConferenceCall.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faNewspaper}
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
                      <tr className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">
                          Earnings Call Transcripts
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QOneEarningsCallTranscript ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QOneEarningsCallTranscript.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faBookOpen}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoEarningsCallTranscript ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QTwoEarningsCallTranscript.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faBookOpen}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreeEarningsCallTranscript ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QThreeEarningsCallTranscript.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faBookOpen}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourEarningsCallTranscript ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QFourEarningsCallTranscript.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.5rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faBookOpen}
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

                      <tr className="bg-gray-200 text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">
                          Earnings Call Audio Transcript
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QOneAudio ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                  quarter.QOneAudio.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faPlay}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoAudio ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                  quarter.QTwoAudio.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faPlay}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreeAudio ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                  quarter.QThreeAudio.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  icon={faPlay}
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourAudio ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                  quarter.QFourAudio.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.25rem" }}
                                  size="2x"
                                  icon={faPlay}
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                      <tr className="bg-white text-black border-b border-r border-l dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-3">
                          Public Disclosure on Liquidity
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QOnePublicDisclosure ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QOnePublicDisclosure.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  icon={faKey}
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QTwoPublicDisclosure ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QTwoPublicDisclosure.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faKey}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QThreePublicDisclosure ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QThreePublicDisclosure.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  className="text-[#FDB515] hover:text-[#ff0169]"
                                  icon={faKey}
                                ></FontAwesomeIcon>
                              </Link>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className=" px-6 py-3">
                          {quarter ? (
                            quarter.QFourPublicDisclosure ? (
                              <Link
                                className="pdfHighlight"
                                target="_blank"
                                href={
                                 
                                  quarter.QFourPublicDisclosure.url
                                }
                              >
                                <FontAwesomeIcon
                                  style={{ width: "1.35rem" }}
                                  size="2x"
                                  icon={faKey}
                                  className="text-[#FDB515] hover:text-[#ff0169]"
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
                    </tbody>
                  </table>
                )
            )
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default QuterlyResults;
