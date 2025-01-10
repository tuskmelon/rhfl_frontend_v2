import senderRequest from "@/services/Http"

export const getGallery = async () => {
    const response = await senderRequest('get', 'galleries?populate=*&sort[0]=AlbumName:asc')
    return response
}