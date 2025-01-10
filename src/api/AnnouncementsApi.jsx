import senderRequest from "@/services/Http"

export const handleAnnouncements = async () => {
    const response = await senderRequest('get', 'announcements-pages?populate=*&sort[0]=createdAt:asc');
    return response;
}