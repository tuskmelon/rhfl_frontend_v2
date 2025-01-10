
import React from "react";
// import CountUp from "react-countup";
import './Stats.css';
import { handleStats } from "@/api/HomePageApi";
import Blogs from "src/app/blogs/Blogs";
import Link from "next/link";
const Stats = async () => {

  let stats = await handleStats()
  return (
    <>

      <div className="mt-10 mb-10">
        {stats?.length > 0 ? (
          <div
            className="StatBackground"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0,0.2), rgba(227, 26, 82,0.8)), url("${stats[0]?.StatBackground?.url
                }")`,
              backgroundSize: `cover`,
            }}
          >
            <div className="Base-wrapper" >
              <div className="StatList-wrapper" data-aos="fade-up">
                {stats.map((stat, index) => (
                  <div key={stat?.id} className="m-auto text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 200}>
                    <img
                      className="StatIcon text-center "
                      src={`${stat?.StatIcon?.url}`}
                      alt="Document list background"
                    />
                    <div className="StatData text-center">
                      <p className="StatValue text-center">
                        {stat?.StatValue}
                      </p>
                      <p className="StatTitle">{stat?.StatTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="max-w-[1280px] m-auto">
        <h2
          className=" mb-5 font-medium text-center text-[#2A2A2A] md:text-[2.75rem] text-[1.5rem]"
          style={{ marginTop: "5rem" }}
        >

          Latest <span className="text-heading">Finance Information</span>  for You
        </h2>
        <Blogs filteredBlogs={true} />
        <Link href="/blogs" prefetch={true} className="flex justify-center">
          <p className="bg-[#ff0169]  inline-block p-[0.5rem] mt-4 mb-5 m-auto text-white  cursor-pointer rounded-md font-semibold text-center">View All Blogs</p>

        </Link>
      </div>
    </>
  );
};

export default Stats;
