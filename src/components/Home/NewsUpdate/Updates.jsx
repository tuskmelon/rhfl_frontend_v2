import React from "react";
import "./Updates.css";
import Marquee from "react-fast-marquee";
import { NewsUpdate } from "@/api/NewsApi";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Updates = async () => {
  let news = await NewsUpdate();
  // console.log(news, "news");


  return (
    <div className="mx-auto">
      <div className="Marqueebg  px-3 grid grid-cols-8">
        <div className="col-span-2 sm:col-span-2 md:!col-span-1 my-auto" >
          <Link href="/news" prefetch={true}>
            <h2
              className="m-0 font-medium text-left md:text-[1rem] text-[0.6rem]  MarqueeTitle text-[#FF0169]"
              style={{ marginTop: "0rem", }}
            >
              News Updates:
            </h2>
          </Link>
        </div>
        <div className="w-full col-span-6 md:!col-span-7">
          <Marquee
            gradient={false}
            pauseOnHover={true}
            speed={75}
            className="text-sm font-medium"
          >

            {
              news?.length > 0 &&
              news?.map((item, index) => {
                  return (
                    <div className="" key={item.id}>
                      <Link href={item.NewsPDF?.url} target='_blank' className="flex items-center gap-2 py-2 pr-6">
                        <FontAwesomeIcon style={{ color: "red", width: "22px" }} icon={faFilePdf}></FontAwesomeIcon>
                        <p className="newsDescription font-normal py-2 md:text-[0.8rem] text-[0.7rem] ">
                          {item?.NewsUpdates}
                        </p>
                      </Link>
                    </div>
                  )
              })}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Updates;
