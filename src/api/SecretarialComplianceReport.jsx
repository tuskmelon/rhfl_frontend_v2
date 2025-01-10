import senderRequest from "@/services/Http";

export const SecretarialComplianceReport = async () => {
    const response = await senderRequest("get", "secretarial-compliance-reports?populate=*");
    return response
}