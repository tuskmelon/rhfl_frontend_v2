"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import ArrowSide from "../../../assets/arrowside.svg";
import Image from "next/image";
import "./Product.css"


const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductCarousel = ({ finalvalue, title, productList }) => {
  productList = productList?.filter((item) => item?.ProductId !== finalvalue)
 

  return (
    <div className="bg-white">
      <h2
        className="mb-5 mt-5 font-semibold text-center text-heading md:text-[2.75rem] text-[1.5rem]"

      >
        {title ? (
          <>
            <span className="text-[#414141]">Our</span> Products
          </>
        ) : (
          <>
            <span className="text-[#414141]">Our</span> Other Products
          </>
        )}
      </h2>




      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >

        {
          productList?.length > 0 && productList?.map((product, index) => (
            <div
              key={index}
              style={{
                margin: "1rem",
                borderRadius: "0.25rem",
              }}
            >
              <Link href={`/products/${product.ProductId}`} prefetch={true}>
                <div className="card-col shadow-md">
                  {/* Front Side */}
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        {product.ProductImage ? (
                          <img
                            className="rounded-none"
                            src={product.ProductImage.url}
                            alt={
                              product.ProductName
                                ? product.ProductName
                                : "Loading..."
                            }
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
                        <div className="block-with-text scroll-smooth overflow-y-scroll hide-scrollbar">
                          {product.ProductPreviewText
                            ? product.ProductPreviewText
                            : "Loading..."}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Title */}
                  <div className="titlebg flex justify-between items-center p-2 shadow-md rounded-xl">
                    <h3 className="m-0 p-3 text-left text-lg font-medium flex items-center">
                      {product.ProductName || "Loading..."}
                    </h3>
                    <Image
                      width="20"
                      height="20"
                      src={ArrowSide}
                      alt="Arrow"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </Carousel>
    </div>

  );
};

export default ProductCarousel;
