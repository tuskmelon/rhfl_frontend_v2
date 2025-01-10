import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { REACT_APP_BASE_URL } from "@/env/env";
import "src/components/Home/Products/Product.css";
// import { usePathname } from "next/navigation";

import { handleProductList, handleSpecificProductData } from "@/api/HomePageApi";
import Product_TabSection from "./Product_TabSection";
import { handleDownload } from "@/api/ProductsPageApi";
import ProductCarousel from "../Home/Products/ProductCarousel";
import Link from "next/link";




const Product = async ({ productdetails }) => {

  // const headersObj = await headers();
  // const headerValue = headersObj?.get('x-custom-header') || 'Default Value';
  // const productdetails = headerValue?.split('/')?.pop();

  let productList = await handleSpecificProductData(productdetails);
  // console.log(productList, "productList");
  let AllProductInformation = await handleProductList()


  let downloadDetails = await handleDownload();

  return (
    <div>
      {productList ? (
        <div className="grid grid-cols -mt-4">
          <div
            className={`ProductLabelTop headings bg-cover col-span-2 bg-no-repeat bg-bottom flex justify-center items-center text-center`}
            style={{
              width: "100%",
              height: "20rem",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${productList[0]?.ProductImage?.url})`,
            }}
          >
            <h2 className="text-white font-bold text-[2rem]">
              {productList[0] ? productList[0]?.ProductName : "Loading..."}
            </h2>
          </div>
        </div>

      ) : (
        <div></div>
      )}
      <div className="max-w-[1380px] m-auto">
        <Breadcrumbs />
      </div>
      <div className="mt-4">
        <div className="max-w-[1380px] m-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 gap-md-3 bg-[#FFF9FC] rounded-md  px-5 md:px-10">

            <div className="mb-md-8 mb-0"
              data-aos="fade-right"
              style={{
                width: "100%",
                margin: "auto",
                marginTop: "2rem",

                border: "none",
              }}
            >
              <div className="">
                {productList[0] ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "0.25rem",
                      margin: "auto",
                    }}
                  >
                    {productList[0]?.ProductIllustration?.alternativeText ===
                      "Video" ? (
                      <video
                        className="bsProductImage"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "0.25rem",
                          objectFit: "cover",
                        }}
                        autoPlay
                        muted
                        loop
                      >
                        <source
                          src={

                            productList[0]?.ProductIllustration?.url
                          }
                          type="video/mp4"
                        />
                        Your browser does not support HTML video.
                      </video>
                    ) : (
                      <img
                        className="bsProductImage"
                        style={{
                          maxHeight: "30rem",
                          width: "100%",
                          borderRadius: "0.25rem",
                          objectFit: "cover",
                        }}
                        src={

                          productList[0]?.ProductIllustration?.url
                        }
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="px-3 pt-3 my-2 my-md-5 " data-aos="fade-left">

              <h1 className="text-left md:pt-10 sm:pt-0 mb-5 font-medium headings">
                {productList[0] ? productList[0]?.ProductName : "Loading..."}
              </h1>

              <h3
                className="perProductCardText leading-8 text-md"
                dangerouslySetInnerHTML={{
                  __html: productList && productList[0]?.ProductDescription
                    ? productList[0].ProductDescription
                    : "Loading..."
                }}
              ></h3>

              <Link href="/apply-now" prefetch={true}>
                <button className="productBtn text-white mt-5">Apply Now</button>
              </Link>
            </div>
          </div>
        </div>
        <Product_TabSection
          downloadDetails={downloadDetails}
          productList={productList}
        />
      </div>

      <ProductCarousel
        finalvalue={productdetails}
        productList={AllProductInformation}
      />
    </div>
  );
};

export default Product;
