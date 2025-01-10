"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Breadcrumbs = () => {
  const params = usePathname();
  const cleanedParams = params?.split("/")?.filter(Boolean);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  //console.log("Breadcrumbs", cleanedParams);

  return (
    <div className="breadcrumbs  pt-5 mb-4 lower-mid-size-content ps-4">
      <div
        className="flex items-center truncate"
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <Link href="/" className="mr-2  " prefetch={true}>
          <p className="color1 md:!text-[14px] !text-[10px]">Home</p>
        </Link>{" "}
        {cleanedParams?.map((item, index) => (
          <Link prefetch={true} href={` ${index === cleanedParams.length - 1 ? "" : `/${item}`} `} key={index}>
            &#10095;
            <span
              className={`mr-2 ml-2 capitalize md:!text-[14px] !text-[10px] ${index === cleanedParams.length - 1 ? "" : "color1"
                }`}
            >
              {item == "about" ? "About Us" : item == "share-details" ? "Share Price & Ownership" : item.replace(/-/g, " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
