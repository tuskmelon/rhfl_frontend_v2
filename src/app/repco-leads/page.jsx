import React from 'react'
import RepcoLeads from './RepcoLeads'
import FormData from '@/components/FormData';
import NewCareer from './NewCareer';
import SalesCareer from './SalesCareer';
import CampaignLeads from './CampaignLeads';


const Page =() => {
    let tabs = [{ label: "Repco Leads", component: <RepcoLeads /> },
    { label: "New Career", component: <NewCareer /> },
    { label: "Sales Career", component: <SalesCareer /> },
    { label: "Campaign Leads", component: <CampaignLeads /> },
    ];
    return (
        <div className='p-4  max-w-[1280px] md:m-auto'>
            <FormData tabs={tabs} />
        </div>
    )
}

export default Page