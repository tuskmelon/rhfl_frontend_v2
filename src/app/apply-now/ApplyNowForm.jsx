"use client";

import { useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { handleInputValidation } from "@/helper/handleInputValidation";
import { HomeLoanFormApi } from "@/api/HomeLoanFormApi";
import CryptoJS from "crypto-js";

import toast from "react-hot-toast";

export function ApplyNowForm() {

    const [formData, setFormData] = useState({
        Name: "",
        MobileNumber: "",
        EmailID: "",
        PropertyLocation: "",
        State: "",
        Pincode: "",
        LoanPurpose: "",
        LoanAmount: "",
        IncomeStatus: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const encryptValue = (value) => {
        return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
    };

    const encryptFormData = (data) => {
        const encryptedData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                encryptedData[key] = encryptValue(data[key]);
            }
        }
        return encryptedData;
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const encryptedData = encryptFormData(formData);
        // console.log(encryptedData);
        try {

            const response = await HomeLoanFormApi(encryptedData);
            // console.log(response, "response",response?.response?.data?.errors[0].message);
            if (response?.data?.status === 200) {
                setIsLoading(false);
                toast.success('Form submitted successfully');
                setFormData({
                    Name: "",
                    MobileNumber: "",
                    EmailID: "",
                    PropertyLocation: "",
                    State: "",
                    Pincode: "",
                    LoanPurpose: "",
                    LoanAmount: "",
                    IncomeStatus: "",
                })
            } else {
                setIsLoading(false);
                console.log(response, "response");
                toast.error(response?.response?.data?.message || response?.data?.message ||  response?.response?.data?.error || response?.response?.data?.errors[0]?.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error, "error");
            setIsLoading(false);
            toast.error(error?.response?.data?.message ||error?.response?.data?.error?.message || error?.response?.data?.errors[0]?.message || error?.message || "❗Something went wrong. Please try again.");
        }

    }

    // const decryptedData = JSON.parse(CryptoJS.AES.decrypt("U2FsdGVkX1/3gMbVqluuleNc9hqXghuBBVpIIbY10EkpkVu0ogNAERSjgTIidonOiQF+5+kVPe2wUFWtIFo1y/jcVRv47lSiNaerztaDTNM2h2bR0a1ZHOv6Qddj7F3Kz/QJvK49w01YWc2Cu3xfylmdFOu+C2VydmkETAty/7RdhGgsGU8zl/O47Z6fJHxwB8fPtqGnuyzQ2miRYLisYSwtPK3oQo02DYtAOrMDOVzqS2NWWT1VX7UlKkeUFFGPiU/3HPSE3uypCcI686ALPrv0H35l3aCXMU+QhRHFasB/n9G1VFff1MtQp1Nx/7L3fbBuo+FyT0whl04gFtxsZWTNxGtycyYvN6YxFWII9+8=", secretKey).toString(CryptoJS.enc.Utf8));
    // //console.log(decryptedData, "decryptedData");


    return (
        <form className="md:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:m-3 m-5 gap-4 border-2 border-gray-200 p-5 pt-8 rounded-lg" onSubmit={(e) => handleSubmit(e)}>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name *" />
                </div>
                <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.Name}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 1, "Name")}

                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="mobileNumber" value="Mobile Number *" />
                </div>
                <TextInput
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.MobileNumber}
                    minLength={10}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 2, "MobileNumber")}
                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Email ID *" />
                </div>
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.EmailID}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 4, "EmailID")}
                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="propertyLocation" value="Property Location *" />
                </div>
                <TextInput
                    id="propertyLocation"
                    name="propertyLocation"
                    type="text"
                    placeholder="Enter the property location"
                    value={formData.PropertyLocation}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 1, "PropertyLocation")}
                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="state" value="State *" />
                </div>
                <Select
                    id="State"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Karanataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telengana">Telengana</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="West Bengal">West Bengal</option>
                </Select>
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="pincode" value="Pincode *" />
                </div>
                <TextInput
                    id="Pincode"
                    name="Pincode"
                    type="text"
                    placeholder="Enter the pincode"
                    value={formData.Pincode}
                    minLength={6}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 6, "Pincode")}
                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="loanPurpose" value="Loan Purpose *" />
                </div>
                <Select
                    id="LoanPurpose"
                    name="LoanPurpose"
                    value={formData.LoanPurpose}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Loan purpose</option>
                    <option value="Construction of House Flat">House construction</option>
                    <option value="Purchase of House Flat">House purchase</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Loan Against Property">Loan Against Property</option>
                    <option value="Plot Purchase">Plot Purchase</option>
                    <option value="Commercial Property">Commercial Property</option>
                </Select>
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="loanAmount" value="Required Loan Amount *" />
                </div>
                <TextInput
                    id="LoanAmount"
                    name="LoanAmount"
                    type="number"
                    placeholder="Enter the loan amount"
                    value={formData.LoanAmount}
                    onChange={(e) => handleInputValidation(e.target.value, setFormData, 7, "LoanAmount")}
                    required
                />
            </div>
            <div className="md:mb-0 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="incomeStatus" value="Income Status *" />
                </div>
                <Select
                    id="IncomeStatus"
                    name="IncomeStatus"
                    value={formData.IncomeStatus}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Income status</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Business">Business</option>
                    <option value="Others">Others</option>
                </Select>
            </div>
            <div className="col-span-3 m-auto">
                <button
                    type="submit"
                    className="rounded-md p-2.5 text-white font-medium bg-[#ffa500] w-full"
                    style={{ backgroundColor: '#ffa500', border: 'none' }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div> {/* Spinner */}
                            <span className="ml-2">Submitting...</span>
                        </div>
                    ) : (
                        "Apply for Home Loan"
                    )}
                </button>
            </div>
        </form>
    );
}
