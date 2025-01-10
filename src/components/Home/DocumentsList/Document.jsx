// 'use client'
import "./Document.css";
import Link from "next/link";
import Image from "next/image";

const Document = ({ documents }) => {

  return (
    <>
      <h2
        className=" mb-5 font-medium text-center md:text-[2.75rem] text-[1.5rem] DocumentTitle"
        style={{ marginTop: "3rem" }}
        data-aos="fade-right"
      >
        Documents Required For <span>Home Loans</span>
      </h2>
      <div className="DocumentList-wrapper mt-md-20 mt-8 p-4">
        {documents?.length &&
          documents?.map((document, index) => {
            return (
              <div
                className="Card-style"
                key={document.id}
                data-aos="fade-up" 
                data-aos-delay={index * 200}
              >
                <Image
                  src={document?.img?.url || ""}
                  alt="document"
                  className="w-[70px] m-auto"
                  width={100}
                  height={100}
                />
                <div className="mt-4" data-aos="fade" data-aos-delay={index * 150}>
                  <p className="text-center font-semibold text-[1.25rem]">
                    {document.DocumentName}
                  </p>
                  <p className="text-center text-[1rem]">
                    {document.DocumentDescription}
                  </p>
                  <Link href={"/apply-now"} prefetch={true} className="flex justify-center items-center">
                    <button
                      className="text-[16px] mt-4 rounded-lg text-[#FF0169] font-bold p-[15px]"
                      data-aos="zoom-in"
                      data-aos-delay={index * 200}
                    >
                      APPLY NOW!
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Document;
