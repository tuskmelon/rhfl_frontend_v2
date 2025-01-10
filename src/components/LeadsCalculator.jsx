'use client'
import React, { useEffect, useState } from "react";
import "../styles/leadsCalculator.css";
import { PieChart } from "react-minimal-pie-chart";
import "../app/leads/leads.css";

import json from "../Language/en.json";
import { useSearchParams } from "next/navigation";
const LeadsCalculator = ({ toggleHighlight, lan }) => {



    const [principle, setPrinciple] = useState(500000);
    const [interest, setInterest] = useState(5);
    const [loanTerm, setLoanTerm] = useState(10);
    const [btn, setBtn] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);
    const searchParams = useSearchParams()
    const search = searchParams.get('la')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

        // if (search == null || search === "" || !["en", "tg", "ta", "ka"].includes(search)) {
        if (search == null || search === "" || !["english", "tamil", "telugu", "kannada"].includes(search)) {
            setData(json.filter((item) => item?.la === "english"));
        } else {
            setData(json.filter((item) => item?.la === search));
        }
    }, [search])

    // console.log(data, "data");
    const handlePrincipleChange = (event) => {
        setPrinciple(Number(event.target.value));
    };
    const handleInterestChange = (event) => {
        setInterest(Number(event.target.value));
    };
    const handleLoanTermChange = (event) => {
        setLoanTerm(Number(event.target.value));
    };
    const calculateEmi = () => {
        const n = loanTerm * (btn ? 1 : 12);
        const r = interest / 12 / 100;
        const amount = (principle * r * (1 + r) ** n) / ((1 + r) ** n - 1);
        return Math.round(amount);
    };
    // (Principal Amount x Interest Rate x Time) - Principal Amount
    const InterestPayable = () => {
        const n = loanTerm * (btn ? 1 : 12);
        // const r = interest / 12 / 100;
        const interestPay = calculateEmi() * n - principle;
        return Math.round(interestPay);
    };
    // useEffect(()=>{
    //   const btn=document.getElementbyId('bt1')
    //   const btn2 = document.getElementbyId('bt2')
    // })
    const handClick = () => {
        // console.log(btn);
        setBtn(!btn);
    };
    const handClick1 = () => {
        setBtn(!btn);
    };
    let piedata = [
        {
            title: "Principal Amount",
            value: principle,
            color: "#FFB200",
            lable: "",
        },
        {
            title: "Interest Payable",
            value: InterestPayable(),
            color: "#658BEE",
            lable: "",
        },
    ];

    const totalValue = piedata.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0
    );
    return (
        <div className="max-w-[1280px] md:m-auto rounded-lg mt-20 calculator  m-3">
            <div className={` mx-0 mx-lg-5 rounded-3 mt-3 bg`}>

                <div className=" py-3  mt-3 mt-lg-0 max-w-[1100px] m-auto" style={{ marginTop: "-20px" }}>
                    <div className=" clr-lit-blk p-0 my-3 my-lg-0">
                        <p className="lg:text-4xl text-2xl  text-start" style={{ fontWeight: "600" }}>
                            {data[0]?.Calci?.title}  <span className={` text`}>   {data[0]?.Calci?.clr_title} </span>
                        </p>
                        <p className="md:text-lg !text-md mt-3 text-start"> {data[0]?.Calci?.description}</p>
                    </div>

                    <div className={`grid md:grid-cols-2 grid-cols-1 `}>

                        <div
                            className={` pt-5  px-4 bor-rad mb-4 borderrr mt-3 pb-4 `}
                        >
                            <div className="grid">
                                <div className="flex flex-col">
                                    <div className="flex mb-5 justify-between items-center">
                                        <p className={` mt-2 font-semibold  heading`}>
                                            {data[0]?.Calci?.LoanAmount}
                                        </p>
                                        <p className="card pt-2 px-3 py-1 fs-5 font-semibold ">
                                            ₹{principle.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <input
                                        type="range"
                                        className="w-full  mb-5"
                                        min="0"
                                        max="10000000"
                                        step="100000"
                                        value={principle}
                                        id="value1"
                                        list="valu"
                                        onChange={handlePrincipleChange}
                                    />
                                </div>
                                <div className="flex mt-2 justify-between">
                                    <p>₹1 {data[0]?.Calci?.Lakhs}  </p>
                                    <p>₹1 {data[0]?.Calci?.Crore} </p>
                                </div>
                            </div>

                            <div className="grid mt-4">
                                <div className=" flex flex-wrap justify-between mb-4 items-center">
                                    <div>
                                        <p className={` mt-3 font-semibold  heading`}>{data[0]?.Calci?.Tenure} </p>
                                    </div>
                                    <div
                                        className={` flex justify-center items-center  e`}
                                    >
                                        <button
                                            className={`btn p-2  rounded-0  border-0 `}
                                            type="button"
                                            id="bt1"
                                            style={{
                                                backgroundColor: btn ? "#FF0169" : "#FFF",
                                                color: btn ? "white" : "#8F7C84",
                                                fontWeight: btn ? "500" : "400",
                                            }}
                                            onClick={handClick}
                                        >
                                            {data[0]?.Calci?.Months}
                                        </button>
                                        <button
                                            className="btn p-2  rounded-0  border-0"
                                            type="button"
                                            id="bt2"
                                            style={{
                                                backgroundColor: btn ? "#FFF" : "#FF0169",
                                                color: btn ? "#8F7C84" : "white",
                                                fontWeight: btn ? "400" : "500",
                                            }}
                                            onClick={handClick1}
                                        >
                                            {data[0]?.Calci?.years}
                                        </button>
                                    </div>
                                    <div className="cardd fs-5  text-center    ">
                                        <p
                                            style={{ width: "50px" }}
                                            className=" font-semibold border flex mt-3 rounded bg-white px-3 py-1 justify-center items-center"
                                        >
                                            {!btn && loanTerm > 30
                                                ? setLoanTerm(Math.round(loanTerm / 12))
                                                : loanTerm}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid">
                                <div className="flex flex-col">
                                    <div>
                                        <input
                                            type="range"
                                            className="w-full mb-4"
                                            min="1"
                                            max={btn ? 360 : 30}
                                            step={btn ? "2" : "1"}
                                            value={loanTerm}
                                            id="loan"
                                            list="year"
                                            onChange={handleLoanTermChange}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <p>1{btn ? data[0]?.Calci?.Months : data[0]?.Calci?.years}</p>
                                        <p>
                                            {btn ? 360 : 30} {btn ? data[0]?.Calci?.Months : data[0]?.Calci?.years}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid  mt-4">
                                <div className="col flex justify-between items-center">
                                    <p className={`mt-4 font-semibold heading `}>
                                        {data[0]?.Calci?.InterestRate}
                                    </p>
                                    <p className="fs-5  text-center  font-semibold border flex mt-3 rounded bg-white px-3 py-1 justify-center items-center">
                                        {interest}
                                    </p>
                                </div>
                            </div>

                            <div className="grid">
                                <div className="col">
                                    <input
                                        type="range"
                                        className="w-full mt-4"
                                        min="1"
                                        max="15"
                                        step="0.25"
                                        value={interest}
                                        list="Values1"
                                        id="intrest"
                                        onChange={handleInterestChange}
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <p>1%</p>
                                    <p>15%</p>
                                </div>
                            </div>

                            <div className="mt-4  text-center text-lg-start">
                                <a href="#form">
                                    <button
                                        onClick={toggleHighlight}
                                        className=" shadow  hover-shadow ms-4 ms-md-0 mt-1"
                                    >
                                        {data[0]?.Calci?.cta}
                                    </button>
                                </a>
                            </div>

                        </div>

                        <div
                            className={`pt-5  bor-radr mb-4 mt-3 px-4  borderrr `}
                        >
                            <div className="flex   justify-around pt-2  items-center">
                                <div className="mt-4 max-w-[60%] lh-sm">
                                    <p className={` monthly fs-2 fss-2 clr-lit-blk`}>
                                        {data[0]?.Calci?.MonthlyEMI}
                                    </p>
                                    <p id="emi" className="  cal-am  font-semibold">
                                        ₹{calculateEmi().toLocaleString("en-IN")}
                                    </p>
                                </div>
                                <div className="max-w-[50%]   "  >
                                    <PieChart
                                        data={piedata}
                                        label={({ dataEntry }) =>
                                            `${dataEntry.lable} ${(
                                                (dataEntry.value / totalValue) *
                                                100
                                            ).toFixed(0)}%`
                                        }
                                        labelStyle={{
                                            fontSize: "10px",
                                            fontWeight: "500",
                                            fill: "#fff",
                                        }}

                                    //   radius={50}

                                    // segmentsShift={(index) => (index === 0 ? 4 : 0)}
                                    // segmentsStyle={{ transition: 'stroke .5s'}}
                                    />
                                </div>
                            </div>
                            <div className="grid mt-5 pt-2 pt-md-4">
                                <div className="w-full  mb-2 mb-md-0">
                                    <div className="flex d-md-inline  lh-sm   justify-between">
                                        <p className={` fnt-si comm md:!text-lg !text-sm`}>  {data[0]?.Calci?.InterestPayable}  </p>
                                        <p className={`font-semibold font-siz   `}>
                                            ₹{InterestPayable().toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex lh-sm d-md-inline  justify-between">
                                        <p className={`fnt-si  comm md:!text-lg !text-sm `}>  {data[0]?.Calci?.PrincipalAmount} </p>
                                        <p className={` font-semibold   font-siz`}>
                                            ₹ {principle.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default LeadsCalculator;