import senderRequest from "@/services/Http";

export const GuidelineValuesApi = async () => {
    const response = await senderRequest("get", "guideline-values?populate=*&sort[0]=createdAt:asc");
    return response
}