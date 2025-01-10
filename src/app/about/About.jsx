
import { handleAboutUs, handleBoardOfDirectors } from "@/api/AboutPageApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import React from "react";


const About = async () => {


  const aboutUsInformation = await handleAboutUs()
  const DirectorsList = await handleBoardOfDirectors();
  // console.log(DirectorsList, "DirectorsList")

  return (
    <div className="max-w-[1280px] m-auto">
      <Breadcrumbs />

      <div className="headings text-center md:mt-4 mt-6 mb-4" data-aos="fade-up" >About US</div>
      <div
        className="text-left   md:leading-8 sm:leading-6 md:p-auto p-3 pt-0"
        style={{
          whiteSpace: "pre-wrap",
        }}
        data-aos="fade-up"
      >
        {aboutUsInformation ? (
          <div className="md:text-[15px] text-[12px]">{aboutUsInformation?.AboutUS}</div>
        ) : (
          "Loading..."
        )}
      </div>
      <div>
        <p className="headings text-center mt-4 mb-4">Director Profile</p>
        {DirectorsList && DirectorsList[0]?.profile?.map((director, index) => (
          <div className="grid md:grid-cols-3 mb-4 AboutUsShadow mt-3 md:ms-0 ms-2 md:mr-0 mr-2" key={index} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} >
            {index % 2 === 0 ? (
              <>
                <div className="md:col-span-1 m-auto">
                  <Image
                    src={director?.img?.url}
                    alt={director?.name}
                    width={300}
                    height={300}
                    className=" rounded-3 aboutDirectorImage"
                  />
                </div>
                <div className="md:col-span-2 ">
                  <div className="p-1 mt-md-0 mt-3" style={{ whiteSpace: "pre-wrap", backgroundColor: "#ff0169" }}>
                    <p className="text-white lg:!ps-4 ps-0 lg:!text-xl md:!text-lg !text-md  font-semibold md:!text-start text-center  titleText mb-0">{director.name}</p>
                  </div>
                  <p className="mb-0 description_text mt-5 md:text-[15px] text-[12px] text-justify md:!ps-5 md:!pr-5">{director.content}</p>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2 md:order-0 order-1" >
                  <div className="p-1 mt-md-0 mt-3" style={{ whiteSpace: "pre-wrap", backgroundColor: "#ff0169" }}>
                    <p className="text-white lg:!ps-4 ps-0 lg:!text-xl md:!text-lg !text-md  font-semibold md:!text-start text-center  titleText mb-0">{director.name}</p>
                  </div>
                  <p className="mb-0 description_text mt-5 md:text-[15px] text-[12px] text-justify md:!ps-5 md:!pr-5">{director.content}</p>
                </div>
                <div className="md:col-span-1 md:order-1 order-0  m-auto">
                  <Image
                    src={director?.img?.url}
                    alt={director?.name}
                    width={300}
                    height={300}
                    className=" rounded-3 aboutDirectorImage"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default About;
