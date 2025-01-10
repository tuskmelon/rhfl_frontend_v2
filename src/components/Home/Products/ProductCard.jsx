'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowSide from "../../../assets/arrowside.svg";
import Image from "next/image";
import homeIcon from '../../../assets/home_icon.svg';
import specialIcon from '../../../assets/special_icon.svg';
import ProductCarousel from "../Products/ProductCarousel";
import HomeIconInActive from "../../../assets/home_inActive.svg";
import specialIconActive from "../../../assets/SpecialActive.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductCard = ({ finalvalue, data }) => {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const sortedData = data?.sort((a, b) => a.ProductOrder - b.ProductOrder);
  const filteredData = finalvalue ? sortedData?.filter((item) => item?.ProductId !== finalvalue) : sortedData;

  const homeLoanProducts = filteredData?.filter((item) => item?.IsASpecialProduct !== true);
  const repcoSpecialLoansProducts = filteredData?.filter((item) => item?.IsASpecialProduct === true);

  const [selectedCategory, setSelectedCategory] = useState("Home Loan");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "Home Loan" ? homeLoanProducts : repcoSpecialLoansProducts;

  return (
    <>
      <div className="mt-5">
        <div
          className="flex items-center md:justify-start gap-4 gap-md-2 mx-1"
          data-aos="fade-down"
        >
          <div
            onClick={() => handleCategoryClick("Home Loan")}
            className={`pt-md-3 pb-md-3 ps-md-8 pe-md-8 p-2 text-[18px] rounded-2xl font-medium cursor-pointer inline-block ${
              selectedCategory === "Home Loan"
                ? "border border-[#FF0169] text-[#FF0169]"
                : "border border-[#6C6363] text-[#6C6363]"
            }`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-3">
              <Image
                src={selectedCategory === "Home Loan" ? homeIcon : HomeIconInActive}
                width={20}
                height={20}
                alt="home_icon"
              />
              <p className="md:text-[18px] text-[12px]">Home Loans</p>
            </div>
          </div>
          <div
            onClick={() => handleCategoryClick("Repco Special Loans")}
            className={`pt-md-3 pb-md-3 ps-md-10 pe-md-10 text-[18px] ms-md-9 rounded-2xl font-medium cursor-pointer inline-block ${
              selectedCategory === "Repco Special Loans"
                ? "border border-[#FF0169] text-[#FF0169]"
                : "border border-[#6C6363] text-[#6C6363]"
            }`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-3 w-full p-2 p-md-3">
              <div>
                <Image
                  src={selectedCategory === "Repco Special Loans" ? specialIconActive : specialIcon}
                  width={20}
                  height={20}
                  alt="home_icon"
                />
              </div>
              <div className="md:text-[18px] text-[12px]">Repco Special Loans</div>
            </div>
          </div>
        </div>

        <div
          className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-2 mx-2 bg-white mt-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {filteredProducts?.map((products, index) => (
            <div
              key={index}
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                borderRadius: "0.25rem",
              }}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <Link prefetch={true} href={"/products/" + products.ProductId}>
                <div className="card-col shadow-md">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        {products.ProductImage ? (
                          <img
                            className="rounded-none"
                            src={products.ProductImage.url}
                            alt={products.ProductName ? products.ProductName : "Loading..."}
                            style={{
                              width: "100%",
                              height: "100%",
                              minWidth: "10rem",
                              minHeight: "8rem",
                              borderRadius: "0rem",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="flip-card-back small-size-content"
                        style={
                          index % 2 === 0
                            ? { backgroundColor: "#fdb515" }
                            : { backgroundColor: "#ec1852" }
                        }
                      >
                        <div className="block-with-text scroll-smooth overflow-y-scroll hide-scrollbar text-[0.9rem]">
                          {products.ProductPreviewText ? products.ProductPreviewText : "Loading..."}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="titlebg flex justify-between items-center p-2 shadow-md rounded-xl">
                    <h3 className="m-0 p-3 text-left text-lg font-medium items-center flex">
                      {products.ProductName ? products.ProductName : "Loading..."}
                    </h3>
                    <Image
                      width="20"
                      height="20"
                      src={ArrowSide}
                      className="ArrowSide"
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="block md:hidden">
        <ProductCarousel title={true} productList={sortedData} />
      </div> */}
    </>
  );
};

export default ProductCard;
