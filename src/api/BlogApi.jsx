import senderRequest from "@/services/Http";


export const blogCarousel = async () => {
    const response = await senderRequest("get", "blogs?populate=*&sort[0]=date:desc");
    //console.log(response, "responseCarousel");
    return response
};
export const blogList = async (blogDetails) => {
    const response = await senderRequest("get", `blogs?populate=*&filters[slug]$eqi=${blogDetails}`);
    // console.log(response, "responseCarousel");
    return response
};