import senderRequest from "@/services/Http";

export const branchDetails = async (type) => {
    // console.log(type, "type", `locator-states?populate=${type}&fields=id,State&sort=State:asc&pagination[limit]=100`);
    const response = await senderRequest("get", `locator-states?populate=${type}&fields=id,State&sort=State:asc&pagination[limit]=100`);
    // console.log(response, "response");
    return response
}