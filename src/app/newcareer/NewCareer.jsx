'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { handleInputValidation } from '@/helper/handleInputValidation';
import axios from 'axios';
import CryptoJS from "crypto-js";
import dynamic from 'next/dynamic';
import { UploadFile } from '@/api/UploadApi';

const MultiSelect = dynamic(() => import('react-select'), { ssr: false });
// import { MultiSelect } from 'react-multi-select-component';

const NewCareer = ({ branches }) => {
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedExpertise, setSelectedExpertise] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState([]);
    // const [selectedExpertise, setSelectedExpertise] = useState([]);

    const options = [
        { label: "Human Resource", value: "Human Resource" },
        { label: "Accounts", value: "Accounts" },
        { label: "Risk Officers", value: "Risk Officers" },
        { label: "Internal Audit", value: "Internal Audit" },
        { label: "Legal", value: "Legal" },
        { label: "Information Technology Department", value: "Information Technology Department" },
        { label: "Sales", value: "Sales" },
        { label: "Collection", value: "Collection" },
        { label: "Branch Operations", value: "Branch Operations" },
        { label: "Branch Head", value: "Branch Head" },
        { label: "Credit", value: "Credit" },
        { label: "Generalist", value: "Generalist" },
    ];


    // State for each form input field
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [expertise, setExpertise] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [branch, setBranch] = useState("");
    const [currentCTC, setCurrentCTC] = useState("");
    const [expectedCTC, setExpectedCTC] = useState("");

    // const handleFilter = () => {
    //     if (selectedState) {
    //         const filtered = branches.filter((branch) => branch.id === selectedState);

    //         console.log(selectedState, "selectedState", filtered);
    //         if (filtered.length > 0) {

    //             setFilteredBranches(filtered.map((branch) => ({
    //                 label: branch.BranchName,
    //                 value: branch.BranchLink
    //             })));
    //         } else {
    //             setFilteredBranches([]);
    //         }
    //     }
    // };

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
        if (selectedState?.length > 0) {
            handleFilter();
        }
    }, [selectedState])

    // const handleExpertiseChange = (event) => {
    //     const { value } = event.target;
    //     setSelectedExpertise(typeof value === 'string' ? value.split(',') : value);
    // };


    const changefilechange = (e) => {
        const file = e.target.files[0];
        console.log(file, "file");
        if (file) {

            if (file.size <= 2 * 1024 * 1024 && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                if (file?.name?.length < 30) {
                    setSelectedFile(file);
                } else {
                    setSelectedFile(null);
                    toast.error("Error: Filename exceeds 30 characters.");
                }
            } else {
                setSelectedFile(null);
                toast.error("Error: Only PDF, DOC, or DOCX files under 2MB are allowed.");
            }
        }
    };


    const [isLoading, setIsLoading] = useState(false);
    const recaptcha = useRef();

    const encryptValue = (value) => {
        return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_SECRET_KEY)?.toString();
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

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "formData");
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("files", file);
        try {

            // const response = await UploadFile(formData);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !mobileNumber || !expertise || !qualification || !experience || !selectedState || !branch) {
            toast.error("❗Please fill in all fields.", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset(); // Reset the reCAPTCHA
            return;
        }

        if(mobileNumber.length < 10 || mobileNumber.length > 10) {
            toast.error("❗Please enter a valid mobile number.", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset(); // Reset the reCAPTCHA
            return;
        }
        const captchaValue = recaptcha.current?.getValue();
        if (!captchaValue) {
            toast.error("❗Please verify the reCAPTCHA!", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset(); // Reset the reCAPTCHA
            return;
        }

        const captchaResponse = await handleRecaptchaChange(e, captchaValue);
        if (!captchaResponse?.data?.success) {
            toast.error("❗Invalid reCAPTCHA verification!", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset(); // Reset the reCAPTCHA
            return;
        }
        if (!selectedFile) {
            toast.error("❗Please upload a CV.", {
                style: {
                    fontSize: '12px',
                },
            });
            recaptcha.current?.reset(); // Reset the reCAPTCHA
            return;
        }

        setIsLoading(true);

        try {
            const s3Url = await uploadFile(selectedFile);

            const encryptedData = encryptFormData({
                name: name.trim(),
                email: email.trim(),
                mobileNumber: mobileNumber.trim(),
                expertise: selectedExpertise,
                location: branches?.find((item) => item.id == location)?.State || location.trim(),
                qualification: qualification.trim(),
                experience: experience.trim(),
                branch: selectedBranch,
                currentCTC: currentCTC.trim(),
                expectedCTC: expectedCTC.trim()
            });

            const payload = { ...encryptedData, s3Url };

            const response = await axios.post("/api/new-career", payload);

            if (response?.data?.status === 201) {
                // Reset all form fields
                setName("");
                setEmail("");
                setMobileNumber("");
                setExpertise([]);
                setQualification("");
                setExperience("");
                setLocation("");
                setSelectedState("");
                setCurrentCTC("");
                setExpectedCTC("");
                setSelectedFile(null);
                setSelectedBranch([]);
                setBranch([]);

                toast.success("✅Application submitted successfully!", {
                    style: {
                        fontSize: '12px',
                    },
                });
            } else {
                toast.error(response?.response?.data?.message || response?.data?.message || response?.response?.data?.error || response?.response?.data?.errors[0]?.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Submission failed:', error?.response?.data || error?.message);
            toast.error(error?.response?.data?.message || error?.response?.data?.error?.message || error?.response?.data?.errors[0]?.message || error?.message || "❗Something went wrong. Please try again.");
        } finally {
            recaptcha.current?.reset(); // Always reset the reCAPTCHA after a submission attempt
            setIsLoading(false);
        }
    };



    const handleRecaptchaChange = async (e, value) => {
        e.preventDefault();
        const response = await axios.post('/api/verify-captcha', { captchaValue: value })
        return response
    }

    const handleChange = (selectedOptions) => {
        if (selectedOptions?.length <= 3) {
            // console.log(selectedOptions, "selectedOptions");
            setExpertise(selectedOptions);
            setSelectedExpertise(selectedOptions.map((option) => option.value));
        } else {
            toast.error("You can only select up to 3 options.");
            // alert("You can only select up to 3 options.");
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

    console.log(selectedBranch, "selectedOptions", selectedExpertise);


    return (
        <div className='max-w-[1280px] md:m-auto  shadow-xl rounded-lg mb-10 m-3'>
            <h2 className='text-center text-[#585757] md:text-[40px] text-[20px] pt-7'>Join us & make a difference</h2>
            <div className='grid lg:grid-cols-2 md:ps-10 md:pe-10 ps-4 pe-4 pt-5 gap-10'>
                <div>
                    <img src="https://repcohome.s3.ap-south-1.amazonaws.com/career+2023-06-26+at+6.24.24+PM.jpeg" className='rounded-md' alt='defaultImage' />
                    {/* <Image src="https://repcohome.s3.ap-south-1.amazonaws.com/career+2023-06-26+at+6.24.24+PM.jpeg" className='rounded-md' width={700} height={700} alt='defaultImage' /> */}
                </div>
                <div>
                    <form className="flex  flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name *" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                className='col-span-2'
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => handleInputValidation(e.target.value, setName, 1)}
                            />
                        </div>

                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email *" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                className='col-span-2'
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => handleInputValidation(e.target.value, setEmail, 4)}
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="number" value="Mobile Number *" />
                            </div>
                            <TextInput
                                id="number"
                                type="tel"
                                className='col-span-2'
                                placeholder="Mobile Number"
                                required
                                min={10}
                                max={10}
                                value={mobileNumber}
                                onChange={(e) => handleInputValidation(e.target.value, setMobileNumber, 2)}
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="Expertise" value="Expertise *" />
                            </div>
                            <MultiSelect
                                isMulti
                                required
                                options={options}
                                value={expertise}
                                instanceId="expertise-select"
                                className='col-span-2 '
                                onChange={handleChange}
                                closeMenuOnSelect={false}
                                maxMenuHeight={300}
                                isSearchable={false}
                                placeholder="Select Expertise"
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="qualification" value=" Highest Educational Qualification *" />
                            </div>
                            <TextInput
                                id="qualification"
                                type="text"
                                className='col-span-2'
                                placeholder="Highest Educational Qualification"
                                required
                                value={qualification}
                                onChange={(e) => handleInputValidation(e.target.value, setQualification, 8)}
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="Experience" value="Experience *" />
                            </div>
                            <Select
                                id="Experience"
                                className='col-span-2'
                                required
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            >
                                <option value="" disabled>Select Experience</option>
                                <option value="0">Fresher</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6+">6+</option>
                            </Select>
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="location" value="Preferred location *" />
                            </div>
                            <Select
                                id="location"
                                className='col-span-2'
                                required
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setSelectedState(e.target.value);
                                    setSelectedBranch('');
                                    setBranch('');
                                }}

                            >
                                <option value="" disabled>Select a state</option>
                                {branches?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.State}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">

                            </div>
                            {/* <Select
                                id="branch"
                                className='col-span-2'
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a branch</option>
                                {filteredBranches?.map((item) => (
                                    <option key={item.id} value={item.BranchName}>
                                        {item.BranchName}
                                    </option>
                                ))}
                            </Select> */}

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
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="ctc" value="Current CTC (Rs in Lakhs)" />
                            </div>
                            <TextInput
                                id="ctc"
                                type="tel"
                                className='col-span-2'
                                placeholder="Current CTC"

                                value={currentCTC}
                                onChange={(e) => handleInputValidation(e.target.value, setCurrentCTC, 5)}
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-1'>
                            <div className="mb-2 block">
                                <Label htmlFor="Expected_ctc" value="Expected CTC (Rs in Lakhs)" />
                            </div>
                            <TextInput
                                id="Expected_ctc"
                                type="tel"
                                className='col-span-2'
                                placeholder="Expected CTC"

                                value={expectedCTC}
                                onChange={(e) => handleInputValidation(e.target.value, setExpectedCTC, 5)}
                            />
                        </div>
                        <div className="grid lg:grid-cols-1 md:my-1 my-3 items-center">
                            <div
                                className="   text-start upl-rsm-cont"
                            // style={{ marginTop: "-4px", marginLeft: "-10px" }}
                            >
                                <label htmlFor="file-input" className="custom-file-upload ">
                                    <Image
                                        className="cursor-pointer w-[250px] mb-5 rounded-md"
                                        width={250}
                                        height={150}
                                        src="https://res.cloudinary.com/tuskmelonimagestorage/image/upload/v1688724791/repco%20career/Group_37276_mmkomr.svg"
                                        alt="img"
                                    />
                                </label>
                                {selectedFile && (
                                    <p
                                        className="file-name mt-3 font-medium text-[#ff0169]"
                                    >
                                        {selectedFile?.name.replace(/[/\\?%*:|"<>]/g, '-')}
                                    </p>
                                )}
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="application/pdf, application/doc, application/docx"
                                    name="resume"
                                    title="Upload"
                                    style={{ display: "none" }}
                                    onChange={changefilechange}
                                />
                            </div>
                            <div className="">
                                <ReCAPTCHA
                                    ref={recaptcha}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    className='login__recaptha'
                                />
                            </div>
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
    )
}

export default NewCareer
