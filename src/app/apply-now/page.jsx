import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'
import { ApplyNowForm } from './ApplyNowForm'
import { MetaTags } from '@/components/MetaTags'

export async function generateMetadata() {
  const title = "Apply Now | Repco Home Loans";
  const description = "Repco Home Loans - Apply Now";

  const metaData = MetaTags({ title, description });

  return metaData;
}

const Page = () => {
  return (
    <div className="max-w-[1280px] m-auto ">

      <Breadcrumbs />
      <div className="newupdatebg">
        <h2
          className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]"
        // style={{ marginTop: "5rem" }}
        >
          Apply for Home Loan
        </h2>
      </div>
      <ApplyNowForm />
    </div>
  )
}

export default Page