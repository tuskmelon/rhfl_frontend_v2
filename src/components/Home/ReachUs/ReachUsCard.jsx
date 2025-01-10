import { handleBranchCardDetails } from "@/api/HomePageApi";
import { REACT_APP_BASE_URL } from "@/env/env";
import senderRequest from "@/services/Http";
import Link from "next/link";


const ReachUsCard = async ({ branchCardDetails }) => {
  return (
    <div>
      <div className="BranchInputSet max-w-[1180px] m-auto mx-2">
        <div className="alternatedivor grid grid-cols-1 lg:grid-cols-2 gap-5 m-auto">
          {branchCardDetails?.map((details, index) => {
            // Alternate AOS animations and add delays
            const animationType = index % 2 === 0 ? "fade-up" : "fade-down";
            const animationDelay = `${index * 100}ms`;

            return (
              <div
                key={details.id}
                className={`${index === 2 ? "lg:col-span-2" : ""}`}
                data-aos={animationType}
                data-aos-delay={animationDelay}
              >
                {details?.CardTitle !== "Contact Us" ? (
                  <Link
                    prefetch={true}
                    href={
                      details.CardTitle === "Repco Branches"
                        ? "/branches"
                        : "/satcenters"
                    }
                  >
                    <div
                      className="border border-[#B8B8B8] flex rounded-md card p-3 items-center bg_image_card"
                      style={{
                        backgroundImage: `url(${
                          index === 0
                            ? "https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_Group_3_047dadd365_d22ce6e54d.png"
                            : "https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_Group_1_cfbaaaaf5b_c736beef87.png"
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "bottom",
                      }}
                    >
                      <div>
                        <img
                          className=""
                          src={
                            index === 0
                              ? "https://s3.ap-south-1.amazonaws.com/rhfl-strapi/fi_4363831_9c23f09bf8_2ef6ef48ba.png"
                              : "https://s3.ap-south-1.amazonaws.com/rhfl-strapi/fi_6712276_d8806e2eea_4ddd9282be.png"
                          }
                          alt="Card Icon"
                        />
                        <div className="pt-4 pb-3 md:text-2xl text-[1rem] text-[#F2B844] font-semibold ps-3 pe-3">
                          {details.CardTitle}
                        </div>
                        <div className="pt-3 pb-4 md:text-lg text-[0.8rem] text-[#555555] font-semibold ps-3 pe-3">
                          <div className="">{details.CardDescription1}</div>
                          <p className="pt-3 text-[#FF0169]">
                            View {details?.CardTitle.split(" ")[1]}
                          </p>
                        </div>
                      </div>
                      <img
                        className="BranchCardImage rounded-md w-[100%] h-[300px]"
                        src={details.CardImage.url}
                        alt="Card Background"
                      />
                    </div>
                  </Link>
                ) : (
                  <Link href="/contact" prefetch={true}>
                    <div
                      className="border flex border-[#B8B8B8] rounded-md card p-3 items-center"
                      style={{
                        backgroundImage: `url(https://s3.ap-south-1.amazonaws.com/rhfl-strapi/thumbnail_Group_3_047dadd365_1_5483718a39.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "80%",
                        backgroundPosition: "bottom left",
                      }}
                    >
                      <div>
                        <img
                          className=""
                          src="https://s3.ap-south-1.amazonaws.com/rhfl-strapi/fi_3095583_c09e2c4d90_3a24453c57.png"
                          alt="Contact Icon"
                        />
                        <div className="pt-4 pb-3 md:text-2xl text-[1rem] text-[#F2B844] font-semibold ps-3 pe-3">
                          {details.CardTitle}
                        </div>
                        <div className="pt-3 pb-4 md:text-lg text-[0.8rem] text-[#555555] font-semibold ps-3 pe-3">
                          <div className="">{details.CardDescription1}</div>
                          <p className="pt-3 text-[#FF0169]">Call Us</p>
                        </div>
                      </div>
                      <img
                        className="BranchCardImage rounded-md"
                        src={details.CardImage.url}
                        alt="Contact Background"
                      />
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReachUsCard;
