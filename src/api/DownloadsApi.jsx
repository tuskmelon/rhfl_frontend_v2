import senderRequest from "@/services/Http";

export const DownloadsApi = async () => {
    const response = await senderRequest("get", "downloads?populate=*&sort[0]=createdAt:asc");
    return response;
}