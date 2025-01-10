'use client'
import Link from 'next/link';
import React from 'react'
import { useState } from 'react'

const SubMenuProduct = ({ productList }) => {

    const [isMenuHidden, setIsMenuHidden] = useState(true);

    const hideMenuOnClick = async () => {
        await new Promise(resolve => {
            setIsMenuHidden(false);
            setTimeout(resolve, 0);
        });
        setIsMenuHidden(true);
    };

    return (

        <li className={`${isMenuHidden ? 'group' : ''} relative`}>
            <button
                id="dropdownHoverButton"
                // data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className="py-2 navHeadli text-sm text-gray-600 flex items-center rounded md:bg-transparent md:hover:text-[#FF0169] md:p-0 md:dark:hover:text-[#FF0169] md:text-gray-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
                type="button"
            >
                Products
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div
                id="" style={{ width: "1200px" }}
                className="w-[100%] absolute left-[-500%] border-none  mx-auto rounded-t-none rounded-b-[10px]   nav-mega-menu  shadow-sm  md:bg-red dark:bg-gray-800 dark:border-gray-600 text-sm border-t-[1px]  text-gray-700 dark:text-gray-200 group-hover:block hidden"
            >
                <div className="mt-10 bg-transparent">
                </div>
                <div className="grid  grid-cols-3 w-full border-[#ff0169] bg-white px-4 py-5 mx-auto shadow-md text-gray-900 dark:text-white md:px-6 text-sm  border-t-[1px]   text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownHoverButton">
                    <ul className="col-span-2 flex items-center justify-around p-5" >
                        <div className="">
                            <h4 className="SpecialLoan text-lg">
                                Repco Loans
                            </h4>
                            {productList?.length
                                ? productList?.slice(0, (productList?.length / 2)).map(
                                    (products, index) =>
                                        !products.IsASpecialProduct && (
                                            <li key={index} onClick={hideMenuOnClick}>
                                                <Link
                                                    prefetch={true}
                                                    href={"/products/" + products.ProductId}
                                                    className="block p-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
                                                >
                                                    <p className="font-medium">{products.ProductName}</p>
                                                </Link>
                                            </li>

                                        )
                                )
                                : null}

                            {/* <li onClick={hideMenuOnClick}>
                                <Link
                                    prefetch={true}
                                    href={"/products/"}
                                    className="block p-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
                                >
                                    <p className="font-medium">Hello</p>
                                </Link>
                            </li> */}
                        </div>
                        <hr className="" style={{ height: "100%", border: "1px solid #F8F8FF" }} />
                        <div>
                            {productList?.length
                                ? productList?.slice((productList?.length / 2),).map(
                                    (products, index) =>
                                        !products.IsASpecialProduct && (
                                            <li key={index} onClick={hideMenuOnClick}>
                                                <Link
                                                    prefetch={true}
                                                    href={"/products/" + products.ProductId}
                                                    className="block p-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
                                                >
                                                    <p className="font-medium">{products.ProductName}</p>
                                                </Link>
                                            </li>
                                        )
                                )
                                : null}
                        </div>
                        <hr className="" style={{ height: "100%", border: "1px solid #F8F8FF" }} />
                    </ul>
                    <ul className="p-5">
                        <h4 className="SpecialLoan text-lg">
                            Repco Special Loans
                        </h4>
                        {productList?.length
                            ? productList?.map(
                                (products, index) =>
                                    products?.IsASpecialProduct && (

                                        <li key={index} onClick={hideMenuOnClick}>
                                            <Link
                                                prefetch={true}
                                                href={"/products/" + products.ProductId}
                                                className="block pt-3 pb-3 ps-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
                                            >
                                                <p className="font-medium">{products.ProductName}</p>
                                            </Link>
                                        </li>
                                    )
                            )
                            : null}
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default SubMenuProduct