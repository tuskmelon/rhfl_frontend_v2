'use server'

import axios from "axios";
import {REACT_APP_BASE_URL} from "../env/env";

//console.log(REACT_APP_BASE_URL, "url");
const apiUrlWithId = (apiurl, id) => {
  //console.log(id, "id", `${REACT_APP_BASE_URL}/${apiurl}`, "url");
  return id?.length
    ? `${REACT_APP_BASE_URL}/${apiurl}/${id}`
    : `${REACT_APP_BASE_URL}/${apiurl}`;
};

const handleResponse = (response) => {
  // //console.log(response, "response12344");
  if(response.status===200){
    return response?.data?.data;
  }else{
    return []
  }
};

const handleError = (error) => {
  if (error?.request) {
    //console.log(error.request)
    // throw new Error(error.request);
  } else if (error?.response) {
    //console.log(error?.response?.data)
    // throw new Error(error?.response?.data);
  } else {
    //console.log(error?.message || "Request Erroe")
    // throw new Error(error?.message || "Request Erroe");
  }
};

const senderRequest = async (
  method,
  apiUrl,
  id = "",
  token = "bc59990faffae9f968b54ea80debbd373c537ede13dba7ba9c488b63e684d611201dd021b2c63cb43444159115c8536e14eb071dc05296432b2197ba6a41eb6957653f984e992e3e6ad6479df3fbac803b278e339b4206fb8e4299f6a149a1e0cde9d6e2c2d5e6370a31b285c3ccfcd0eb1f38d0bc297ead7cfdc0bf0ad46065",
  body = {},
  new_url
) => {
  let response;
  let url = apiUrlWithId(apiUrl, id, new_url);
  try {
    switch (method.toLowerCase()) {
      case "get":
        response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }
        });
        break;
      case "post":
        response = await axios.post(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }
        });
        break;
      case "put":
        response = await axios.put(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        break;
      case "delete":
        response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        break;
      case "patch":
        response = await axios.patch(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        break;
      default:
        throw new Error("Method not allowed");
    }
    return handleResponse(response);
  } catch (error) {
    // console.log(error, "error");
    handleError(error);
  }
};

export default senderRequest;
