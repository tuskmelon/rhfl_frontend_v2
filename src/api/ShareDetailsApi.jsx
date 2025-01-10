import senderRequest from "@/services/Http"

export const getExternalSharePriceInfoNSE = async () => {
    const response = await senderRequest('get', 'get_nse.php')
    return response
}

export const getExternalSharePriceInfoBSE = async () => {
    const response = await senderRequest('get', 'get_bse.php')
    return response
}

export const getShareprice = async () => {
    const response = await senderRequest("get", "share-holding-pattern?populate=*&sort[0]=createdAt:asc");
    return response
}

export const getSharepriceDetails = async () => {
    const response = await senderRequest(
        "get",
        "share-holding-pattern-documents?populate=*&sort[0]=createdAt:asc"
    );

    return response
}

