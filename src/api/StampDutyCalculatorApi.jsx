import senderRequest from "@/services/Http";


export const StampDutyCalculatorApi = async () => {
    const response = await senderRequest("get", "stamp-duty-calculators?populate=*&sort[0]=createdAt:asc");
    return response
}