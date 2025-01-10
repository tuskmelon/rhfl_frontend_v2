import senderRequest from "@/services/Http";

export const getDisclouser = async () => {
    const response = await senderRequest("get", "disclosed-under-regulation-30s?populate=*");
    return response
} 