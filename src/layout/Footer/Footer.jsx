import Link from "next/link";
import "./Footer.css";
import Image from "next/image";
import { REACT_APP_BASE_URL } from "@/env/env";
import FooterDynamic from "./FooterDynamic";
import FooterSocialMedia from "./FooterSocialMedia";

const Footer = () => {
  return (
    <div className="Footer-wrapper font-weight-bold">
      <div className="Base-wrapper  md:max-w-[87%] max-w-[95%] m-auto">
        <div className="footer grid justify-between items-start  lg:grid-cols-4 grid-cols-2">
          <div className="text-left">
            <p className="headings FooterHeadings">Our Company</p>
            <div className="flex flex-col leading-7 font-medium text-black">
              <div className="">
                <Link prefetch={true} href="/about" className="text-[0.9rem] font-semibold">About Us</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/products" className="text-[0.9rem] font-semibold">Products</Link>
              </div>
              {/* <div className="">Investors</div>
          <div className="">Media</div> */}
              <div className="">
                <Link prefetch={true} href="/careers" className="text-[0.9rem] font-semibold">Careers</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/contact" className="text-[0.9rem] font-semibold">Contact</Link>
              </div>
            </div>
          </div>
          <div className="text-left">
            <p className="headings FooterHeadings">Useful Links</p>
            <div className="flex flex-col leading-7 font-medium text-black">
              <div className="">
                <Link prefetch={true} href="/branches" className="text-[0.9rem] font-semibold">Find A Branch</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/faqs" className="text-[0.9rem] font-semibold">FAQs</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/policies-and-codes" className="text-[0.9rem] font-semibold">Policies &amp; Codes</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/downloads" className="text-[0.9rem] font-semibold">Downloads</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/gallery" className="text-[0.9rem] font-semibold">Gallery</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/grievances" className="text-[0.9rem] font-semibold">Grievance Redressal</Link>
              </div>
              <div className="">
                <Link prefetch={true} href="/recovery-agency" className="text-[0.9rem] font-semibold">Recovery Agency</Link>
              </div>
            </div>
          </div>
          <div className="text-left">
            <p className="headings FooterHeadings">Our Calculators</p>
            <div className="flex flex-col leading-7 font-medium text-black">
              <div className="">
                <Link href="/emi-calculator" prefetch={true} className="text-[0.9rem] font-semibold">EMI Calculator</Link>
              </div>
              <div className="">
                <Link href="/eligibility-calculator" prefetch={true} className="text-[0.9rem] font-semibold">
                  Eligibility Calculator
                </Link>
              </div>
              <div className="">
                <Link href="/other-calculators" className="text-[0.9rem] font-semibold" prefetch={true}>Other Calculators</Link>
              </div>
            </div>
            {/* <div className=""><Link href="/stamp-duty-calculator">Stamp Duty Calculator</Link></div>
        <div className=""><Link href="/area-conversion-calculator">Area Conversion Calculator</Link></div>
        <div className=""><Link href="/guideline-values">Guideline Values</Link></div> */}
          </div>
          <div className="text-left">
            <p className="headings FooterHeadings">Follow</p>
            <div>
              <div className="p-0 flex justify-start gap-4">
                <FooterSocialMedia />
              </div>
            </div>
          </div>
        </div>
        <div className="std-height mt-6">
          <FooterDynamic />
        </div>
      </div>
      <div className="pt-2 pb-2 ps-2 pe-2 bg-[#ff0169] md:text-base text-xs flex lg:flex-row flex-col  md:justify-around  md:gap-0 gap-3 items-center text-white font-medium">
        <p className="m-0 ">
          Copyright © 2021 Repco Home Finance. All Rights Reserved.
        </p>
        <p className="m-0 text-white">

          <Link
            className="text-white  font-semibold"
            href="https://www.tuskmelon.com/"
            target="_blank"

          >
            Designed By
            Tuskmelon
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
