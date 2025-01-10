import senderRequest from "@/services/Http";

export const getReturns = async () => {
    const response = await senderRequest("get", "annual-returns?populate=*&sort[0]=createdAt:asc");
    return response
};