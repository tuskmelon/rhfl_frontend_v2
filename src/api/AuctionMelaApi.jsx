import senderRequest from "@/services/Http";

export const getAuctionMela = async () => {
    const response = await senderRequest('get', 'auction-regions?populate=*');
    // console.log(response, "response auction mela");
    return response
}
export const getAuctionRegion = async ({ state, city, textSearch }) => {
    let newUrl = `auction-melas?populate[1]=document&populate[0]=image&populate[2]=auction_region.locator_state&sort[0]=createdAt:asc`;


    if (state?.length > 0 || city?.length > 0 || textSearch?.length > 0) {
        newUrl += "&";

        if (state?.length > 0) {
            if (state === 'all') {

            } else {
                newUrl += `filters[auction_region][locator_state][State][$eqi]=${state}&`;
            }
        }

        if (city?.length > 0) {
            newUrl += `filters[auction_region][Region][$eqi]=${city}&`;
        }

        if (textSearch?.length > 0) {
            newUrl += `filters[$or][0][borrower][$containsi]=${textSearch}&filters[$or][1][property][$containsi]=${textSearch}&`;
        }

        newUrl = newUrl.replace(/&$/, "");
    }

    const URL = newUrl;
    console.log(URL, "URL");
    const response = await senderRequest('get', URL);
    // console.log(response, "response");
    return response
}