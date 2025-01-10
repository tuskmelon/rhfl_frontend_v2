import senderRequest from "@/services/Http";

export const getAuctionSales = async () => {
    
    const response = await senderRequest(
        "get",
        `auction-sale-files?populate=*&sort[0]=createdAt:asc&pagination[pageSize]=1000`
    );

    return response
};