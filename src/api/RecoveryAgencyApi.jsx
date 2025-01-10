import senderRequest from "@/services/Http";

export const RecoveryAgencyApi = async () =>{
    const response = await senderRequest("get", "recovery-agencies?populate=*");
    return response
}