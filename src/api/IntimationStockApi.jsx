import senderRequest from "@/services/Http"


export const IntimationApi = async () => {
    const response = await senderRequest('get', 'intimation-to-stock-exchanges?populate=*&sort[0]=IntimationTitle:desc')
    return response
}