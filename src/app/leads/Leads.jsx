'use client'

import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import "./leads.css";
import json from "../../Language/en.json";
import { useRouter, useSearchParams } from "next/navigation";
import LeadsCalculator from "../../components/LeadsCalculator";
import CountUp from "react-countup";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

const Leads = () => {

    const [data, setData] = useState([]);
    // const url = 
    const searchParams = useSearchParams()
    const search = searchParams.get('la')
    // console.log(search, "search");

    // const laParam = url.searchParams.get('la');

    useEffect(() => {
        if (search == null || search === "" || !["english", "tamil", "telugu", "kannada"].includes(search)) {
            setData(json.filter((item) => item?.la === "english"));
        } else {
            setData(json.filter((item) => item?.la === search));
        }
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const responsivet = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const [isHighlighted, setHighlighted] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isdisable, setisdisable] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 1500);
        return () => clearInterval(interval);
    }, []);


    // const [count, setCount] = useState(0);

    // const [count1, setCount1] = useState(0);

    // const [count2, setCount2] = useState(0);

    // const [count3, setCount3] = useState(0);

    const sectionRef = useRef(null);


    useEffect(() => {
        if (isHighlighted) {
            const timer = setTimeout(() => {
                setHighlighted(false);
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isHighlighted]);

    // console.log('Highlighted:', isHighlighted);
    const toggleHighlight = () => {
        setHighlighted(!isHighlighted);
    };
    // post form data to strapi
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const utm_campaign = queryParameters.get("utm_campaign");
        const utm_medium = queryParameters.get("utm_medium");
        const utm_source = queryParameters.get("utm_source");

        setFormData({
            ...formData,
            utmCampaign: utm_campaign || null,
            utmMedium: utm_medium || null,
            utmSrc: utm_source || null,
        });
    }, []);


    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        location: "",
        pincode: "",
        loanAmount: "",
        purpose: "",
        utmSrc: "",
        utmMedium: "",
        utmCampaign: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        const englishPattern = /^[a-zA-Z0-9\s]*$/;
        newValue = newValue.replace(/^\s+/, '');

        if (name === 'name') {
            newValue = newValue.split('').filter(char => /[A-Za-z\s]/.test(char)).join('');
        } else if (name === 'mobile') {
            newValue = newValue.replace(/\D/g, '');
        } else if (name === 'loanAmount') {
            newValue = newValue.replace(/\D/g, '');
            if (parseInt(newValue, 10) > 100000000) {
                newValue = '100000000';
            }
        } else if (name === 'email') {
            const validEmailPattern = /^[a-zA-Z0-9@.]+$/;
            if (validEmailPattern.test(value)) {
                setFormData({ ...formData, [name]: newValue });
            }
            return;
        } else if (name === 'location') {
            newValue = newValue.replace(/[^A-Za-z\s']/g, '');
        } else if (name === 'pincode') {
            newValue = newValue.replace(/\D/g, '');
        } else {
            newValue = newValue.split('').filter(char => /[A-Za-z\s]/.test(char)).join('');
        }
        if (!englishPattern.test(newValue)) {
            newValue = '';
        }
        setFormData({ ...formData, [name]: newValue });
    };

    const router = useRouter()

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
                    encryptedData[key] = value.map((item) => encryptValue(item?.toString()));
                } else {
                    encryptedData[key] = encryptValue(value?.toString());
                }
            }

        }

        return encryptedData;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const encryptedData = encryptFormData(formData);
            console.log(encryptedData, "encryptedData");


            setisdisable(true);
            const response = await axios.post("/api/leads", encryptedData);
            console.log(response, "response");
            if (response.status === 201) {

                // window.location = "https://repcohome.com/ThankYou/index.html";
                router.push('thank-you')
                setisdisable(false);

                setFormData({
                    name: "",
                    mobile: "",
                    email: "",
                    location: "",
                    pincode: "",
                    loanAmount: "",
                    purpose: "",
                    utmSrc: "",
                    utmMedium: "",
                    utmCampaign: "",
                })
                // history.push("/ThankYou/index.html");
                //success message or redirect

            } else {
                setisdisable(false);
                toast.error(response?.response?.data?.message || response?.data?.message ||  response?.response?.data?.error || response?.response?.data?.errors[0]?.message || "Something went wrong");
            }

        } catch (error) {

            setisdisable(false);
            toast.error(error?.response?.data?.message ||error?.response?.data?.error?.message || error?.response?.data?.errors[0]?.message || error?.message || "❗Something went wrong. Please try again.");
        }
    };


    return (
        <div style={{ backgroundColor: "#f1f1f1" }}>

            <div className="py-2">
                <div className=" header rounded  max-w-[1380px]  m-auto" >

                    <div className="flex justify-between max-w-[1280px] m-auto items-center py-2 px-4">
                        <div className=" col  text-start">
                            <p className="    textir my-auto">
                                <img
                                    className=""
                                    src={data[0]?.Header?.logo}
                                    alt=""
                                />
                            </p>
                        </div>
                        <div className="col text-end ">
                            <a href="#form">
                                <button
                                    onClick={toggleHighlight}
                                    className={` shadow  hover-shadow ms-4 ms-md-0 mt-1 ${data[0]?.la === "telugu" ? "tg" : data[0]?.la === "tamil" ? "tg " : " "}`}
                                >
                                    {data[0]?.Header?.cta_name}
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {
                data[0]?.banner.length > 0 &&
                <div className="m-auto">
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        slidesToShow={1}
                        autoPlay={true}
                        arflexs={true}
                        showDots={true}
                        autoplaySpeed={1000}
                        pauseOnHover={true}
                    >
                        {data[0]?.banner.map((bann, index) => (
                            <div
                                className="my-2 max-w-[1380px]  m-auto"
                                style={{ overflowX: "hidden" }}
                                key={index}
                            >
                                <img key={index} className="" src={bann.url} alt="" />{" "}

                            </div>

                        ))}
                    </Carousel>
                </div>
            }

            <div className="form_cont z-10 relative md:m-1 m-3 " >
                <div className="">
                    <div className="flex  justify-center">
                        <div className=" pt-4 col-12 col-lg-10   ">
                            <form className={isHighlighted ? "highlighted" : ""}
                                onSubmit={handleSubmit}
                            >
                                <div className=" p-0 p-md-0   " id="form">
                                    <div className="  px-4 px-md-4  max-w-[1280px]  m-auto pt-2 for-bore bg-white">
                                        <p className="fs-5 fs-lg-4 mt-2 mb-4 text-center">
                                            {data[0]?.inputfield?.title}
                                        </p>

                                        <div className="grid md:grid-cols-2 grid-cols-1 ps-5 pe-5">

                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    title="Enter Your Name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-control form-in border-0 w-full w-full"
                                                    placeholder={data[0]?.inputfield?.name}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(4).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>



                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="number"
                                                    required
                                                    title="Enter your mobile number"
                                                    pattern="[1-9]{1}[0-9]{9}"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    className="form-control form-in border-0 w-full"
                                                    placeholder={data[0]?.inputfield?.mobile}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(5).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>



                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="email"
                                                    title="Enter your E-Mail"

                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control form-in border-0 w-full"
                                                    placeholder={data[0]?.inputfield?.Email}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(6).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>



                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="text"
                                                    title="Enter your location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                    className="form-control form-in border-0 w-full"
                                                    placeholder={data[0]?.inputfield?.Location}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(7).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>



                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="number"
                                                    title="Enter your Pincode"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    maxLength={6}
                                                    required
                                                    className="form-control form-in border-0 w-full"
                                                    placeholder={data[0]?.inputfield?.Pincode}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(7).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>



                                            <div className="newFormIn input-group mb-4 flex justify-between max-w-[90%]">
                                                <input
                                                    type="number"
                                                    required
                                                    title="Enter your Loan Amount"
                                                    name="loanAmount"
                                                    value={formData.loanAmount}
                                                    onChange={handleChange}
                                                    className="form-control form-in border-0 w-full"
                                                    placeholder={data[0]?.inputfield?.Loan_Amount}
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />

                                                <span className="input-group-text" id="basic-addon1">
                                                    <img
                                                        className=""
                                                        src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Frame+(8).svg"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>


                                            <div className="flex justify-between  mb-4">

                                                <select
                                                    className="form-select form-slt max-w-[90%]"
                                                    name="purpose"
                                                    required
                                                    title="Select Purpose"
                                                    value={formData.purpose}
                                                    onChange={handleChange}
                                                    aria-label="Default select example"
                                                >

                                                    {data[0]?.inputfield?.Purpose?.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={index === 0 ? "" : item?.name}
                                                            disabled={index === 0}
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className="flex justify-between">

                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                disabled={isdisable}
                                                // onClick={handlemobilecheck} 
                                                type="submit"
                                                className="hover-shadow flex justify-center  shadow mb-3 m-auto"
                                            >
                                                {!isdisable ? data[0]?.Header?.cta_name : <>
                                                    <img className=" text-center m-auto" style={{ width: "35px" }} src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/Spin-1s-66px.gif" alt="" />
                                                </>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-[1280px]  m-auto clr-lit-blk  ">
                <p className="fs-4 fs-lg-1 text-center  lg:text-2xl md:text-xl text-lg leading-10  mt-5" style={{ fontWeight: "600" }}>
                    {data[0]?.Loan_Solutions?.title} <span className="clr-rse"> {data[0]?.Loan_Solutions?.color_title} </span>
                </p>
                <p className="text-md mt-5 text-center">{data[0]?.Loan_Solutions?.description} </p>

                <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center mt-4">
                    <div className=" zoom-effect-max-w-[1280px]  m-auto ">
                        <div className="bg_h p-2 image-card relative">
                            <img className=" rounded" src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/loanimg1.png" alt="" />
                            <div className="text-start absolute bottom-8 text-white ps-1 ms-4 mb-4">
                                <p className={`${data[0]?.la === "kannada" ? "text-md" : ""} lg:text-2xl md:text-lg sm:text-sm font-semibold`}>{data[0]?.Loan_Solutions?.SchemeName[0]?.scheme}</p>
                                <a href="#form"> <p className="mt-3 flex  items-center text-white aplnow"><span>{data[0]?.Header?.cta_name}</span><span className="ms-2"><img className="  " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/arrow.svg" alt="" /></span></p>
                                </a> </div>
                        </div>
                    </div>
                    <div className=" zoom-effect-max-w-[1280px]  m-auto">
                        <div className="bg_h p-2 image-card relative">
                            <img className=" rounded" src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/loanimg2.png" alt="" />

                            <div className="text-start absolute  bottom-8 start-0 text-white ps-1 ms-4 mb-4">
                                <p className={`${data[0]?.la === "kannada" ? "text-md" : ""} lg:text-2xl md:text-lg sm:text-sm font-semibold`}>{data[0]?.Loan_Solutions?.SchemeName[1]?.scheme}</p>
                                <a href="#form" > <p className="mt-3 flex  items-center text-white aplnow "><span>{data[0]?.Header?.cta_name}</span><span className="ms-2"><img className="  " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/arrow.svg" alt="" /></span></p>
                                </a> </div>
                        </div>
                    </div>
                </div>
            </div>
            <LeadsCalculator />

            <div className="docu_bg ">
                <div className="max-w-[1280px]  m-auto clr-lit-blk  ">
                    <p className=" md:!text-start pt-4 pt-lg-5 text-2xl text-center md:m-1 m-2  mt-10 leading-10" style={{ fontWeight: "600" }}>
                        {data[0]?.Documentation?.title} <br /> <span className="clr-rse">  {data[0]?.Documentation?.color_title}</span>
                    </p>
                </div>
                <div className="max-w-[1280px]  m-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1  pt-0 pt-lg-3 pb-0">
                        <div className=" text-center m-auto">
                            <img className="object-cover m-auto" width={"90%"} src="https://unicowebsite.s3.ap-south-1.amazonaws.com/docu_img.png" alt="" />
                        </div>
                        <div className=" mt-5 md:m-1 m-3">
                            <div className={`flex md:!justify-start justify-center   gap-4 mb-8 ${currentIndex === 0 ? 'bor_lft_a' : 'bor_lft_n'}`}  >
                                <div className="col-2 ms-3">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M32.8781 2.25015H24.4299C24.2086 1.79525 23.8639 1.41176 23.435 1.14347C23.0062 0.87518 22.5105 0.73291 22.0047 0.73291C21.4988 0.73291 21.0031 0.87518 20.5743 1.14347C20.1454 1.41176 19.8007 1.79525 19.5794 2.25015H11.131C10.2012 2.25015 9.42181 2.97697 9.42181 3.90678V18.399C4.99212 18.6314 1.42383 22.3295 1.42383 26.8422C1.42383 31.5039 5.22239 35.312 9.88439 35.312C11.1999 35.309 12.4969 35.0013 13.6737 34.4132C14.8504 33.825 15.875 32.9724 16.6671 31.922H32.8781C33.3313 31.9159 33.7642 31.7332 34.0846 31.4126C34.4051 31.0921 34.5877 30.6591 34.5937 30.2059V3.90678C34.5937 2.97697 33.8081 2.25015 32.8781 2.25015ZM20.1796 4.53896V3.40102C20.1796 2.91617 20.3722 2.45118 20.7151 2.10834C21.0579 1.7655 21.5229 1.5729 22.0077 1.5729C22.4926 1.5729 22.9576 1.7655 23.3004 2.10834C23.6433 2.45118 23.8359 2.91617 23.8359 3.40102V4.53896C23.8398 4.65646 23.8877 4.76821 23.97 4.85215C24.0523 4.93608 24.1631 4.9861 24.2805 4.99234H28.0546V7.17202H15.9609V4.99234H19.7288C19.8468 4.98635 19.9584 4.93659 20.0418 4.85277C20.1252 4.76894 20.1743 4.65706 20.1796 4.53896ZM28.8984 7.57351V6.53921H30.5782C30.6356 6.54057 30.6902 6.5639 30.7309 6.60438C30.7716 6.64486 30.7952 6.6994 30.7968 6.75676V23.9064H28.788C28.3349 23.9118 27.9018 24.0939 27.581 24.4138C27.2601 24.7338 27.0768 25.1665 27.0702 25.6196V27.5626H18.3135C18.3339 27.3517 18.3449 27.0809 18.3449 26.837C18.3449 25.1945 17.8738 23.6955 17.0597 22.3595H19.0257C19.1375 22.3595 19.2448 22.3151 19.324 22.236C19.4031 22.1568 19.4475 22.0495 19.4475 21.9376C19.4475 21.8258 19.4031 21.7185 19.324 21.6393C19.2448 21.5602 19.1375 21.5158 19.0257 21.5158H16.852C16.7398 21.5169 16.6325 21.5622 16.5535 21.6419C15.6792 20.5148 14.5313 19.63 13.2187 19.0716V6.75676C13.2189 6.70001 13.2413 6.6456 13.2809 6.605C13.3206 6.56441 13.3744 6.54082 13.4312 6.53921H15.1171V7.57351C15.1203 7.68929 15.1675 7.79951 15.2491 7.88169C15.3307 7.96387 15.4406 8.01182 15.5564 8.01577H28.453C28.5694 8.01205 28.6801 7.96436 28.7627 7.88229C28.8454 7.80022 28.8938 7.68989 28.8984 7.57351ZM30.2077 24.7501L27.914 27.0392V25.6196C27.9203 25.3902 28.0146 25.172 28.1773 25.0102C28.34 24.8484 28.5586 24.7553 28.788 24.7501H30.2077ZM11.131 3.0939H19.3288C19.3247 3.19632 19.3271 3.2989 19.3359 3.40102V4.14859H15.5564C15.3234 4.14859 15.1171 4.30595 15.1171 4.53896V5.69546H13.4312C13.1507 5.69731 12.8824 5.80989 12.6846 6.00866C12.4867 6.20744 12.3754 6.47632 12.3749 6.75676V18.7609C11.6914 18.545 10.9819 18.4226 10.2656 18.397V3.90678C10.2656 3.44223 10.6663 3.0939 11.131 3.0939ZM6.11712 33.4367V30.4365C6.11778 29.9163 6.30793 29.4142 6.652 29.024C6.99606 28.6338 7.47048 28.3823 7.98652 28.3166C8.22304 28.5852 8.5127 28.8019 8.8372 28.9529C9.1617 29.1039 9.51398 29.1859 9.87181 29.1939C10.2521 29.2046 10.6302 29.1327 10.98 28.983C11.3298 28.8334 11.643 28.6096 11.8979 28.3271C12.4014 28.4061 12.8603 28.6617 13.1925 29.0482C13.5247 29.4347 13.7085 29.9268 13.711 30.4365V33.4366C12.5564 34.1026 11.247 34.4532 9.91413 34.4532C8.58126 34.4532 7.27182 34.1026 6.11726 33.4366L6.11712 33.4367ZM14.5546 32.8705V30.4365C14.5512 29.6771 14.2592 28.9474 13.7377 28.3953C13.2162 27.8431 12.5043 27.51 11.7463 27.4632C11.5253 27.4492 11.4075 27.5877 11.3169 27.6982C11.1449 27.9079 10.9273 28.0757 10.6807 28.1887C10.4341 28.3017 10.165 28.357 9.89389 28.3504C9.62272 28.3438 9.35664 28.2755 9.11586 28.1506C8.87508 28.0257 8.66595 27.8475 8.50437 27.6297C8.46632 27.5755 8.41551 27.5316 8.35645 27.5018C8.29739 27.472 8.23189 27.4571 8.16574 27.4587C7.39169 27.4833 6.65746 27.8077 6.11788 28.3632C5.57829 28.9187 5.27551 29.6621 5.27337 30.4365V32.8705C4.01098 31.9045 3.08312 30.5672 2.6203 29.0465C2.15747 27.5259 2.18297 25.8984 2.69319 24.3929C3.20342 22.8875 4.1727 21.5799 5.46473 20.654C6.75676 19.7281 8.30652 19.2304 9.89606 19.2311C14.0929 19.2311 17.5161 22.6454 17.5161 26.8422C17.5161 29.2935 16.3124 31.4775 14.5546 32.8705ZM33.7499 30.2056C33.7443 30.4352 33.6507 30.6538 33.4884 30.8162C33.3261 30.9786 33.1076 31.0725 32.8781 31.0783H17.2225C17.6835 30.2432 18.0128 29.342 18.1986 28.4064H27.2789C27.3295 28.4066 27.38 28.4036 27.4302 28.3975C27.5031 28.4151 27.5794 28.4126 27.651 28.3902C27.7225 28.3677 27.7866 28.3262 27.8364 28.2701C27.9384 28.2153 28.0318 28.1459 28.1137 28.064L31.2906 24.8913C31.4012 24.7821 31.489 24.6522 31.5491 24.509C31.6091 24.3657 31.6402 24.212 31.6406 24.0567V6.75676C31.6386 6.47571 31.526 6.20674 31.3272 6.0081C31.1283 5.80946 30.8593 5.69714 30.5782 5.69546H28.8984V4.53896C28.8984 4.30595 28.686 4.14859 28.453 4.14859H24.6796V3.40102C24.6869 3.29879 24.6872 3.19618 24.6807 3.0939H32.8781C33.3426 3.0939 33.7499 3.44223 33.7499 3.90678V30.2056Z" fill="#555555" />
                                        <path d="M27.9781 11.1797C27.8662 11.1797 27.7589 11.2241 27.6798 11.3033C27.6007 11.3824 27.5562 11.4897 27.5562 11.6016C27.5562 11.7135 27.6007 11.8208 27.6798 11.8999C27.7589 11.979 27.8662 12.0234 27.9781 12.0234H28.4533C28.5652 12.0234 28.6725 11.979 28.7516 11.8999C28.8307 11.8208 28.8752 11.7135 28.8752 11.6016C28.8752 11.4897 28.8307 11.3824 28.7516 11.3033C28.6725 11.2241 28.5652 11.1797 28.4533 11.1797H27.9781ZM19.53 12.0234H26.498C26.6099 12.0234 26.7172 11.979 26.7963 11.8999C26.8754 11.8208 26.9199 11.7135 26.9199 11.6016C26.9199 11.4897 26.8754 11.3824 26.7963 11.3033C26.7172 11.2241 26.6099 11.1797 26.498 11.1797H19.53C19.4181 11.1797 19.3108 11.2241 19.2317 11.3033C19.1526 11.3824 19.1082 11.4897 19.1082 11.6016C19.1082 11.7135 19.1526 11.8208 19.2317 11.8999C19.3108 11.979 19.4181 12.0234 19.53 12.0234ZM15.5567 12.0234H18.02C18.1319 12.0234 18.2392 11.979 18.3183 11.8999C18.3974 11.8208 18.4419 11.7135 18.4419 11.6016C18.4419 11.4897 18.3974 11.3824 18.3183 11.3033C18.2392 11.2241 18.1319 11.1797 18.02 11.1797H15.5567C15.4448 11.1797 15.3375 11.2241 15.2584 11.3033C15.1792 11.3824 15.1348 11.4897 15.1348 11.6016C15.1348 11.7135 15.1792 11.8208 15.2584 11.8999C15.3375 11.979 15.4448 12.0234 15.5567 12.0234ZM28.4533 14.5547H27.1215C27.0096 14.5547 26.9023 14.5991 26.8232 14.6783C26.744 14.7574 26.6996 14.8647 26.6996 14.9766C26.6996 15.0885 26.744 15.1958 26.8232 15.2749C26.9023 15.354 27.0096 15.3984 27.1215 15.3984H28.4533C28.5652 15.3984 28.6725 15.354 28.7516 15.2749C28.8307 15.1958 28.8752 15.0885 28.8752 14.9766C28.8752 14.8647 28.8307 14.7574 28.7516 14.6783C28.6725 14.5991 28.5652 14.5547 28.4533 14.5547ZM23.8643 14.5547C23.7524 14.5547 23.6451 14.5991 23.566 14.6783C23.4869 14.7574 23.4424 14.8647 23.4424 14.9766C23.4424 15.0885 23.4869 15.1958 23.566 15.2749C23.6451 15.354 23.7524 15.3984 23.8643 15.3984H25.6795C25.7914 15.3984 25.8987 15.354 25.9778 15.2749C26.0569 15.1958 26.1014 15.0885 26.1014 14.9766C26.1014 14.8647 26.0569 14.7574 25.9778 14.6783C25.8987 14.5991 25.7914 14.5547 25.6795 14.5547H23.8643ZM15.5567 15.3984H22.5968C22.7087 15.3984 22.816 15.354 22.8951 15.2749C22.9742 15.1958 23.0187 15.0885 23.0187 14.9766C23.0187 14.8647 22.9742 14.7574 22.8951 14.6783C22.816 14.5991 22.7087 14.5547 22.5968 14.5547H15.5567C15.4448 14.5547 15.3375 14.5991 15.2584 14.6783C15.1792 14.7574 15.1348 14.8647 15.1348 14.9766C15.1348 15.0885 15.1792 15.1958 15.2584 15.2749C15.3375 15.354 15.4448 15.3984 15.5567 15.3984ZM28.4533 18.1406H25.6227C25.5109 18.1406 25.4036 18.1851 25.3244 18.2642C25.2453 18.3433 25.2009 18.4506 25.2009 18.5625C25.2009 18.6744 25.2453 18.7817 25.3244 18.8608C25.4036 18.9399 25.5109 18.9844 25.6227 18.9844H28.4533C28.5652 18.9844 28.6725 18.9399 28.7516 18.8608C28.8307 18.7817 28.8752 18.6744 28.8752 18.5625C28.8752 18.4506 28.8307 18.3433 28.7516 18.2642C28.6725 18.1851 28.5652 18.1406 28.4533 18.1406ZM24.6026 18.5625C24.6026 18.4506 24.5581 18.3433 24.479 18.2642C24.3999 18.1851 24.2926 18.1406 24.1807 18.1406H15.5567C15.4448 18.1406 15.3375 18.1851 15.2584 18.2642C15.1792 18.3433 15.1348 18.4506 15.1348 18.5625C15.1348 18.6744 15.1792 18.7817 15.2584 18.8608C15.3375 18.9399 15.4448 18.9844 15.5567 18.9844H24.1807C24.2926 18.9844 24.3999 18.9399 24.479 18.8608C24.5581 18.7817 24.6026 18.6744 24.6026 18.5625ZM28.4533 21.5156H20.4682C20.3563 21.5156 20.249 21.5601 20.1699 21.6392C20.0908 21.7183 20.0463 21.8256 20.0463 21.9375C20.0463 22.0494 20.0908 22.1567 20.1699 22.2358C20.249 22.3149 20.3563 22.3594 20.4682 22.3594H28.4533C28.5652 22.3594 28.6725 22.3149 28.7516 22.2358C28.8307 22.1567 28.8752 22.0494 28.8752 21.9375C28.8752 21.8256 28.8307 21.7183 28.7516 21.6392C28.6725 21.5601 28.5652 21.5156 28.4533 21.5156ZM9.87915 20.5031C9.16354 20.5035 8.47714 20.787 7.96992 21.2918C7.46269 21.7966 7.17587 22.4816 7.17212 23.1972V24.3335C7.17212 25.0514 7.45732 25.74 7.96499 26.2476C8.47266 26.7553 9.1612 27.0405 9.87915 27.0405C10.5971 27.0405 11.2856 26.7553 11.7933 26.2476C12.301 25.74 12.5862 25.0514 12.5862 24.3335V23.1972C12.5824 22.4816 12.2956 21.7966 11.7884 21.2918C11.2812 20.787 10.5948 20.5035 9.87915 20.5031ZM11.7424 24.3335C11.7424 24.8276 11.5461 25.3016 11.1967 25.651C10.8473 26.0004 10.3733 26.1967 9.87915 26.1967C9.38498 26.1967 8.91104 26.0004 8.56161 25.651C8.21218 25.3016 8.01587 24.8276 8.01587 24.3335V23.1972C8.01587 22.703 8.21218 22.2291 8.56161 21.8797C8.91104 21.5302 9.38498 21.3339 9.87915 21.3339C10.3733 21.3339 10.8473 21.5302 11.1967 21.8797C11.5461 22.2291 11.7424 22.703 11.7424 23.1972V24.3335Z" fill="#555555" />
                                    </svg>

                                </div>
                                <div className="col text-start clr-lit-blk">
                                    <p className={`fs-3   ${currentIndex === 0 ? 'clr_a' : 'clr_n'}`}>{data[0]?.Documentation?.Document_Needed[0]?.title}</p>
                                    <p className="  pt-5 less_space md:max-w-[70%]"  >{data[0]?.Documentation?.Document_Needed[0]?.descri}</p>
                                </div>
                            </div>
                            <div className={`flex justify-start gap-4 mb-8   ${currentIndex === 1 ? 'bor_lft_a' : 'bor_lft_n'}`} >
                                <div className="col-2 ms-3">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_5013_40)">
                                            <path d="M32.7605 14.6302C32.3142 13.9484 31.8315 13.3403 31.3646 12.7523C30.8113 12.0849 30.3013 11.3828 29.8379 10.6502C29.9708 9.77981 30.2998 7.91265 30.6295 7.14813C30.8413 6.65708 31.1935 6.28446 31.1842 5.71718C31.1794 5.43358 31.0781 5.16008 30.8971 4.94173C30.716 4.72339 30.466 4.57322 30.1882 4.51596C29.9699 4.48022 29.7467 4.48796 29.5314 4.53871C29.3162 4.58946 29.113 4.68224 28.9337 4.81171C28.568 5.04192 28.0446 5.57815 27.7113 5.01627C27.5856 4.76647 27.4025 4.54995 27.1771 4.38443C26.3665 3.86312 25.7643 4.7101 25.5372 5.02888C25.4352 5.17228 25.2137 5.54467 24.9917 5.432C24.6306 5.24872 24.3962 4.90032 24.0076 4.7454C23.8555 4.69113 23.6935 4.67012 23.5325 4.68378C23.3716 4.69744 23.2154 4.74546 23.0746 4.82459C22.9338 4.90372 22.8116 5.01213 22.7162 5.1425C22.6208 5.27287 22.5545 5.42218 22.5218 5.58035C22.4037 6.15528 22.7339 6.64178 23.029 7.10043C23.0351 7.11045 23.6368 8.10125 24.0556 10.6255L24.0514 10.6391C23.6009 11.349 23.0797 12.0579 22.5741 12.7454C21.7516 13.8435 20.9881 14.9846 20.2866 16.1637C20.6341 16.3083 20.9689 16.4815 21.2876 16.6816C21.961 15.554 22.693 14.4625 23.4806 13.4115C23.9705 12.7454 24.4716 12.0584 24.9237 11.3572H28.959C29.8131 12.7262 30.9366 13.8978 31.8191 15.2461C33.5188 17.843 35.0631 20.7445 34.8561 24.3598C34.6251 28.4039 31.3507 30.4138 28.2082 30.6116C26.4368 30.7228 24.6215 30.6616 22.979 29.9215C22.8082 30.2568 22.5907 30.5663 22.333 30.8406C23.3942 31.3544 24.5448 31.6579 25.7214 31.7341C26.573 31.7878 27.4272 31.7878 28.2788 31.7341C31.7992 31.5124 35.7105 29.1302 35.9792 24.4239C36.2049 20.4837 34.5657 17.3883 32.7605 14.6302ZM29.5964 6.70283C29.2205 7.57473 28.9008 9.38579 28.765 10.2324L25.1289 10.2324C24.8991 8.9225 24.635 7.46476 23.8756 6.3427C23.7443 6.19121 23.6586 6.0056 23.6284 5.80738C23.7415 5.8755 23.8471 5.95554 23.9431 6.04612C24.6875 6.68946 25.5199 6.77549 26.2161 5.99205C26.373 5.81517 26.5162 5.62658 26.6444 5.42792C26.923 5.86972 27.2255 6.29902 27.7711 6.40431C28.3444 6.51494 28.8254 6.25914 29.2773 5.93836C29.3676 5.87422 30.053 5.37564 30.0595 5.73549C30.0655 6.07486 29.7266 6.40096 29.5964 6.70283Z" fill="#555555" />
                                            <path d="M20.7916 29.168C20.167 29.9669 18.6154 30.6564 16.5935 30.6564C14.5716 30.6564 13.02 29.9669 12.3954 29.168C11.8781 28.9082 11.4035 28.571 10.988 28.168C10.977 28.2472 10.9705 28.327 10.9685 28.407C10.9685 30.299 13.4393 31.7811 16.5935 31.7811C19.7477 31.7811 22.2185 30.299 22.2185 28.407C22.2165 28.327 22.21 28.2472 22.199 28.168C21.7835 28.571 21.3089 28.9082 20.7916 29.168Z" fill="#555555" />
                                            <path d="M20.7915 26.3561C20.167 27.1551 18.6154 27.8445 16.5934 27.8445C14.5715 27.8445 13.0199 27.1551 12.3953 26.3561C11.8781 26.0963 11.4034 25.7591 10.9879 25.3561C10.9769 25.4353 10.9704 25.5151 10.9684 25.5951C10.9684 27.4871 13.4392 28.9693 16.5934 28.9693C19.7476 28.9693 22.2184 27.4871 22.2184 25.5951C22.2164 25.5151 22.2099 25.4353 22.1989 25.3561C21.7834 25.7591 21.3088 26.0963 20.7915 26.3561ZM5.90592 30.6564C5.08062 30.6566 4.26932 30.4431 3.55101 30.0367C2.83269 29.6303 2.23184 29.0448 1.80693 28.3373C1.38202 27.6298 1.14754 26.8243 1.1263 25.9992C1.10506 25.1742 1.2978 24.3577 1.68574 23.6293C2.07369 22.9008 2.64363 22.2853 3.34008 21.8424C4.03654 21.3996 4.83577 21.1447 5.66 21.1024C6.48422 21.0601 7.30535 21.232 8.04345 21.6012C8.78156 21.9704 9.41148 22.5245 9.87192 23.2094C9.80307 22.6904 9.85939 22.1624 10.0362 21.6696C9.1995 20.8463 8.1364 20.2912 6.98269 20.0751C5.82898 19.8589 4.63703 19.9916 3.5591 20.4562C2.48117 20.9208 1.5662 21.6962 0.931072 22.6833C0.295944 23.6704 -0.0305091 24.8244 -0.00658574 25.9979C0.0173376 27.1715 0.390551 28.3112 1.06538 29.2716C1.74021 30.232 2.68602 30.9695 3.78198 31.3897C4.87795 31.81 6.07432 31.894 7.21826 31.631C8.36221 31.3681 9.4018 30.7701 10.2042 29.9134C9.99385 29.4965 9.87297 29.0403 9.84933 28.574C9.41087 29.2155 8.82257 29.7405 8.13542 30.1034C7.44827 30.4662 6.683 30.656 5.90592 30.6564Z" fill="#555555" />
                                            <path d="M20.7916 23.5444C20.1671 24.3434 18.6154 25.0329 16.5935 25.0329C14.5716 25.0329 13.02 24.3434 12.3954 23.5444C11.8782 23.2846 11.4035 22.9474 10.988 22.5444C10.977 22.6237 10.9705 22.7035 10.9685 22.7834C10.9685 24.6755 13.4393 26.1576 16.5935 26.1576C19.7477 26.1576 22.2185 24.6755 22.2185 22.7834C22.2165 22.7035 22.21 22.6237 22.199 22.5444C21.7835 22.9474 21.3089 23.2846 20.7916 23.5444Z" fill="#555555" />
                                            <path d="M16.5935 16.5974C13.4393 16.5974 10.9685 18.0795 10.9685 19.9716C10.9685 21.8637 13.4393 23.3458 16.5935 23.3458C19.7477 23.3458 22.2185 21.8637 22.2185 19.9716C22.2185 18.0795 19.7477 16.5974 16.5935 16.5974ZM16.5935 22.2211C13.9415 22.2211 12.0935 21.0355 12.0935 19.9716C12.0935 18.9077 13.9415 17.7221 16.5935 17.7221C19.2455 17.7221 21.0935 18.9077 21.0935 19.9716C21.0935 21.0355 19.2455 22.2211 16.5935 22.2211Z" fill="#555555" />
                                            <path d="M30.9206 19.7705L30.7045 20.4647H25.0464L25.2559 19.7705H30.9206ZM28.9691 26.8235L25.5834 22.796L25.5768 22.2132H26.6115C27.118 22.2132 27.5371 22.1172 27.8689 21.9251C28.2007 21.733 28.4517 21.4798 28.622 21.1654C28.7923 20.8511 28.8774 20.5127 28.8774 20.1504C28.8774 19.7138 28.7835 19.334 28.5958 19.0109C28.4081 18.6878 28.133 18.4368 27.7707 18.2578C27.4083 18.0744 26.963 17.9827 26.4347 17.9827H25.1446L25.3673 17.2886H26.4347C27.1158 17.2886 27.6986 17.4021 28.1832 17.6291C28.6678 17.8518 29.0367 18.177 29.29 18.6049C29.5475 19.0327 29.6763 19.5501 29.6763 20.1569C29.6763 20.6502 29.5737 21.1065 29.3685 21.5256C29.1677 21.9403 28.8468 22.2743 28.4059 22.5275C27.9693 22.7764 27.3952 22.9008 26.6836 22.9008L29.899 26.7384V26.8235H28.9691ZM30.9206 17.2886L30.7045 17.9827H25.6292L25.8453 17.2886H30.9206Z" fill="#555555" />
                                            <path d="M7.41181 25.0397L7.25599 25.5279H3.17651L3.32761 25.0397H7.41181ZM6.00476 30.0001L3.56369 27.1676L3.55896 26.7577H4.30498C4.67012 26.7577 4.9723 26.6901 5.21153 26.555C5.45076 26.4199 5.63176 26.2418 5.75452 26.0208C5.87728 25.7997 5.93866 25.5617 5.93866 25.3069C5.93866 24.9998 5.87099 24.7327 5.73563 24.5055C5.60028 24.2783 5.40197 24.1017 5.14071 23.9758C4.87944 23.8469 4.55837 23.7824 4.1775 23.7824H3.24734L3.40787 23.2942H4.1775C4.66855 23.2942 5.08877 23.374 5.43817 23.5337C5.78757 23.6903 6.05355 23.919 6.23612 24.2199C6.42184 24.5208 6.5147 24.8847 6.5147 25.3115C6.5147 25.6584 6.44073 25.9793 6.29278 26.2741C6.14799 26.5658 5.91663 26.8007 5.59871 26.9787C5.28393 27.1538 4.87 27.2413 4.35692 27.2413L6.67524 29.9402V30.0001H6.00476ZM7.41181 23.2942L7.25599 23.7824H3.59674L3.75255 23.2942H7.41181Z" fill="#555555" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5013_40">
                                                <rect width="36" height="36" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                </div>
                                <div className="col text-start clr-lit-blk">
                                    <p className={`fs-3   ${currentIndex === 1 ? 'clr_a' : 'clr_n'}`}>{data[0]?.Documentation?.Document_Needed[1]?.title}</p>
                                    <p className=" pt-5 less_space  md:max-w-[70%]"  >{data[0]?.Documentation?.Document_Needed[1]?.descri}</p>
                                </div>
                            </div>
                            <div className={`flex justify-start gap-4  ${currentIndex === 2 ? 'bor_lft_a' : 'bor_lft_n'}`} >
                                <div className="col-2 ms-3">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34.3124 18H31.8374L34.5936 13.2187C34.6682 13.0895 34.6884 12.936 34.6498 12.7919C34.6112 12.6478 34.5169 12.525 34.3878 12.4504L14.9028 1.20036C14.7736 1.12577 14.62 1.10556 14.4759 1.14417C14.3318 1.18278 14.209 1.27704 14.1344 1.40623L7.94688 12.1219C7.87229 12.2511 7.85208 12.4046 7.89069 12.5487C7.9293 12.6928 8.02356 12.8156 8.15276 12.8902L17.0082 18H11.8124C11.6632 18 11.5201 18.0592 11.4146 18.1647C11.3091 18.2702 11.2499 18.4133 11.2499 18.5625V22.5H9.71651C10.4046 21.8967 10.8925 21.0979 11.1149 20.2102C11.3374 19.3224 11.2839 18.388 10.9616 17.5315C10.6392 16.6749 10.0634 15.937 9.31095 15.4162C8.55846 14.8954 7.66504 14.6163 6.74988 14.6163C5.83472 14.6163 4.9413 14.8954 4.18881 15.4162C3.43632 15.937 2.86051 16.6749 2.5382 17.5315C2.21589 18.388 2.16239 19.3224 2.38484 20.2102C2.6073 21.0979 3.09512 21.8967 3.78325 22.5H2.81238C2.486 22.4985 2.16627 22.5922 1.89225 22.7695C1.61822 22.9468 1.40176 23.2 1.26932 23.4983C1.13687 23.7966 1.09417 24.1271 1.14644 24.4492C1.19871 24.7714 1.34367 25.0714 1.56363 25.3125C1.28147 25.6192 1.12486 26.0207 1.12486 26.4375C1.12486 26.8542 1.28147 27.2558 1.56363 27.5625C1.28147 27.8692 1.12486 28.2707 1.12486 28.6875C1.12486 29.1042 1.28147 29.5058 1.56363 29.8125C1.28147 30.1192 1.12486 30.5207 1.12486 30.9375C1.12486 31.3542 1.28147 31.7558 1.56363 32.0625C1.34367 32.3036 1.19871 32.6036 1.14644 32.9258C1.09417 33.2479 1.13687 33.5783 1.26932 33.8766C1.40176 34.1749 1.61822 34.4282 1.89225 34.6055C2.16627 34.7828 2.486 34.8764 2.81238 34.875H34.3124C34.4616 34.875 34.6046 34.8157 34.7101 34.7102C34.8156 34.6047 34.8749 34.4617 34.8749 34.3125V18.5625C34.8749 18.4133 34.8156 18.2702 34.7101 18.1647C34.6046 18.0592 34.4616 18 34.3124 18ZM30.9492 11.7624L33.3409 13.1434L31.9634 15.5317C31.4211 15.0888 31.0317 14.4867 30.85 13.8105C30.6683 13.1343 30.7036 12.4181 30.9509 11.763L30.9492 11.7624ZM14.8308 2.45586L17.2225 3.8368C16.7758 4.37534 16.173 4.76197 15.4973 4.94333C14.8215 5.12469 14.1061 5.09183 13.4498 4.8493L14.8308 2.45586ZM11.5953 13.5765L9.20576 12.1972L10.5873 9.80436C11.127 10.25 11.5142 10.8529 11.6949 11.5291C11.8756 12.2053 11.8408 12.921 11.5953 13.5765ZM12.5819 14.1457C12.9716 13.2262 13.0429 12.2028 12.7844 11.2381C12.526 10.2734 11.9526 9.42268 11.1554 8.82111L12.8811 5.83311C13.4303 6.06591 14.0205 6.1864 14.617 6.18748C15.3124 6.18746 15.9985 6.02659 16.6214 5.71745C17.2444 5.40832 17.7874 4.9593 18.208 4.40548L29.9654 11.1937C29.5752 12.1135 29.5038 13.1373 29.7625 14.1023C30.0212 15.0674 30.5951 15.9182 31.393 16.5195L30.5397 18H19.2588L12.5819 14.1457ZM16.2753 19.125H29.8495C29.9575 19.9493 30.2907 20.7278 30.8125 21.375H15.3123C15.834 20.7278 16.1673 19.9493 16.2753 19.125ZM12.3749 19.125H15.1356C15.0606 19.5818 14.8909 20.0179 14.6375 20.4054C14.3841 20.7929 14.0526 21.1231 13.6641 21.375H12.3749V19.125ZM2.81238 33.75C2.6632 33.75 2.52012 33.6907 2.41463 33.5852C2.30914 33.4797 2.24988 33.3367 2.24988 33.1875C2.24988 33.0383 2.30914 32.8952 2.41463 32.7897C2.52012 32.6842 2.6632 32.625 2.81238 32.625H6.29088C6.15286 32.9873 6.15286 33.3877 6.29088 33.75H2.81238ZM2.81238 31.5C2.6632 31.5 2.52012 31.4407 2.41463 31.3352C2.30914 31.2297 2.24988 31.0867 2.24988 30.9375C2.24988 30.7883 2.30914 30.6452 2.41463 30.5397C2.52012 30.4342 2.6632 30.375 2.81238 30.375H6.29088C6.15286 30.7373 6.15286 31.1377 6.29088 31.5H2.81238ZM2.81238 29.25C2.6632 29.25 2.52012 29.1907 2.41463 29.0852C2.30914 28.9797 2.24988 28.8367 2.24988 28.6875C2.24988 28.5383 2.30914 28.3952 2.41463 28.2897C2.52012 28.1842 2.6632 28.125 2.81238 28.125H6.29088C6.15286 28.4873 6.15286 28.8877 6.29088 29.25H2.81238ZM2.81238 27C2.6632 27 2.52012 26.9407 2.41463 26.8352C2.30914 26.7297 2.24988 26.5867 2.24988 26.4375C2.24988 26.2883 2.30914 26.1452 2.41463 26.0397C2.52012 25.9342 2.6632 25.875 2.81238 25.875H6.29088C6.15286 26.2373 6.15286 26.6377 6.29088 27H2.81238ZM2.81238 24.75C2.6632 24.75 2.52012 24.6907 2.41463 24.5852C2.30914 24.4797 2.24988 24.3367 2.24988 24.1875C2.24988 24.0383 2.30914 23.8952 2.41463 23.7897C2.52012 23.6842 2.6632 23.625 2.81238 23.625H6.29088C6.15286 23.9873 6.15286 24.3877 6.29088 24.75H2.81238ZM3.37488 19.125C3.37488 18.4575 3.57282 17.805 3.94367 17.2499C4.31452 16.6949 4.84162 16.2623 5.45832 16.0069C6.07502 15.7514 6.75362 15.6846 7.40831 15.8148C8.063 15.9451 8.66436 16.2665 9.13637 16.7385C9.60837 17.2105 9.92981 17.8119 10.06 18.4666C10.1903 19.1212 10.1234 19.7998 9.86797 20.4165C9.61253 21.0332 9.17995 21.5603 8.62493 21.9312C8.06991 22.302 7.41739 22.5 6.74988 22.5C5.85505 22.4991 4.99712 22.1432 4.36438 21.5105C3.73164 20.8777 3.37577 20.0198 3.37488 19.125ZM13.4999 33.75H7.87488C7.7257 33.75 7.58262 33.6907 7.47713 33.5852C7.37164 33.4797 7.31238 33.3367 7.31238 33.1875C7.31238 33.0383 7.37164 32.8952 7.47713 32.7897C7.58262 32.6842 7.7257 32.625 7.87488 32.625H13.4999C13.6491 32.625 13.7921 32.6842 13.8976 32.7897C14.0031 32.8952 14.0624 33.0383 14.0624 33.1875C14.0624 33.3367 14.0031 33.4797 13.8976 33.5852C13.7921 33.6907 13.6491 33.75 13.4999 33.75ZM13.4999 31.5H7.87488C7.7257 31.5 7.58262 31.4407 7.47713 31.3352C7.37164 31.2297 7.31238 31.0867 7.31238 30.9375C7.31238 30.7883 7.37164 30.6452 7.47713 30.5397C7.58262 30.4342 7.7257 30.375 7.87488 30.375H13.4999C13.6491 30.375 13.7921 30.4342 13.8976 30.5397C14.0031 30.6452 14.0624 30.7883 14.0624 30.9375C14.0624 31.0867 14.0031 31.2297 13.8976 31.3352C13.7921 31.4407 13.6491 31.5 13.4999 31.5ZM13.4999 29.25H7.87488C7.7257 29.25 7.58262 29.1907 7.47713 29.0852C7.37164 28.9797 7.31238 28.8367 7.31238 28.6875C7.31238 28.5383 7.37164 28.3952 7.47713 28.2897C7.58262 28.1842 7.7257 28.125 7.87488 28.125H13.4999C13.6491 28.125 13.7921 28.1842 13.8976 28.2897C14.0031 28.3952 14.0624 28.5383 14.0624 28.6875C14.0624 28.8367 14.0031 28.9797 13.8976 29.0852C13.7921 29.1907 13.6491 29.25 13.4999 29.25ZM13.4999 27H7.87488C7.7257 27 7.58262 26.9407 7.47713 26.8352C7.37164 26.7297 7.31238 26.5867 7.31238 26.4375C7.31238 26.2883 7.37164 26.1452 7.47713 26.0397C7.58262 25.9342 7.7257 25.875 7.87488 25.875H13.4999C13.6491 25.875 13.7921 25.9342 13.8976 26.0397C14.0031 26.1452 14.0624 26.2883 14.0624 26.4375C14.0624 26.5867 14.0031 26.7297 13.8976 26.8352C13.7921 26.9407 13.6491 27 13.4999 27ZM13.4999 24.75H7.87488C7.7257 24.75 7.58262 24.6907 7.47713 24.5852C7.37164 24.4797 7.31238 24.3367 7.31238 24.1875C7.31238 24.0383 7.37164 23.8952 7.47713 23.7897C7.58262 23.6842 7.7257 23.625 7.87488 23.625H13.4999C13.6491 23.625 13.7921 23.6842 13.8976 23.7897C14.0031 23.8952 14.0624 24.0383 14.0624 24.1875C14.0624 24.3367 14.0031 24.4797 13.8976 24.5852C13.7921 24.6907 13.6491 24.75 13.4999 24.75ZM33.7499 33.75H30.9891C31.1035 33.0589 31.4311 32.4208 31.9262 31.9252C32.4212 31.4295 33.0589 31.1011 33.7499 30.9859V33.75ZM33.7499 29.8502C32.7578 29.9711 31.8348 30.4209 31.1282 31.1278C30.4217 31.8346 29.9723 32.7578 29.8518 33.75H15.0839C15.19 33.4651 15.2146 33.1563 15.155 32.8583C15.0954 32.5602 14.9539 32.2846 14.7464 32.0625C15.0285 31.7558 15.1852 31.3542 15.1852 30.9375C15.1852 30.5207 15.0285 30.1192 14.7464 29.8125C15.0285 29.5058 15.1852 29.1042 15.1852 28.6875C15.1852 28.2707 15.0285 27.8692 14.7464 27.5625C15.0285 27.2558 15.1852 26.8542 15.1852 26.4375C15.1852 26.0207 15.0285 25.6192 14.7464 25.3125C14.9662 25.0715 15.1111 24.7717 15.1635 24.4498C15.2158 24.1278 15.1733 23.7976 15.0411 23.4994C14.909 23.2012 14.6929 22.9479 14.4192 22.7704C14.1455 22.5929 13.8261 22.499 13.4999 22.5H29.8512C29.9774 23.4899 30.4287 24.4099 31.1344 25.1155C31.84 25.8211 32.76 26.2725 33.7499 26.3987V29.8502ZM33.7499 25.2619C33.0603 25.144 32.4242 24.815 31.9295 24.3203C31.4348 23.8256 31.1059 23.1896 30.988 22.5H33.7499V25.2619ZM33.7499 21.375H32.4606C32.0722 21.1231 31.7406 20.7929 31.4872 20.4054C31.2338 20.0179 31.0642 19.5818 30.9891 19.125H33.7499V21.375Z" fill="#555555" />
                                        <path d="M25.4117 26.2968L25.204 26.9392H19.7646L19.9661 26.2968H25.4117ZM23.5357 32.8235L20.2809 29.0966L20.2746 28.5572H21.2693C21.7561 28.5572 22.159 28.4683 22.478 28.2906C22.797 28.1128 23.0383 27.8785 23.202 27.5876C23.3657 27.2967 23.4475 26.9836 23.4475 26.6483C23.4475 26.2443 23.3573 25.8928 23.1768 25.5938C22.9963 25.2948 22.7319 25.0625 22.3836 24.8969C22.0352 24.7272 21.6071 24.6424 21.0993 24.6424H19.8591L20.0731 24H21.0993C21.754 24 22.3143 24.105 22.7802 24.3151C23.2461 24.5212 23.6007 24.8222 23.8441 25.2181C24.0918 25.614 24.2156 26.0928 24.2156 26.6543C24.2156 27.1109 24.1169 27.533 23.9197 27.9209C23.7266 28.3047 23.4181 28.6138 22.9942 28.8481C22.5745 29.0784 22.0226 29.1935 21.3385 29.1935L24.4296 32.7447V32.8235H23.5357ZM25.4117 24L25.204 24.6424H20.3249L20.5327 24H25.4117Z" fill="#252525" />
                                        <path d="M8.11772 18.4885L8.01384 18.8226H5.29419L5.39492 18.4885H8.11772ZM7.17969 21.8824L5.5523 19.9444L5.54916 19.6639H6.0465C6.28993 19.6639 6.49138 19.6177 6.65087 19.5253C6.81035 19.4328 6.93102 19.311 7.01286 19.1597C7.0947 19.0085 7.13562 18.8457 7.13562 18.6713C7.13562 18.4612 7.0905 18.2784 7.00027 18.123C6.91003 17.9675 6.77783 17.8467 6.60365 17.7606C6.42948 17.6723 6.21543 17.6282 5.96151 17.6282H5.34141L5.44843 17.2942H5.96151C6.28888 17.2942 6.56903 17.3488 6.80196 17.4581C7.03489 17.5652 7.21222 17.7217 7.33393 17.9276C7.45774 18.1335 7.51965 18.3824 7.51965 18.6744C7.51965 18.9118 7.47033 19.1314 7.3717 19.3331C7.27517 19.5326 7.12093 19.6933 6.90898 19.8152C6.69913 19.9349 6.42318 19.9948 6.08113 19.9948L7.62667 21.8415V21.8824H7.17969ZM8.11772 17.2942L8.01384 17.6282H5.57434L5.67821 17.2942H8.11772Z" fill="#252525" />
                                        <path d="M23.7108 12.0571L23.3023 12.4506L19.2731 10.2949L19.6769 9.89888L23.7108 12.0571ZM19.7343 16.1483L18.8005 12.0976L19.0096 11.6956L19.7464 12.0898C20.107 12.2827 20.4407 12.3766 20.7474 12.3713C21.0542 12.3661 21.3258 12.2881 21.5623 12.1375C21.7989 11.9869 21.9836 11.7874 22.1165 11.539C22.2766 11.2398 22.3491 10.9436 22.3339 10.6506C22.3187 10.3577 22.2149 10.0808 22.0225 9.82002C21.8317 9.55626 21.5482 9.32375 21.172 9.12248L20.2533 8.63094L20.6665 8.23994L21.4266 8.64664C21.9116 8.90613 22.285 9.206 22.5469 9.54626C22.8103 9.88353 22.9537 10.247 22.9771 10.6368C23.0036 11.0282 22.9056 11.4319 22.683 11.8479C22.5021 12.1861 22.2617 12.4597 21.9619 12.6689C21.6668 12.8767 21.3158 12.9833 20.9089 12.9889C20.5067 12.9932 20.0523 12.8597 19.5455 12.5886L20.4278 16.4443L20.3966 16.5026L19.7343 16.1483ZM24.6211 10.3558L24.2126 10.7493L20.5984 8.81558L21.0069 8.42208L24.6211 10.3558Z" fill="#252525" />
                                    </svg>
                                </div>
                                <div className="col text-start clr-lit-blk ">
                                    <p className={`fs-3 restop  ${currentIndex === 2 ? 'clr_a' : 'clr_n'}`}>{data[0]?.Documentation?.Document_Needed[2]?.title}</p>
                                    <p className=" pt-5 less_space  md:max-w-[70%]"  >{data[0]?.Documentation?.Document_Needed[2]?.descri}</p>
                                </div>
                            </div>
                            <div className="text-center mt-5 mt-lg-4">
                                <a href="#form">
                                    <button
                                        onClick={toggleHighlight}
                                        className=" shadow  hover-shadow ms-4 ms-md-0 mt-1"
                                    >
                                        {data[0]?.Header?.cta_name}
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mt-5 m-auto clr-lit-blk  ">
                <p className=" text-center mb-5 leading-10 text-2xl " style={{ fontWeight: "600" }}>
                    {data[0]?.Footprints?.title}   <span className="clr-rse">     {data[0]?.Footprints?.clr_title} </span>
                </p>
            </div>

            <div className="max-w-[1180px]  m-auto  bg-white rounded-lg p-5" ref={sectionRef}>
                <div className="flex md:flex-row flex-col  mx-5 mx-lg-0 md:!justify-around  !justify-center items-center
                 pt-4 pt-lg-5 pb-4 pb-lg-3 " style={{ borderRadius: "20px !important" }}>
                    <div className="flex lg:justify-center justify-start  lg:col-3   mt-3 ">
                        <div className="flex  justify-center items-start  my-auto text-end gap-3">
                            <img className=" " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/calendar.svg" alt="" />
                            <p className="text-start foot_txt text-lg" style={{ marginTop: "-7px" }}><span className=" font-semibold text-[32px]"><CountUp start={0} end={24} duration={5} /></span> <br />
                                {data[0]?.Footprints?.counts[0]?.key}</p>
                        </div>
                    </div>
                    <div className="flex lg:justify-center justify-start  lg:col-3  mt-3  ">
                        <div className="flex justify-center  items-start  my-auto  gap-3">
                            <img className=" " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/network.svg" alt="" />
                            <p className="text-start foot_txt text-lg" style={{ marginTop: "-7px" }}><span className=" font-semibold text-[32px]"><CountUp start={0} end={181} duration={3} /></span> <br />
                                {data[0]?.Footprints?.counts[1]?.key}</p>
                        </div>
                    </div>

                    <div className="flex lg:justify-center justify-start lg:col-3  mt-3 ">
                        <div className="flex justify-center  items-start my-auto  gap-3">
                            <img className=" " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/satellite.svg" alt="" />
                            <p className="text-start  foot_txt text-lg" style={{ marginTop: "-7px" }}><span className=" font-semibold text-[32px]"><CountUp start={0} end={41} duration={3} /></span> <br />
                                {data[0]?.Footprints?.counts[2]?.key}  {data[0]?.Footprints?.counts[2]?.keybr} </p>
                        </div>
                    </div>
                    <div className="flex lg:justify-center justify-start  lg:col-3  mt-3 ">
                        <div className="flex justify-center items-start  my-auto  gap-3">
                            <img className=" " src="https://repcohome.s3.ap-south-1.amazonaws.com/repcocampaign/bank.svg" alt="" />
                            <p className="text-start foot_txt text-lg" style={{ marginTop: "-7px" }}><span className=" font-semibold text-[32px]"><CountUp start={0} end={14} duration={5} /></span> <br />
                                {data[0]?.Footprints?.counts[3]?.key}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px]   m-auto bg-white rounded-lg">
                <div className=""></div>
            </div>

            <div className="max-w-[1280px]  m-auto clr-lit-blk  ">
                <p className="text-2xl text-center   mt-10 mb-10 leading-8 pt-4 pt-lg-5 pb-2 pb-lg-3" style={{ fontWeight: "600" }}>
                    {data[0]?.about?.title} <br />  <span className="clr-rse"> {data[0]?.about?.clr_title} </span>
                </p>
            </div>
            {/* home-img end */}
            <div className="max-w-[1380px]  m-auto " >

                {
                    data[0]?.about?.Testimonial ?
                        <>
                            <div className="">
                                <Carousel
                                    responsive={responsivet}
                                    infinite={true}
                                    slidesToShow={1}
                                    autoPlay={true}
                                    arflexs={false}
                                    showDots={true}
                                    autoplaySpeed={1000}
                                    pauseOnHover={true}
                                >
                                    {data[0]?.about?.Testimonial?.map((testo, index) => (
                                        <div className="  mx-2" key={index}>
                                            <div className="border  flex  flex-col justify-between   bg-white p-4 testm_box">
                                                <div className="">
                                                    <p className="text-start  clr-lit-blk" style={{ fontSize: "14px" }}> <span className="fw-bold"> "</span> {testo?.msg}<span className="fw-bold"> "</span></p>
                                                </div>
                                                <div className="flex justify-between items-center ">
                                                    <div className="flex justify-center items-center gap-2  ">
                                                        <img className="" style={{ width: "20%" }} src={testo?.profileimg} alt="" />
                                                        <p className="text-start my-auto " style={{ fontSize: "12px" }}>{testo?.name}</p>
                                                    </div>
                                                    <p className=" "><img className=" mt-5" src={testo?.star} alt="" /></p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                    )}

                                </Carousel>
                            </div>
                        </> : ""
                }

            </div>

            <div className="mt-10 m-auto flex justify-center">
                <a href="#form">  <img className="" src={data[0]?.Secure_Dream?.img} alt="" />
                </a>
            </div>
            <div className="max-w-[1280px]  m-auto">

                <div className="grid grid-cols-2 items-center p-5">
                    <div className="  text-lg-start  text-center   ">
                        <p className=" ms-0 ms-md-5 textir ">
                            <img
                                className=""
                                width={160}
                                src={data[0]?.footer?.img}
                                alt=""
                            />
                        </p>
                    </div>

                    <div className="   mt-0 mt-lg-4">
                        <p className=" mt-3 mt-md-0 textirs" style={{ fontWeight: "400" }}>
                            {data[0]?.footer?.cpyrt}
                        </p>
                    </div>
                </div>
                {/* <p className="text-center mt-3 mt-md-0" style={{ fontWeight: "400" }}>
          © 2024 All rights reserved.
        </p> */}
            </div>
            {/* footer end */}
        </div >
    );
}

export default Leads