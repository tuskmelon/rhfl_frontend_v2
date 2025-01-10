import senderRequest from "@/services/Http";

export const getFinancialInformation = async () => {
    const response = await senderRequest("get", "financial-information-financial-highlights?populate=*");
    return response;
};

export const getQuarterlyResults = async () => {
    const response = await senderRequest("get", "financial-information-quarterly-results?populate=*&sort[0]=FinancialYear:DESC");
    return response;
};

export const getAnnualReports = async () => {
    const response = await senderRequest("get", "financial-information-annual-report?populate=*");
    return response;
};

export const getCreditRatings = async () => {
    const response = await senderRequest("get", "financial-information-credit-ratings?populate=*");
    return response;
};