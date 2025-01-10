'use server'

import senderRequest from "@/services/Http";

// export const handleProjectList = async () => {
//     const response = await senderRequest("get", "product-lists");
//     return response
// };

export const handleDownload = async () => {
    const response = await senderRequest("get", "downloads?populate=*");
    return response
}