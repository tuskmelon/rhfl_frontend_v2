'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Label } from "flowbite-react";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import Breadcrumbs from '@/components/Breadcrumbs';
import CareerImg from "../../assets/salescareerimg.png";
import { handleInputValidation } from '@/helper/handleInputValidation';
import upload from '../../assets/upload.png'
import download from '../../assets/download.png'
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import "./sales.css";
import dynamic from 'next/dynamic';

const MultiSelect = dynamic(() => import('react-select'), { ssr: false });

const SalesCareer = ({ branches }) => {

    const [filteredBranches, setFilteredBranches] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    // const [selectedResume, setSelectedResume] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedResume, setSelectedResume] = useState(null);

    // State for each form input field
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [qualification, setQualification] = useState("");
    const [dob, setDob] = useState(""); // Changed to string
    const [communicationAddress, setCommunicationAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState("");
    const [branch, setBranch] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [timejoin, setTimeJoin] = useState("");
    const [howKnow, setHowKnow] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [previousExperience, setPreviousExperience] = useState(false);
    const [relativeWorking, setRelativeWorking] = useState(false);
    const [sameAddressCheck, setSameAddressCheck] = useState(false);
    const [permanentPincode, setPermanentPincode] = useState("");
    const [selectedBranch, setSelectedBranch] = useState([]);

    const recaptcha = useRef();
    const handleFilter = () => {
        if (selectedState) {
            const filtered = branches.filter((branch) => branch.id == selectedState);
            console.log(selectedState, "selectedState", filtered);
            setFilteredBranches(filtered[0]?.BranchLink.map((branch) => ({
                label: branch.BranchName,
                value: branch
            })));
        } else {
            setFilteredBranches([]);
        }
    }

    useEffect(() => {
        if (selectedState.length > 0) {
            handleFilter();
        }
    }, [selectedState]);

    const encryptValue = (value) => {
        return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
    };

    const encryptFormData = (data) => {
        console.log(data, "data");
        const encryptedData = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                console.log(value, "value");
                if (Array.isArray(value)) {
                    encryptedData[key] = value.map((item) => encryptValue(item.toString()));
                } else {
                    encryptedData[key] = encryptValue(value.toString());
                }
            }

        }
        return encryptedData;
    }

    // const handleFileChange = (e) => {
    //     setSelectedResume(e.target.files[0]);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, mobileNumber, dob, qualification, communicationAddress, permanentAddress, branch, selectedState, pincode, timejoin, howKnow, permanentPincode, relativeWorking, previousExperience);

        if (!name || !email || !mobileNumber || !dob || !qualification || !communicationAddress || !permanentAddress || !branch || !selectedState || !pincode || !timejoin || !howKnow || !permanentPincode
        ) {
            toast.error("❗Please fill in all fields.", {
                style: { fontSize: '12px' },
            });
            recaptcha.current?.reset();
            return;
        }

        if (mobileNumber.length < 10 || mobileNumber.length > 10) {
            toast.error("❗Please enter a valid mobile number.", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset();
            return;
        }

        if (pincode.length < 6 || pincode.length > 6) {
            toast.error("❗Please enter a valid pincode.", {
                style: {
                    fontSize: '12px',
                },
            })
            recaptcha.current?.reset(); 
            return;
        }

        if (permanentPincode.length < 6 || permanentPincode.length > 6) {
            toast.error("❗Please enter a valid pincode.", {
                style: {
                    fontSize: '12px',
                },
            })
            recaptcha.current?.reset();
            return;
        }

        if (!selectedResume) {
            toast.error("❗Please upload resume.", {
                style: { fontSize: '12px' },
            });
            recaptcha.current?.reset();
            return;
        }

        // Assuming recaptcha is defined elsewhere in the component
        const captchaValue = recaptcha.current?.getValue();
        if (!captchaValue) {
            toast.error("❗Please verify the reCAPTCHA!", {
                style: { fontSize: '12px' },
            });
            return;
        }

        const captchaResponse = await handleRecaptchaChange(e, captchaValue);
        if (!captchaResponse?.data?.success) {
            toast.error("❗Invalid reCAPTCHA verification!", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset();
            return;
        }

        setIsLoading(true);

        try {
            const resumeUrl = selectedResume ? await uploadFile(selectedResume) : null;
            const photoUrl = selectedPhoto ? await uploadFile(selectedPhoto) : null;

            const encryptedData = encryptFormData({
                name: name.trim(),
                email: email.trim(),
                mobileNumber: mobileNumber.trim(),
                qualification: qualification.trim(),
                dob: dob.trim(),
                branch: selectedBranch,
                communicationAddress: communicationAddress.trim(),
                pincode: pincode.trim(),
                selectedState: branches?.find((item) => item.id == location)?.State || location.trim(),
                permanentAddress: permanentAddress.trim(),
                timejoin: timejoin.trim(),
                howKnow: howKnow.trim(),
                previousExperience: previousExperience ? 'Yes' : 'No',
                relativeWorking: relativeWorking ? 'Yes' : 'No',
                permanentPincode: permanentPincode.trim(),
            });

            const payload = { ...encryptedData, resumeUrl, photoUrl };
            console.log(payload, "payload");

            const response = await axios.post("/api/sales-career", payload);
            console.log(response, "response");

            if (response?.data?.status === 201) {
                setName("");
                setEmail("");
                setMobileNumber("");
                setDob("");
                setQualification("");
                setCommunicationAddress("");
                setSelectedState("");
                setPincode("");
                setPermanentAddress("");
                setTimeJoin("");
                setHowKnow("");
                setPreviousExperience(false);
                setRelativeWorking(false);
                setLocation("");
                setPermanentPincode("");
                setSameAddressCheck(false);
                setSelectedPhoto(null);
                setSelectedResume(null);
                setSelectedBranch([]);
                setBranch([]);
                // setSelectedBranch([]);
                // recaptcha.current?.reset();


                toast.success("✅Application submitted successfully!", {
                    style: { fontSize: '12px' },
                });
            } else {
                toast.error(response?.response?.data?.message || response?.data?.message || response?.response?.data?.error || response?.response?.data?.errors[0]?.message || "Something went wrong");
                recaptcha.current?.reset();
                setIsLoading(false);

            }
        } catch (error) {

            setIsLoading(false);
            recaptcha.current?.reset();
            toast.error(error?.response?.data?.message || error?.response?.data?.error?.message || error?.response?.data?.errors[0]?.message || error?.message || "❗Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
            recaptcha.current?.reset();
        }
    };

    const changefilechange = (file, type) => {
        if (!file) return;

        const MAX_SIZE = 2 * 1024 * 1024;
        const MAX_FILENAME_LENGTH = 30;

        const fileConditions = {
            resume: {
                allowedTypes: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ],
                setter: setSelectedResume,
                error: "Error: Only PDF, DOC, or DOCX files under 2MB are allowed.",
            },
            photo: {
                allowedTypes: [
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "application/pdf",
                ],
                setter: setSelectedPhoto,
                error: "Error: Only JPEG, PNG, JPG, or PDF files under 2MB are allowed.",
            },
        };

        const condition = fileConditions[type];

        if (condition) {
            if (file.size > MAX_SIZE || !condition.allowedTypes.includes(file.type)) {
                condition.setter(null);
                toast.error(condition.error);
            } else if (file.name.length >= MAX_FILENAME_LENGTH) {
                condition.setter(null);
                toast.error("Error: Filename exceeds 30 characters.");
            } else {
                condition.setter(file);
            }
        }
    };

    const handleRecaptchaChange = async (e, value) => {
        e.preventDefault();
        const response = await axios.post('/api/verify-captcha', { captchaValue: value })
        return response
    }


    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("files", file);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ff91ae1adb856b57349a95593be219a5fb63fb790a83be13fd1ad8763459bb2bec348b5f1dd7b55586e1375f0ec4b16076654f7c08471e9213ed6fcd1463423e23b28b7062f32635b9a99f85c756b4a5245295f21837f5b257b56f8d0dd2c6f4ecb0c100edaeccaf43cd0e9f2ee12e313cabbdef54fd8d23d8cb28340554246c`,
                },
            });


            // console.log(response, "response");

            if (response?.data[0] && response?.data[0]?.url) {
                return response.data[0]?.url;
            } else {
                throw new Error('Invalid response from upload API');
            }
        } catch (error) {
            // console.error('File upload failed:', error.response?.data || error.message);
            toast.error('❗File upload failed! Please try again.', {
                style: {
                    fontSize: '12px',
                },
            });
            throw error;
        }
    };


    const handleChangeBranch = (selectedOptions) => {
        if (selectedOptions?.length <= 3) {
            console.log(selectedOptions, "selectedOptions");
            setBranch(selectedOptions);
            setSelectedBranch(selectedOptions.map((option) => option.label));
        } else {
            toast.error("You can only select up to 3 branches.");
            // alert("You can only select up to 3 options.");
        }
    }


    return (
        <div className="max-w-[1280px] m-auto">
            <div>
                <Breadcrumbs />
                <h2 className="text-center py-6">
                    RHFL is looking for young, dynamic and result-oriented individuals in sales roles for all the branches across Pan India
                </h2>
                <p className="text-center font-semibold">
                    <span className="font-semibold text-[#ff0169]">FE0064 Remuneration <span className="text-red-500">*</span></span>
                    : Salary + Attractive incentive + reimbursement of expenses.
                    <br />
                    <span className="font-semibold">
                        Owning a two-wheeler and valid driving license are a must.
                    </span>
                </p>
            </div>

            <div className="max-w-[1280px] m-auto shadow-xl rounded-lg mb-10">
                <h1
                    className="text-4xl font-medium py-7 text-[#FE0064] text-center uppercase"
                >
                    Sales roles across Pan India
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                    <div>
                        <Image src={CareerImg} className="rounded-md  sticky w-[100%]" alt="Career Image" width={500} height={500} />
                    </div>
                    <div>
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="name" value="Name" />
                                <div className="col-span-2">
                                    <input
                                        className="inpts"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => handleInputValidation(e.target.value, setName, 1)}
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="email" value="Email" />
                                <div className="col-span-2">
                                    <input
                                        id="email"
                                        className="inpts"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => handleInputValidation(e.target.value, setEmail, 4)}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile Number Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="mobileNumber" value="Mobile Number" />
                                <div className="col-span-2">
                                    <input
                                        id="mobileNumber"
                                        type="tel"
                                        className="inpts"
                                        name="mobileNumber"
                                        value={mobileNumber}
                                        onChange={(e) => handleInputValidation(e.target.value, setMobileNumber, 2)}
                                        placeholder="Mobile Number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Date of Birth Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="dob" value="Date of Birth" />
                                <div className="col-span-2">
                                    <input
                                        id="dob"
                                        type="date"
                                        name="dob"
                                        className="inpts"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        min="1990-01-01"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Qualification Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="qualification" value="Highest Educational Qualification" />
                                <div className="col-span-2">
                                    <input
                                        id="qualification"
                                        type="text"
                                        className="inpts"
                                        name="qualification"
                                        value={qualification}
                                        onChange={(e) => handleInputValidation(e.target.value, setQualification, 8)}
                                        placeholder="Highest Educational Qualification"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Previous Experience Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="previousExperience" value="Previous experience in sales" />
                                <div className="col-span-2 flex justify-start gap-3">

                                    <div className="flex items-center">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onClick={(e) => setPreviousExperience(true)}
                                        />
                                        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input defaultChecked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onClick={(e) => setPreviousExperience(false)}
                                        />
                                        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                    </div>

                                </div>
                            </div>

                            {/* Communication Address Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="communicationAddress" value="Communication Address" />
                                <div className="col-span-2">
                                    <input
                                        id="communicationAddress"
                                        type="text"
                                        name="communicationAddress"
                                        className="inpts"
                                        value={communicationAddress}
                                        onChange={(e) => setCommunicationAddress(e.target.value)}
                                        placeholder="Communication Address"
                                        required
                                    />
                                </div>
                            </div>



                            {/* Pincode Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="pincode" value="Pincode" />
                                <div className="col-span-2">
                                    <input
                                        id="pincode"
                                        type="number"
                                        className="inpts"
                                        name="pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        maxLength="6"
                                        placeholder="Pincode"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Permanent Address Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className='col-span-1 flex flex-col'>
                                    <Label htmlFor="permanentAddress" value="Permanent Address" />

                                    <div className="flex items-center mb-4">
                                        <input id="default-checkbox" type="checkbox" value=""
                                            defaultChecked={sameAddressCheck}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onClick={(e) => { setSameAddressCheck(!sameAddressCheck); setPermanentAddress(communicationAddress); setPermanentPincode(pincode) }}
                                        />
                                        <p className='text-[10px]'> (same as communication)</p>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <input
                                        id="permanentAddress"
                                        type="text"
                                        name="permanentAddress"
                                        className="inpts"
                                        value={sameAddressCheck ? communicationAddress : permanentAddress}
                                        onChange={(e) => { setPermanentAddress(e.target.value); setSameAddressCheck(false); }}
                                        placeholder="Permanent Address"
                                        required
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="pincode" value="Pincode" />
                                <div className="col-span-2">
                                    <input
                                        id="pincode"
                                        type="number"
                                        className="inpts"
                                        name="pincode"
                                        value={sameAddressCheck ? pincode : permanentPincode}
                                        onChange={(e) => { setPermanentPincode(e.target.value); setSameAddressCheck(false); }}
                                        maxLength="6"
                                        placeholder="Pincode"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Preference Location Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="preferredLocation" value="Preferred Location" />
                                <div className="col-span-2">
                                    <select
                                        id="location"
                                        className="inpts"
                                        required
                                        value={location}
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                            setSelectedState(e.target.value);
                                        }}>
                                        <option value="" disabled>Select a state</option>
                                        {branches?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.State}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="preferredLocation" value="" />
                                <div className="col-span-2">
                                    <MultiSelect
                                        isMulti
                                        required
                                        options={filteredBranches}
                                        value={branch}
                                        className='col-span-2 '
                                        onChange={handleChangeBranch}
                                        closeMenuOnSelect={false}  // Keep the dropdown open after selecting
                                        maxMenuHeight={300}  // Optional: limit menu height if there are too many options
                                        isSearchable={false}  // Optional: allow search functionality
                                        placeholder="Select Branch"
                                    />
                                </div>
                            </div>

                            {/* How did you know about RHFL Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="howKnow" value="How do you know about RHFL?" />
                                <div className="col-span-2">
                                    <select
                                        id="howKnow"
                                        className="form-select inpts"
                                        name="howKnow"
                                        value={howKnow}
                                        onChange={(e) => setHowKnow(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>How do you know?</option>
                                        <option value="Employees">Employees</option>
                                        <option value="social media">Social Media</option>
                                        <option value="website">Website</option>
                                        <option value="Television">Television</option>
                                        <option value="Friends">Friends</option>
                                        <option value="relatives">Relatives</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </div>

                            {/* Time required for joining Field */}
                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="expectedCTC" value="Time required for joining (in days)" />
                                <div className="col-span-2">
                                    <input
                                        id="expectedCTC"
                                        type="number"
                                        className="inpts"
                                        min={0}
                                        name="expectedCTC"
                                        value={timejoin}
                                        onChange={(e) => setTimeJoin(e.target.value)}
                                        placeholder="Enter in days"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Label htmlFor="working" value="Is any of your relatives working in RHFL ?" />
                                <div className="col-span-2 flex justify-start gap-3">

                                    <div className="flex items-center">
                                        <input
                                            id="relative-radio-yes"
                                            type="radio"
                                            value=""
                                            name="relative-radio"
                                            className="relative-radio w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onClick={(e) => setRelativeWorking(true)}
                                        />
                                        <label htmlFor="relative-radio-yes" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="relative-radio-no"
                                            type="radio"
                                            value=""
                                            name="relative-radio"
                                            className="relative-radio w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onClick={(e) => setRelativeWorking(false)}
                                        />
                                        <label htmlFor="relative-radio-no" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                    </div>

                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-start upl-rsm-cont">
                                    <label htmlFor="file-resume-input" className="custom-file-upload">
                                        <Image
                                            className="fil-img"
                                            style={{ cursor: "pointer" }}
                                            width={250}
                                            src={download}
                                            alt="Download Resume"
                                        />
                                    </label>
                                    {selectedResume && (
                                        <p className="file-name mt-3 font-medium text-[#ff0169]">
                                            {selectedResume?.name.replace(/[/\\?%*:|"<>]/g, "-")}
                                        </p>
                                    )}
                                    <input
                                        id="file-resume-input"
                                        type="file"
                                        accept="application/pdf, application/doc, application/docx"
                                        name="resume"
                                        title="Upload Resume"
                                        style={{ display: "none" }}
                                        onChange={(e) => changefilechange(e.target.files[0], "resume")}
                                    />
                                </div>
                                <div className="text-start upl-rsm-cont">
                                    <label htmlFor="file-photo-input" className="custom-file-upload">
                                        <Image
                                            className="fil-img"
                                            style={{ cursor: "pointer" }}
                                            width={250}
                                            src={upload}
                                            alt="Upload Photo"
                                        />
                                    </label>
                                    {selectedPhoto && (
                                        <p className="file-name mt-3 font-medium text-[#ff0169]">
                                            {selectedPhoto?.name.replace(/[/\\?%*:|"<>]/g, "-")}
                                        </p>
                                    )}
                                    <input
                                        id="file-photo-input"
                                        type="file"
                                        accept="application/pdf, image/png, image/jpeg"
                                        name="photo"
                                        title="Upload Photo"
                                        style={{ display: "none" }}
                                        onChange={(e) => changefilechange(e.target.files[0], "photo")}
                                    />
                                </div>
                            </div>

                            <div className="">
                                <ReCAPTCHA
                                    ref={recaptcha}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    className='login__recaptha'
                                />
                            </div>
                            <div className="col-span-1 mb-10">
                                <button
                                    type="submit"
                                    className="rounded-md p-2.5 text-white font-medium bg-[#ff0169] ps-10 pe-10"
                                    style={{ backgroundColor: '#ff0169', border: 'none' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div> {/* Spinner */}
                                            <span className="ml-2">Submitting...</span>
                                        </div>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SalesCareer