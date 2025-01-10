import senderRequest from "@/services/Http";

export const footerDetails = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate=*");
    return response
}
export const handleHeaderLogo = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate[Logo][populate][0]=img");
    return response
}
export const handleSocialMediaLogo = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate[SocialIcons][populate][0]=img");
    return response
}
export const handleFixedSocialMedia = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate[SocialIconsFloat][populate][0]=img");
    return response
}