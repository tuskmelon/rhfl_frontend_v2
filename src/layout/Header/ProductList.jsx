// import Link from "next/link";


// const ProductList = async ({ productList }) => {

//   // console.log(productList, "productList");



//   return (
//     <div className="grid  grid-cols-3 w-full border-[#ff0169] bg-white px-4 py-5 mx-auto shadow-md text-gray-900 dark:text-white md:px-6 text-sm  border-t-[1px]   text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownHoverButton">
//       <ul className="col-span-2 flex items-center justify-around p-5 mt-5 " >
//         <div className="">
//           <h4 className="SpecialLoan text-lg">
//           Repco Loans
//           </h4>
//           {productList?.length
//             ? productList?.slice(0, (productList?.length / 2)+1).map(
//               (products, index) =>
//                 !products.IsASpecialProduct && (
//                   <li key={index}>
//                     <Link
//                       prefetch={true}
//                       href={"/products/" + products.ProductId}
//                       className="block p-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
//                     >
//                       <p className="font-medium">{products.ProductName}</p>
//                     </Link>
//                   </li>

//                 )
//             )
//             : null}
//         </div>
//         <hr className="" style={{ height: "100%", border: "1px solid #F8F8FF" }} />
//         <div>
//           {productList?.length
//             ? productList?.slice((productList?.length / 2)+1,).map(
//               (products, index) =>
//                 !products.IsASpecialProduct && (
//                   <li key={index}>
//                     <Link
//                       prefetch={true}
//                       href={"/products/" + products.ProductId}
//                       className="block p-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
//                     >
//                       <p className="font-medium">{products.ProductName}</p>
//                     </Link>
//                   </li>
//                 )
//             )
//             : null}
//         </div>
//         <hr className="" style={{ height: "100%", border: "1px solid #F8F8FF" }} />
//       </ul>
//       <ul className="p-5">
//         <h4 className="SpecialLoan text-lg">
//           Repco Special Loans
//         </h4>
//         {productList?.length
//           ? productList?.map(
//             (products, index) =>
//               products?.IsASpecialProduct && (

//                 <li key={index}>
//                   <Link
//                     prefetch={true}
//                     href={"/products/" + products.ProductId}
//                     className="block pt-3 pb-3 ps-3 rounded-lg hover:text-white dark:hover:bg-white hover:bg-[#FF0169]"
//                   >
//                     <p className="font-medium">{products.ProductName}</p>
//                   </Link>
//                 </li>
//               )
//           )
//           : null}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
