import senderRequest from "@/services/Http";

export const GrievancesApi = async () => {
const response = await senderRequest("get", "grievance-redressals?populate[files][populate][0]=file&sort[0]=createdAt:asc");
return response
}