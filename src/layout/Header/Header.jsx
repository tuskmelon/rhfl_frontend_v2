'use server'
import Link from "next/link";
import "./Header.css";
import "../../app/globals.css";
import HeaderModal from "@/components/Modals/HeaderModal";
import HeaderLogo from "./HeaderLogo";
import HeaderPercentage from "./HeaderPercentage";
import SubMenu1 from "./SubMenu1";
import SubMenu2 from "./SubMenu2";
import SubMenu3 from "./SubMenu3";
import MobileHeader1 from "./MobileHeader1";
import { handleProductList } from "@/api/HomePageApi";
import SubMenuProduct from "./SubMenuProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FixedSocial from "./FixedSocial";
import { handleHeaderLogo } from "@/api/LayoutApi";

const Header = async () => {

  const productList = await handleProductList()
  const headerLogo = await handleHeaderLogo();

  return (
    <div>
      <div className="sticky-right" data-aos="fade-left">
        <ul className="social-right  rounded-s-sm rounded-b-sm  bg-GlassEffect" >
          {/* <li className="fb">
            <a href="https://www.facebook.com/RepcoHomeFinanceLtd/" target="_blank">
              <Image
                style={{ width: "1.15rem" }}
                src={
                  'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/facebook_4bf1e9993d.png'
                }
                width={25}
                height={25}
                alt="facebook_link"
              />
            </a>
          </li>
          <li
            className="twitter"
          >
            <a href="https://twitter.com/RepcoHome" target="_blank">
              <Image
                style={{ width: "1.15rem" }}
                src={
                  'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/twitx_fea282ca30_eee7e3da14.png'
                }
                width={25}
                height={25}
                alt="twitter_link"
              />
            </a>
          </li>
          <li
            className="call" style={{ backgroundColor: "orange" }}
          >
            <a href="tel:9444394918">
              <FontAwesomeIcon style={{ width: "1.15rem", transform: "rotate(90deg)", color: "white" }} icon={faPhone} />
            </a>
          </li>
          <li
            className="tollfree" style={{ backgroundColor: "green" }}
          >
            <a href="https://api.whatsapp.com/send/?phone=917823916503">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.15rem" viewBox="0 0 448 512"><path style={{ width: "1.15rem", fill: "white" }} d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
            </a>
          </li> */}
          <FixedSocial />
        </ul>
      </div>
      <nav className="bg-white dark:bg-gray-900   md:fixed lg:block hidden w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="bg-[#ff0169]">
          <h2
            className="m-0 text-center font-medium text-white  md:text-[14px] text-[10px] leading-5"
          >
            <HeaderPercentage

            />
          </h2>
        </div>
        <div className=" w-full md:flex  items-center justify-around mx-auto">
          <Link prefetch={true} href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <HeaderLogo
              headerLogo={headerLogo}
            />
          </Link>
          <ul className="navHeadul flex  flex-col md:flex-row border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse  md:mt-0 md:border-0 items-center md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link prefetch={true} href="/about" className="navHeadli block py-2 text-sm md:hover:text-[#FF0169] md:p-0 md:dark:hover:text-[#FF0169]  bg-blue-700 rounded md:bg-transparent md:text-gray-700  md:p-0 md:dark:text-blue-500" aria-current="page">About us</Link>
            </li>
            <SubMenu1 />
            <SubMenuProduct
              productList={productList}
            />
            <SubMenu2 />
            <li>
              <Link prefetch={true} href="/careers" className="navHeadli block md:hover:text-[#FF0169] text-sm text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Careers</Link>
            </li>
            <SubMenu3 />
            <li className="">
              <Link prefetch={true} href="/blogs" className="navHeadli block py-2 text-sm text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF0169] md:p-0 md:dark:hover:text-[#FF0169] dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blogs</Link>
            </li>
            <li className="truncate">
              <Link prefetch={true} href="/apply-now" className=" navApplyNow block py-2 text-sm text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Apply Now!</Link>
            </li>
            <li className=" truncate">
              <HeaderModal />
            </li>
          </ul>
        </div>



      </nav>

      <MobileHeader1
        headerLogo={headerLogo}
        productList={productList}
      />
    </div>
  );
};

export default Header;
