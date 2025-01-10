import senderRequest from "@/services/Http"

export const getInvestorsCalender = async () => {
    const response = await senderRequest('get', 'investor-calendars?populate=*&filters[HasEndDate][$eqi]=0')
    return response
}
export const getInvestorsFAQ = async () => {
    const response = await senderRequest('get', 'investor-faqs?populate=*')
    return response
}
export const getInvestorsContact = async () => {
    const response = await senderRequest('get', 'investor-contacts?populate=*&sort[0]=createdAt:desc')
    return response
}
export const getInvestorsContactInformation = async () => {
    const response = await senderRequest('get', 'investor-contacts?filters[documentId][$eq]=ysj6sh7e2nyb2zd3awld68ze&populate=*')
    return response
}
export const getInvestorsUnclaimedDividends = async () => {
    const response = await senderRequest('get', 'unclaimed-dividends?populate=*&sort[0]=createdAt:asc')
    return response
}
export const getInvestorsTDS = async () => {
    const response = await senderRequest('get', 'tds-on-dividends?populate=*&sort[0]=createdAt:asc')
    return response
}