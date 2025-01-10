import senderRequest from "@/services/Http";


export const AreaCalculatorApi = async () => {
    const response = await senderRequest("get", "area-conversion-calculators?populate=*&sort[0]=createdAt:asc");
    return response
}