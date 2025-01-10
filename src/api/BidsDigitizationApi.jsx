
'use server'

import senderRequest from "@/services/Http";

export const getBidsDigitization = async () => {
    const response = await senderRequest('get', "bids-digitizations?populate=*&sort[0]=StartDate:desc&sort[1]=EndDate:desc");
    return response;
};