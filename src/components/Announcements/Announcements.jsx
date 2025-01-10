import React from "react";
import "@/components/Announcements/Announcements.css";
import Breadcrumbs from "../Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import senderRequest from "@/services/Http";
import { REACT_APP_BASE_URL } from "@/env/env";
import Link from "next/link";
import { handleAnnouncements } from "@/api/AnnouncementsApi";
import Image from "next/image";

const Announcements = async () => {

  const importantAnnouncements = await handleAnnouncements()

  const simpleAnnouncement = [];
  const impAnnouncement = [];

  importantAnnouncements?.forEach((announcement) => {
    const isWithinDateRange =
      (announcement.HasEndDate &&
        moment().isBetween(
          announcement.StartDate,
          announcement.EndDate
        )) ||
      !announcement.HasEndDate;

    if (isWithinDateRange) {
      if (announcement.ImportantAnnouncement) {
        impAnnouncement.push(announcement);
      } else {
        simpleAnnouncement.push(announcement);
      }
    }
  });

console.log(importantAnnouncements,"importantAnnouncements")

  return (
    <div className="max-w-[1380px] m-auto">
      <Breadcrumbs />
      <div className="announcementsBackground mb-0 mt-10">
        <p className="headings announcements text-center flex justify-center">
          Announcements!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="p-0 ">
          <div
            style={{
              width: "100%",
              backgroundImage:
                "url('https://doc.repcohome.com/uploads/announcement_1_faed01ced1.jpeg')",
              height: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              margin: "auto",
              backgroundPosition: "initial",
              borderRadius: "0.25rem",
            }}
          ></div>
        </div>
        <div className="p-0">
          {impAnnouncement?.length > 0 ? (
            <div
              className="md:p-[2rem] p-[1rem]"
              style={{
                backgroundColor: "#D3D3D380",

                borderRadius: "0.25rem",
                textAlign: "left",
              }}
            >
              <p className="font-medium text-2xl mb-2 text-[#ff0169]" >
                Important Announcements
              </p>
              {impAnnouncement?.map((announcement, index) => (
                <div key={index}>
                  {announcement.NewAnnouncement ? (
                    <div className="flex justify-start items-center md:gap-3 gap-1 mb-2">
                      <Link
                        target="_blank"
                        href={announcement.File.url}
                        className="font-normal flex gap-4"
                      >
                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                      </Link>
                      <Link
                        target="_blank"
                        href={announcement.File.url}
                        className="font-normal"
                      >

                        {/* <div> */}
                        <p className="whitespace-wrap">{announcement.File.name}</p>
                        <p className="whitespace-wrap">
                          {announcement.File.caption ? (
                            <span className="pdfCaption">
                              {announcement.File.caption}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                        {/* </div> */}
                      </Link>
                      &nbsp;
                      <span className="new-announcement" >New</span>
                    </div>
                  ) : (
                    <div className="m-0">
                      <Link
                        target="_blank"
                        href={announcement.File.url}
                      >
                        <p
                          className="important-announcement"
                          style={{ marginBottom: "0" }}
                        >
                          <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />{" "}
                          &nbsp;
                          {announcement.File.name}
                          {announcement.File.caption ? (
                            <span className="pdfCaption">
                              {announcement.File.caption}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div
            className="md:p-[2rem] p-[1rem]"
            style={{
              backgroundColor: "#D3D3D380",

              borderRadius: "0.25rem",
              textAlign: "left",
            }}
          >
            <p className=" font-medium text-2xl mb-2 text-[#ff0169]">Other Announcements</p>
            {simpleAnnouncement?.length > 0
              ? simpleAnnouncement?.map((announcement, index) => (
                <div key={index}>
                  {announcement?.NewAnnouncement ? (
                    <p className="text-[#fdb515]">
                      <Link
                        className="font-semibold break-all text-[#fdb515] flex  items-start gap-4"
                        target="_blank"
                        href={announcement?.File?.url}
                      >
                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />

                        <span className="max-w-[60%]">{announcement.File.name}</span>
                        {announcement.File.caption ? (
                          <span className="pdfCaption">
                            {announcement.File.caption}
                          </span>
                        ) : (
                          ""
                        )}
                        &nbsp;
                        <span className="new-announcement flex">New</span>
                      </Link>
                    </p>
                  ) : (
                    <p style={{ marginBottom: "0" }}>
                      <Link
                        className="pdfHighlight-line-space font-weight-bold"
                        target="_blank"
                        href={announcement.File.url}
                      >
                        {/* <div className="max-w-[20px]">
                          <FontAwesomeIcon
                            style={{ color: "red" }}
                            icon={faFilePdf}
                            size="lg"
                          ></FontAwesomeIcon>{" "}
                        </div> */}
                        <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                        &nbsp;
                        {announcement.File.name}
                        {announcement.File.caption ? (
                          <span className="pdfCaption">
                            {announcement.File.caption}
                          </span>
                        ) : (
                          ""
                        )}
                      </Link>
                    </p>
                  )}
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
