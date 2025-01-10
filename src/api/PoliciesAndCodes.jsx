import senderRequest from "@/services/Http";

export const fairPracticeCodes = async () => {
    const response = await senderRequest("get", "fair-practice-codes?populate=*&sort[0]=createdAt:asc");
    return response
}