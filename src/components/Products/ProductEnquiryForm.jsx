'use client'
import senderRequest from "@/services/Http";
import React, { useState } from "react";

const ProductEnquiryForm = () => {
  const [responseModal, setResponseModal] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");

  const [errors, setErrors] = useState({});
  const submitForm = () => {
    if (
      validateAndSetError("name", name, "Name is required") ||
      validateAndSetError(
        "mobileNumber",
        mobileNumber,
        "Mobile Number is required"
      ) ||
      validateAndSetError("emailId", emailId, "Email Id is required") ||
      validateAndSetError("message", message, "Message is required") ||
      validateAndSetError("pincode", pincode, "Pincode is required") ||
      validateAndSetError("location", location, "Location is required")
    ) {
      return;
    }

    const response = senderRequest("POST", "/enquiry-forms", "", "", {
      name,
      mobileNumber,
      emailId,
      message,
      pincode,
      location,
    });

    if(response.data.status){

    }else{

    }
  };

  function validateAndSetError(fieldName, fieldValue, errorMessage) {
    if (!fieldValue) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
      return true;
    }
    return false;
  }
  return (
    <div className="bg-[#FFF1F7] rounded-lg shadow-md m-3">
      <h2 className=" font-medium text-center pt-10 pb-10 text-2xl  text-[#FF0169]">
        {" "}
        Enquiry Form
      </h2>
      <form className=" mx-auto  grid grid-cols-2 gap-4 p-4 pb-5" onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              submitForm();
            }}>
        <div className="mb-5">
          <label
            className="block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Name *
          </label>
          <input
            type="text"
            id="Name"
            className={`border-0 focus:ring-0 bg-transparent border-b border-b-black text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            ${errors.name ? "border-b-red-500" : "border-b-black"}`}
            placeholder=""
            value={name}
            onChange={(e) => handleInputValidation(e.target.value, setName, 2)}
          />
          {errors.name && (
            <div className="text-red-500 text-left mt-1">{errors.name}</div>
          )}
        </div>
        <div className="mb-5">
          <label
            className="block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobileNumber}
            onChange={(e) =>
              handleInputValidation(e.target.value, setMobileNumber, 2)
            }
            className={`border-0  focus:ring-0 bg-transparent border-b border-b-black text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            ${errors.mobileNumber ? "border-b-red-500" : "border-black"}
            `}
          />
          {errors.mobileNumber && (
            <div className="text-red-500 text-left mt-1">
              {errors.mobileNumber}
            </div>
          )}
        </div>
        <div className="mb-5">
          <label
            className="block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Email ID *
          </label>
          <input
            type="email"
            id="email"
            value={emailId}
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            onChange={(e) =>
              handleInputValidation(e.target.value, setEmailId, 4)
            }
            className={`border-0 focus:ring-0 bg-transparent border-b border-b-black  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
            ${errors.emailId ? "border-b-red-500" : "border-black"}`}
          />
          {errors.emailId && (
            <div className="text-red-500 text-left mt-1">{errors.emailId}</div>
          )}
        </div>
        <div className="mb-5">
          <label
            className=" block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Pincode *
          </label>
          <input
            type="tel"
            id="pincode"
            value={pincode}
            maxLength={6}
            pattern="^[1-9][0-9]{6}$"
            onChange={(e) =>
              handleInputValidation(e.target.value, setPincode, 3)
            }
            className={`border-0 focus:ring-0 bg-transparent border-b border-b-black  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${!errors.pincode ? "" : errors.pincode ? "border-b-red-500" : ""}
            
             `}
          />
          {errors.pincode && (
            <div className="text-red-500 text-left mt-1">{errors.pincode}</div>
          )}
        </div>
        <div className="mb-5">
          <label
            className="block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) =>
              handleInputValidation(e.target.value, setLocation, 1)
            }
            className={`border-0 focus:ring-0 bg-transparent border-b border-b-black  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${!errors.location ? "" : errors.location ? "border-b-red-500" : ""}
             `}
          />
          {errors.location && (
            <div className="text-red-500 text-left mt-1">{errors.location}</div>
          )}
        </div>
        <div className="mb-5">
          <label
            className="block mb-2.5 text-base font-normal text-gray-900 dark:text-white"
          >
            Message *
          </label>
          <input
            type="text"
            id="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`border-0 focus:ring-0 bg-transparent border-b border-b-black  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light 
            
            ${!errors.message ? "" : errors.message ? "border-b-red-500" : ""}`}
          />
          {errors.message && (
            <div className="text-red-500 text-left mt-1">{errors.message}</div>
          )}
        </div>

        <button
          type="submit"
          style={{ width: "80%", backgroundColor: "#FF0169" }}
          className="text-white text-base  mb-4 m-auto col-span-2 shadow-md  hover:bg-[#FF0169] focus:ring-0 focus:outline-none focus:ring-blue-300 font-normal rounded-lg px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default ProductEnquiryForm;
