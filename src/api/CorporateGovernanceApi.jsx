import senderRequest from "@/services/Http";

export const getCorporateGovernance = async () => {
    const response = await senderRequest("get", "corporate-governances?populate=*&sort[0]=createdAt:asc");
    return response
}