'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import '../../styles/Home_Loan_Calculator.css';
import { useCallback } from "react";
import { yearlyAmortizationSchedule, amortizationSchedule } from 'amortization';
// Dynamically import HighchartsReact to prevent SSR issues
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Calculation_Table from '../Home/Calculator/Calculation_Table';
// import { debounce } from 'lodash';


if (typeof window !== 'undefined') {
    highcharts3d(Highcharts);
}

const EligibileCalci = () => {

    const pathname = usePathname()

    const [totalAmount, setTotalAmount] = useState(10000);
    const [totalAmountMin] = useState(10000);
    const [totalAmountMax] = useState(10000000);

    const [tenure, setTenure] = useState(6);
    const [minTenure] = useState(1);
    const [maxTenure] = useState(25);

    const [interest, setInterest] = useState(8.5);
    const [minInterest] = useState(5);
    const [maxInterest] = useState(15);

    const [othermonthlyEmi, setotherMonthlyEmi] = useState(0);
    const [minOtherEmi] = useState(0);

    const [amortizationDetails, setAmortizationDetails] = useState([]);
    // const [monthlyAmortizationDetails, setMonthlyAmortizationDetails] = useState([]);
    // const [monthlyEmi, setMonthlyEmi] = useState(0);
    const [invalidAmount, setInvalidAmount] = useState(false);
    const [invalidTenure, setInvalidTenure] = useState(false);
    const [invalidInterest, setInvalidInterest] = useState(false);
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [yearlySummary, setYearlySummary] = useState([]);

    const [state, setState] = useState({
        eligibleEMI: 0,
        amortization: null,
        loanEligibilityPrincipalAmount: 0,

        interestPayable: 0,
        yearlyAmortizationDetails: [],
        monthlyAmortizationDetails: [],
        showMonthModal: false,
        currentYear: null,
    });



    const newAmortizationCalculator = (princ) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const Constants = {
            CentsPerDollar: 100,
            MonthsPerYear: 12,
        };

        class Payment {
            constructor(principalInCents, interestInCents, year, month) {
                this.principalInCents = principalInCents;
                this.interestInCents = interestInCents;
                this.year = year;
                this.month = month;
            }
            amountInCents() {
                return this.principalInCents + this.interestInCents;
            }
            amountInDollars() {
                return this.amountInCents() / Constants.CentsPerDollar;
            }
            interestInDollars() {
                return this.interestInCents / Constants.CentsPerDollar;
            }
            principalInDollars() {
                return this.principalInCents / Constants.CentsPerDollar;
            }
        }

        const principal = princ;
        const interestAPR = interest;
        const monthsToMaturity = tenure * 12;
        const principalPerPaymentAdditional = 0;
        const payments = [];
        let yearCurrent = year;
        let monthCurrent = month + 1;

        const centsPerDollar = Constants.CentsPerDollar;
        let principalRemainingInCents = principal * centsPerDollar;

        const interestRatePerMonth =
            interestAPR / 100 / Constants.MonthsPerYear;

        const denominator =
            Math.pow(1 + interestRatePerMonth, monthsToMaturity) - 1;

        const amountPerPaymentInCents = Math.round(
            principalRemainingInCents *
            ((interestRatePerMonth / denominator) + interestRatePerMonth)
        );

        for (let t = 0; t < monthsToMaturity; t++) {
            const interestThisPaymentInCents = Math.round(
                principalRemainingInCents * interestRatePerMonth
            );

            let principalThisPaymentInCents =
                amountPerPaymentInCents - interestThisPaymentInCents;

            if (principalThisPaymentInCents > principalRemainingInCents) {
                principalThisPaymentInCents = principalRemainingInCents;
            }

            principalRemainingInCents -= principalThisPaymentInCents;

            const payment = {
                principalPaymentRounded: principalThisPaymentInCents,
                interestPaymentRounded: interestThisPaymentInCents,
                paymentYear: yearCurrent,
                payment: principalThisPaymentInCents + interestThisPaymentInCents,
                paymentDate: monthCurrent,
                paymentMonth: new Date(yearCurrent, monthCurrent - 1).toLocaleString('default', { month: 'long' }) // This gives the full month name
            };


            payments.push(payment);

            monthCurrent++;
            if (monthCurrent > Constants.MonthsPerYear) {
                yearCurrent++;
                monthCurrent = 1;
            }

            if (principalRemainingInCents <= 0) break;
        }

        const returnValue = {
            loan: {
                interestAPR: interest,
                monthsToMaturity,
                principal,
            },
            payments,
        };

        calculateYearlyAmortization(returnValue);
        setState((prevState) => ({
            ...prevState,
            amortization: returnValue,
        }));
    };

    const calculateYearlyAmortization = (values) => {
        const yearlyAmortization = [];
        let loopYear = null;
        let principalAmount = 0;
        let interestAmount = 0;
        //console.log(values, "values");
        values?.payments.forEach((payment, index) => {
            if (loopYear === null || loopYear < payment.paymentYear) {
                if (loopYear !== null) {
                    yearlyAmortization.push({
                        totalPrincipal: principalAmount?.toFixed(0),
                        totalInterest: interestAmount?.toFixed(0),
                        totalPayment: (principalAmount + interestAmount).toFixed(0),
                        year: loopYear,
                    });
                }
                loopYear = payment.paymentYear;
                principalAmount = payment.principalPaymentRounded / 100;
                interestAmount = payment.interestPaymentRounded / 100;
            } else {
                principalAmount += payment.principalPaymentRounded / 100;
                interestAmount += payment.interestPaymentRounded / 100;
            }

            if (index === values.payments.length - 1) {
                yearlyAmortization.push({
                    totalPrincipal: principalAmount.toFixed(0),
                    totalInterest: interestAmount.toFixed(0),
                    totalPayment: (principalAmount + interestAmount).toFixed(0),
                    year: loopYear,
                });
            }
        });

        setState((prevState) => ({
            ...prevState,
            yearlyAmortizationDetails: yearlyAmortization,
        }));
    };


    const formatValue = (value) => {
        const valueString = value?.toString();
        const lastThree = valueString?.slice(-3);
        const otherNumbers = valueString?.slice(0, -3);
        const formattedValue =
            otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers && "," + lastThree);
        return formattedValue;
    };

    const handleSliderChange = (value) => {
        if (value >= totalAmountMin && value <= totalAmountMax) {
            setTotalAmount(value);
            setInvalidAmount(false);
        } else {
            setInvalidAmount(true);
        }

    };

    const handleTenureChange = (value) => {
        if (value >= minTenure && value <= maxTenure) {
            setTenure(value);
            setInvalidTenure(false);
        } else {
            setInvalidTenure(true);
        }
    };

    const handleInterestChange = (value) => {
        if (value >= minInterest && value <= maxInterest) {
            setInterest(value);
            setInvalidInterest(false);
        } else {
            setInvalidInterest(true);
        }
    };

    const handleOtherEmiSliderChange = (value) => {
        if (value >= minOtherEmi && value <= getOtherEMIMaxValue()) {
            setotherMonthlyEmi(value);
        } else {
            // setotherMonthlyEmi(true);
        }
    };

    const onSliderChange = (e) => handleSliderChange(Number(e.target.value));
    const handleInputChange = (e) => handleSliderChange(Number(e.target.value));
    const handleSliderYrChange = (e) => handleTenureChange(Number(e.target.value));
    const handleYrInputChange = (e) => handleTenureChange(Number(e.target.value));
    const handleInterestSliderChange = (e) => handleInterestChange(Number(e.target.value));
    const handleInterestInputChange = (e) => handleInterestChange(Number(e.target.value));

    const handleOtherEmiSliderChanges = (e) => handleOtherEmiSliderChange(Number(e.target.value))
    const handleOtherEmiInputChange = (e) => handleOtherEmiSliderChange(Number(e.target.value))

    const highChartOptions = {
        colors: ["#EC6B5680", "#fdb515", "#ec1852"],
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 0,
                depth: 60,
            },
            events: {
                load: function () {
                    const renderer = this.renderer;
                    this.series[0].points.forEach((point, i) => {
                        if (point.connector) {
                            const marker = renderer.createElement('marker').add(renderer.defs).attr({
                                markerWidth: 10,
                                markerHeight: 10,
                                refX: 5,
                                refY: 5,
                                orient: 'auto',
                                id: `connector-marker-${i}`,
                            });

                            renderer.circle(5, 5, 5).add(marker).attr({
                                fill: point.color,
                            });

                            point.connector.attr({
                                'marker-start': `url(#connector-marker-${i})`,
                            });
                        }
                    });
                },
            },
        },
        credits: {
            enabled: false,
        },
        title: {
            text: null,
        },
        tooltip: {
            valuePrefix: '₹',
            formatter: function () {
                return `<b>${this.point.name}</b>: ₹${this.y}`;
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 100,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: { fontFamily: "'Montserrat', sans-serif", fontSize: '1rem' },
                },
            },
        },
        series: [
            {
                type: 'pie',
                dataLabels: {
                    enabled: false,
                    connectorShape: 'crookedLine',
                    crookDistance: '95%',
                },
                data: [
                    ["Monthly Salary", totalAmount],
                    ["Interest Payabe", Number(
                        state.interestPayable - state.loanEligibilityPrincipalAmount
                    )],
                    ["Eligible Amount", Number(state.loanEligibilityPrincipalAmount)],
                ],
            },
        ],
    };


    const getOtherEMIMaxValue = () => {
        if (totalAmount <= 20000) {
            return ((totalAmount / 100) * 40)
        }
        else if (totalAmount > 20000 && totalAmount <= 50000) {
            return ((totalAmount / 100) * 50)
        }
        else {
            return ((totalAmount / 100) * 60)
        }
    }


    const getCalculatedEMI = () => {
        let totalThreshold = getOtherEMIMaxValue() - othermonthlyEmi;

        if (totalThreshold > 0) {
            setState((prevState) => ({
                ...prevState,
                eligibleEMI: totalThreshold,
            }));

            const emi = totalThreshold;
            const term = tenure * 12;
            const intr = interest / 1200;
            const princ = Math.round(
                emi * (1 - Math.pow(1 / (1 + intr), term)) / intr
            );

            const interestPayable = emi * term;
            const loanEligibilityPrincipalAmount = Math.abs(
                Math.round(interestPayable - princ) - interestPayable
            );

            setState((prevState) => ({
                ...prevState,
                interestPayable,
                loanEligibilityPrincipalAmount,
            }));
            newAmortizationCalculator(loanEligibilityPrincipalAmount);

            return totalThreshold;
        } else {
            setState((prevState) => ({
                ...prevState,
                eligibleEMI: 'Not Eligible',
                loanEligibilityPrincipalAmount: 'Not Eligible',
                interestPayable: 'Not Eligible',
                yearlyAmortizationDetails: [],
                monthlyAmortizationDetails: [],
            }));

            return 'Not Eligible for Loan';
        }
    };

    //console.log(state, "state");

    return (
        <div className="Base-wrapper CalculatorModule m-auto  mt-10">
            <h1 className="mb-1 mb-sm-1 mb-md-3 mb-lg-0 headings text-center">Calculate Loan Eligibility</h1>

            <div className="grid md:grid-cols-4 grid-cols-1 justify-center items-center md:gap-7 gap-2">
                <div className="slider-container col-span-3">
                    <h3 className='text-[#6C6363] font-medium text-xl mb-3'>Monthly Salary</h3>
                    <input
                        type="range"
                        min={totalAmountMin}
                        max={totalAmountMax}
                        value={totalAmount}
                        step={1000}
                        onChange={onSliderChange}
                        className="slider form-range"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <p className="mb-0">10000 </p>
                        <p className="mb-0">10000000</p>
                    </div>
                </div>
                <div className="col-span-1 md:max-w-[80%] max-w-[100%] mt-5">
                    <div className="input_box">
                        ₹
                        <input
                            type="number"
                            value={totalAmount}
                            onChange={handleInputChange}
                            min={totalAmountMin}
                            max={totalAmountMax}
                            step={100000}
                            className="text-input p-0"
                        />
                    </div>
                </div>
            </div>
            {/* <p>{invalidAmount ? "Invalid Loan Amount!" : `Formatted: ${formatValue(totalAmount)}`}</p> */}
            <div className="grid md:grid-cols-4 grid-cols-3  justify-center items-center md:gap-7 gap-2 mt-5">
                <div className="slider-container col-span-3">
                    <h3 className='text-[#6C6363] font-medium text-xl mb-3 '> Tenure</h3>
                    <input
                        type="range"
                        min={minTenure}
                        max={maxTenure}
                        value={tenure}
                        step={1}
                        onChange={handleSliderYrChange}
                        className="slider form-range"
                    />
                    <div className="flex justify-between items-center">
                        <p className="mb-0">1 Yr </p>
                        <p className="mb-0">25 Yrs</p>
                    </div>
                </div>
                <div className="col-span-1 max-w-[80%]">
                    <div className="input_box">
                        <input
                            type="number"
                            value={tenure}
                            onChange={handleYrInputChange}
                            min={minTenure}
                            max={maxTenure}
                            step={1}
                            className="text-input p-0"
                        />
                    </div>
                </div>
            </div>
            {/* <p>{invalidTenure ? "Invalid Tenure!" : `Tenure: ${tenure} Years`}</p> */}

            <div className="grid md:grid-cols-4 grid-cols-3  justify-center items-center md:gap-7 gap-2 mt-5">
                <div className="slider-container col-span-3">
                    <h3 className='text-[#6C6363] font-medium text-xl mb-3'>  Interest </h3>
                    <input
                        type="range"
                        min={minInterest}
                        max={maxInterest}
                        value={interest}
                        step={0.1}
                        onChange={handleInterestSliderChange}
                        className="slider form-range"
                    />
                    <div className="flex justify-between items-center">
                        <p className="mb-0">5% </p>
                        <p className="mb-0">15%</p>
                    </div>
                </div>
                <div className="col-span-1 max-w-[80%]">
                    <div className="input_box">
                        <input
                            type="number"
                            value={interest}
                            onChange={handleInterestInputChange}
                            min={minInterest}
                            max={maxInterest}
                            step={0.1}
                            className="text-input p-0"
                        />
                    </div>
                </div>
            </div>
            {/* <p>{invalidInterest ? "Invalid Interest Rate!" : `Interest Rate: ${interest}%`}</p> */}
            <div className="grid md:grid-cols-4 grid-cols-3  justify-center items-center md:gap-7 gap-2 mt-5">
                <div className="slider-container col-span-3">
                    <h3 className='text-[#6C6363] font-medium text-xl mb-3'>  Other Emis (Monthly)</h3>
                    <input
                        type="range"
                        min={minOtherEmi}
                        max={getOtherEMIMaxValue()}
                        value={othermonthlyEmi}
                        step={1}
                        onChange={handleOtherEmiSliderChanges}
                        className="slider form-range"
                    />

                </div>
                <div className="col-span-1 max-w-[80%]">
                    <div className="input_box">
                        <input
                            type="number"
                            value={othermonthlyEmi}
                            onChange={handleOtherEmiInputChange}
                            min={minOtherEmi}
                            max={getOtherEMIMaxValue()}
                            step={1}
                            className="text-input p-0"
                        />
                    </div>
                </div>
            </div>
            {/* <p>{invalidInterest ? "Invalid Interest Rate!" : `Interest Rate: ${interest}%`}</p> */}
            <button onClick={() => getCalculatedEMI()} className='bg-[#ff0169] text-white font-bold py-2 px-4 rounded-lg mb-5 m-auto flex mt-5'>
                Calculate
            </button>
            <div className="">
                <div className='md:flex justify-around mt-4 gap-3'>
                    <div className='flex gap-2 items-center'>
                        <p className='h-1 bg-[#ec1852] rounded-full p-1'> </p>
                        <p className='font-medium text-sm'>Eligibile Amount</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='h-1 bg-[#fdb515] rounded-full p-1'> </p>
                        <p className='font-medium text-sm'>Interest Payable</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='h-1 bg-[#EC6B5680] rounded-full p-1'> </p>
                        <p className='font-medium text-sm'>Monthly Salary</p>
                    </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
            </div>
            <div className="w-full lg:w-1/3 p-0 mt-8 lg:mt-16">
                <div className="mb-6">
                    <p className="font-bold text-sm ">Eligible EMI (Monthly)</p>
                    <div className="">
                        <p className="font-bold">
                            {state.eligibleEMI === 'Not Eligible'
                                ? 'Not Eligible'
                                : state?.eligibleEMI}
                        </p>
                    </div>
                </div>


                <div className="mb-6">
                    <p className="font-bold text-sm ">Eligible Loan Amount</p>
                    <div className="">
                        <p className="font-bold">
                            {state.loanEligibilityPrincipalAmount === 'Not Eligible'
                                ? 'Not Eligible'
                                : state?.loanEligibilityPrincipalAmount}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-bold text-sm ">Interest Payable</p>
                    <div className="">
                        <p className="font-bold">
                            {state.interestPayable === 'Not Eligible'
                                ? 'Not Eligible'
                                :
                                state?.interestPayable - state?.loanEligibilityPrincipalAmount
                            }
                        </p>
                    </div>
                </div>
            </div>
            {/* {
                pathname === "/emi-calculator" && ( */}
            <Calculation_Table
                amortizationDetails={state?.yearlyAmortizationDetails}
                monthlyAmortizationDetails={state?.amortization?.payments}
                formatValue={formatValue}
                eligibleEMI={true}
            />
            {/* )
            } */}
        </div>
    )
}

export default EligibileCalci
