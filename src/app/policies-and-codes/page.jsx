import { handleAboutUs } from '@/api/AboutPageApi'
import { getCorporateGovernance } from '@/api/CorporateGovernanceApi'
import { fairPracticeCodes } from '@/api/PoliciesAndCodes'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MetaTags } from '@/components/MetaTags'
import { REACT_APP_BASE_URL } from '@/env/env'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export async function generateMetadata() {
  const title = "Policies & Codes | Repco Home Loans";
  const description = "Repco Home Loans - Policies & Codes ";

  const metaData = MetaTags({ title, description });

  return metaData;
}

export const dynamic = 'force-static'; // or 'force-static'
export const revalidate = 60; 
export const fetchCache = 'force-cache';

const Page = async () => {
  const abotRepco = await handleAboutUs()
  const policiesAndCodes = await getCorporateGovernance()
  const fairPractice = await fairPracticeCodes()
  // console.log(fairPractice, "policiesAndCodes")
  return (
    <div className="max-w-[1280px] m-auto ">
      <Breadcrumbs />
      <div className="newupdatebg flex items-center justify-center">
        <h2
          className=" mb-5 font-medium text-center mt-5 text-heading md:text-[1.75rem] text-[1.5rem]"
        // style={{ marginTop: "5rem" }}
        >
          Policies & Codes
        </h2>
      </div>
      <Accordion className="mt-10 mb-10 md:m-1 m-4">

        <AccordionPanel className="rounded-md focus:ring-0">
          <AccordionTitle className="text-black md:text-lg text-md">
            Policies
          </AccordionTitle>
          <AccordionContent className="pt-10 pb-10">
            {
              policiesAndCodes?.length &&
              policiesAndCodes[0]?.Policies?.map((item, index) => (
                <Link href={item.url} key={index} target='_blank' className='flex items-center md:gap-4 gap-2 mb-4 hover:text-[#ff0169] leading-8'>
                  <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                  &nbsp;<p className='md:text-[16px] text-sm'>{item?.name?.split(item?.ext)[0]}</p>
                  {item?.caption ? <p className="pdfCaption">{item?.caption}</p> : ""}
                </Link>
              ))
            }

            {abotRepco?.length > 0 ? <Link className='flex items-center md:gap-4 gap-2 mb-4 hover:text-[#ff0169] leading-8' href={abotRepco[0].KYCPolicy.url} target="_blank"> <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" /> &nbsp;<p className="pdfHighlight text-left m-0 md:text-[16px] text-sm">KYC Policy</p> {abotRepco[0].KYCPolicy.caption ? <p className="pdfCaption">{abotRepco[0].KYCPolicy.caption}</p> : ""}</Link> : null}

            {abotRepco?.length > 0 ? <Link className='flex items-center md:gap-4 gap-2 mb-4 hover:text-[#ff0169] leading-8' href={abotRepco[0].PrivacyPolicy.url} target="_blank"> <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" /> &nbsp;<p className="pdfHighlight text-left m-0 md:text-[16px] text-sm">Privacy Policy</p> {abotRepco[0].PrivacyPolicy.caption ? <p className="pdfCaption">{abotRepco[0].PrivacyPolicy.caption}</p> : ""}</Link> : null}
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel className="rounded-md focus:ring-0">
          <AccordionTitle className="text-black md:text-lg text-md">
            Codes
          </AccordionTitle>
          <AccordionContent className="pt-10 pb-10">
            {
              policiesAndCodes?.length &&
              policiesAndCodes[0]?.Codes?.map((item, index) => (
                <Link href={item.url} key={index} target='_blank' className='flex items-center gap-4 mb-4 hover:text-[#ff0169] leading-8'>
                  <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                  &nbsp;<p>{item?.name?.split(item?.ext)[0]}</p>
                  {item?.caption ? <p className="pdfCaption">{item?.caption}</p> : ""}
                </Link>
              ))
            }
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel className="rounded-md focus:ring-0">
          <AccordionTitle className="text-black md:text-lg text-md">
            Fair Practice Code
          </AccordionTitle>
          <AccordionContent className="pt-10 pb-10">
            {
              fairPractice?.length &&
              fairPractice?.map((item, index) => (
                <Link href={item.PDF[0].url} key={index} className='flex items-center gap-4 mb-4 hover:text-[#ff0169] leading-8'>
                  <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='max-h-[25px]' width={25} height={25} alt="" />
                  &nbsp;<p>{item?.Document.split(item?.ext)[0]}</p>
                  {item?.caption ? <p className="pdfCaption">{item?.caption}</p> : ""}
                </Link>
              ))
            }
          </AccordionContent>
        </AccordionPanel>

      </Accordion>
    </div>
  )
}

export default Page