import senderRequest from "@/services/Http";

export const getCareerList = async () => {
    const response = await senderRequest("get", "job-listings?populate=*&sort[0]=createdAt:asc");
    return response
}
export const getRHFLCareer = async () => {
    const response = await senderRequest("get", "rhfl-careers?populate=*&sort[0]=createdAt:asc");
    return response
}