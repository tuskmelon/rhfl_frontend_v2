import senderRequest from "@/services/Http";

export const contactUsApi = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate=*");
    return response
}