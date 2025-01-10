import senderRequest from "@/services/Http";

export const NewsUpdate = async () => {
    const response = await senderRequest("get", "news-updates?populate=*&filters[HasEndDate][$eq]=false&sort[0]=createdAt:desc");
    //console.log(response, "response");
    return response;
}