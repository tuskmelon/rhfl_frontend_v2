'use server'

import senderRequest from "@/services/Http";

export const getPossessionNotices = async () => {
    const response = await senderRequest('get', "possession-notices?populate=*&sort[0]=createdAt:asc");
    return response
}