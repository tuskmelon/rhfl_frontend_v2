import senderRequest from "@/services/Http"

export const handleQueries = async () => {
    const response = await senderRequest('get', 'faq-query-complaints?populate=*');
    return response;
}

export const getGeneralQueries = async () => {
    const response = await senderRequest('get', 'faq-general-informations?populate=*')
    return response
}
export const getHomeLoanGuideQueries = async () => {
    const response = await senderRequest('get', 'faq-home-loan-guide-tax-benefits?populate=*')
    return response
}

export const getHomeLoanProcessQueries = async () => {
    const response = await senderRequest('get', 'faq-home-loan-guide-home-loan-process-at-rhfls?populate=*')
    return response
}
export const getHomeLoanSupportQueries = async () => {
    const response = await senderRequest('get', 'faq-home-loan-guide-supporting-documents?populate=*')
    return response
}