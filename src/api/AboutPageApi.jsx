import senderRequest from "@/services/Http";


export const handleAboutUs = async () => {
    const response = await senderRequest("get", "repco-bank-detail?populate=*");
    // console.log("API Data:", response);
    return response

}

export const handleBoardOfDirectors = async () => {
    const response = await senderRequest("get", "board-of-directors?populate[profile][populate][0]=img");
    // console.log("API Data:", response);
    return response
}