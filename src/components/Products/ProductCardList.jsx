

import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";
import { handleProductList } from "@/api/HomePageApi";

const ProductCardList = async () => {

  let productList = await handleProductList()
  productList = productList?.sort((a, b) => a.ProductOrder - b.ProductOrder)
  return (
    <div className="max-w-[1280px] m-auto ">
      <Breadcrumbs />
      <h2
        className=" mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
        style={{ marginTop: "2rem" }}
      >
        Products
      </h2>
      <div className="grid lg:grid-cols-3 gap-2 p-3">
        {productList &&
          productList?.map((products, index) => (
            <Link
              className=" mt-2 product-list-card"
              key={products.id}
              prefetch={true}
              href={"/products/" + products.ProductId}
            >
              <div className="productListTitle  text-center border rounded-lg bg-[#ff0169] p-8 md:text-xl text-base shadow-md transition duration-300 text-white hover:bg-white hover:text-black  ">
                {products.ProductName.length > 25
                  ? products.ProductName.slice(0, 25) + "..."
                  : products.ProductName}
              </div>
            </Link>
          ))}
      </div>

    </div>
  );
};

export default ProductCardList;
