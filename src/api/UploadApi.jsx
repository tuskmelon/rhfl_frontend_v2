import senderRequest from "@/services/Http";

export const UploadFile = async (file) => {
    // const formData = new FormData();
    // formData.append("file", file); // Append file to the FormData object
    console.log(file, "file");
    const response = await senderRequest(
        "post",
        "upload",
        "",
        "ff91ae1adb856b57349a95593be219a5fb63fb790a83be13fd1ad8763459bb2bec348b5f1dd7b55586e1375f0ec4b16076654f7c08471e9213ed6fcd1463423e23b28b7062f32635b9a99f85c756b4a5245295f21837f5b257b56f8d0dd2c6f4ecb0c100edaeccaf43cd0e9f2ee12e313cabbdef54fd8d23d8cb28340554246c",
        file,
        "",
    );

    return response;
};
