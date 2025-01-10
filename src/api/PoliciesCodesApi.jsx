import senderRequest from "@/services/Http";

export const PoliciesCodeApi = async () => {
    const response = await senderRequest("get", "policies-codes?populate=*&sort[0]=createdAt:asc");
    return response
}