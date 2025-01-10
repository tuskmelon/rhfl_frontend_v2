import { footerDetails } from "@/api/LayoutApi";
import Link from "next/link";

const FooterDynamic = async () => {

  const repcoDetails = await footerDetails()
  // console.log(repcoDetails, "repcoDetails")
  return (
    <div className="text-center text-black">
      <div className="FooterHeadings headings  text-center">
        {repcoDetails ? (
          <p className="text-wrap whitespace-wrap break-all mb-2">{repcoDetails?.RepcoTitle}</p>
        ) : (
          <p className="mb-2">Repco Home Finance Ltd.</p>
        )}
        <hr />
      </div>
      <div className=" FooterHeading text-center md:leading-8 sm:leading-6 xs:leading-6   font-medium md:text-[14px] text-[14px] tracking-widest">
        {repcoDetails ? (
          <p className="">
            {repcoDetails?.RepcoAddress}
          </p>
        ) : (
          <p className="">
            Alexander Square Third Floor, Old No: 34/35 New No: 2 Sardar Patel
            Road, Guindy, Chennai - 600032.
          </p>
        )}
      </div>
      <div className="font-semibold md:text-[16px] text-[14px] tracking-widest pt-4 pb-4">
        {repcoDetails ? (
          <div>
            <p className="md:leading-8 sm:leading-6 xs:leading-6 break-all">
              Phone:{" "}
              <Link href={`tel:${repcoDetails?.RepcoPhone.replace(/ /g, "")}`}>
                {repcoDetails?.RepcoPhone}
              </Link>{" "}
              | Mobile:{" "}
              <Link href={`tel:${repcoDetails?.RepcoMobile.replace(/ /g, "")}`}>
                {repcoDetails?.RepcoMobile}
              </Link>{" "}
              | Fax:{" "}
              <Link href={`tel:${repcoDetails?.RepcoFax.replace(/ /g, "")}`}>
                {repcoDetails?.RepcoFax}
              </Link>
            </p>
            <p className="md:leading-8 sm:leading-6 xs:leading-6 break-all">
              E-mail:{" "}
              {repcoDetails?.RepcoEmail.split(", ").map((email, index) => (
                <span key={index}>
                  <Link href={`mailto:${email}`}>{email}</Link>
                  {index < repcoDetails?.RepcoEmail.split(", ").length - 1 && ", "}
                </span>
              ))}{" "}
              | Toll-free number:{" "}
              <Link
                href={`tel:${repcoDetails?.RepcoTollFreeNumber.replace(/ /g, "")}`}
              >
                {repcoDetails?.RepcoTollFreeNumber}
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <p className="md:leading-8 sm:leading-6 xs:leading-6 mb-3">
              Phone: <Link href="tel:04442106650">(044) - 42106650</Link> /{" "}
              <Link href="tel:04442106652">42106652</Link> | Mobile:{" "}
              <Link href="tel:9444394918">9444394918</Link> | Fax:{" "}
              <Link href="tel:04442106651">(044) - 42106651</Link>
            </p>
            <p className="md:leading-8 sm:leading-6 xs:leading-6 m-0">
              <Link href="mailto:co@repcohome.com">E-mail: co@repcohome.com</Link> | Toll-free number:{" "}
              <Link href="tel:18004256070">1800-425-6070</Link>
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default FooterDynamic;
