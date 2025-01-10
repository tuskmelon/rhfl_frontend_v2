'use client'

import React, { useCallback, useEffect, useState } from 'react';
import '../../../styles/Home_Loan_Calculator.css';

const AprCalculator = () => {

    const [totalAmount, setTotalAmount] = useState(5000000);
    const [totalAmountMin] = useState(100000);
    const [totalAmountMax] = useState(10000000);

    const [tenure, setTenure] = useState(6);
    const [minTenure] = useState(1);
    const [maxTenure] = useState(25);

    const [interest, setInterest] = useState(8.5);
    const [minInterest] = useState(5);
    const [maxInterest] = useState(15);

    const [loanOrigination, setLoanOrigination] = useState(0);


    const [monthlyEmi, setMonthlyEmi] = useState(0);
    const [invalidAmount, setInvalidAmount] = useState(false);
    const [invalidTenure, setInvalidTenure] = useState(false);
    const [invalidInterest, setInvalidInterest] = useState(false);

    const formatValue = (value) => {
        const valueString = value.toString();
        const lastThree = valueString.slice(-3);
        const otherNumbers = valueString.slice(0, -3);
        const formattedValue =
            otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers && "," + lastThree);
        return formattedValue;
    };


    useEffect(() => {
        calculateAPR();
    }, [totalAmount, tenure, interest]);


    const calculateMonthlyPayment = () => {
        const principal = parseFloat(totalAmount);
        const financingFee = parseFloat(loanOrigination);
        const interestRate = parseFloat(interest);
        const time = parseFloat(tenure);
        const months = time * 12

        const totalLoanAmount = principal + financingFee;
        const monthlyRate = interestRate / 12 / 100;
        const payment = (totalLoanAmount * monthlyRate * Math.pow((1 + monthlyRate), months)) / (Math.pow((1 + monthlyRate), months) - 1);
        return payment.toFixed(2);
    }

    const calculateAPR = () => {

        const principal = parseFloat(totalAmount);
        const payment = calculateMonthlyPayment()
        const time = parseFloat(tenure);
        const months = time * 12

        const interestRate = parseFloat(interest);

        const financingFee = parseFloat(loanOrigination);
        const precision = 0.0001;
        let low = 0;
        let high = 100;
        let mid;

        if (financingFee > 0) {

            while (high - low > precision) {
                mid = (low + high) / 2;
                const monthlyRate = mid / 12 / 100;
                const calculatedPayment = (principal * monthlyRate * Math.pow((1 + monthlyRate), months)) / (Math.pow((1 + monthlyRate), months) - 1);

                if (calculatedPayment > payment) {
                    high = mid;
                } else {
                    low = mid;
                }
            }
            return (mid).toFixed(2);
        } else {
            return interestRate;
        }
    }

    // const handleSliderChange = useCallback(
    //     debounce((value) => {
    //         if (value >= totalAmountMin && value <= totalAmountMax) {
    //             setTotalAmount(value);
    //             setInvalidAmount(false);
    //         } else {
    //             setInvalidAmount(true);
    //         }
    //     }, 100),
    //     []
    // );

    const handleSliderChange = (value) => {
        if (value >= totalAmountMin && value <= totalAmountMax) {
            setTotalAmount(value);
            setInvalidAmount(false);
        } else {
            setInvalidAmount(true);
        }
    }
    const handleTotalAmountChange = (value) => {
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


    const handleLoanOriginationChange = (value) => {
        if (value >= 0 && value <= totalAmount) {
            setLoanOrigination(value);
            // setInvalidInterest(false);
        } else {
            // setInvalidInterest(true);
        }
    };



    const onSliderChange = (e) => handleSliderChange(Number(e.target.value));
    const handleInputChange = (e) => handleTotalAmountChange(Number(e.target.value));
    const handleSliderYrChange = (e) => handleTenureChange(Number(e.target.value));
    const handleYrInputChange = (e) => handleTenureChange(Number(e.target.value));
    const handleInterestSliderChange = (e) => handleInterestChange(Number(e.target.value));
    const handleInterestInputChange = (e) => handleInterestChange(Number(e.target.value));
    const handleLoanOriginationSliderChange = (e) => handleLoanOriginationChange(Number(e.target.value));
    const handleLoanOriginationInputChange = (e) => handleLoanOriginationChange(Number(e.target.value));


    return (
        <>
            <div className="headings text-center mb-6">APR Calculator</div>
            <div className="Base-wrapper CalculatorModule m-auto ">
                <h1 className="mb-1  headings text-center"> Annual Percentage Rate (APR) Calculator</h1>

                {/* <div className="">
                        <p>Total Amount Payable is ₹{formatValue(getTotalLoanPaymentCost().toFixed(0))}</p>
                        <p> Total Interest Payable is ₹ {formatValue(getTotalInterestRate().toFixed(0))}</p>
                        <p>  Monthly Payment (EMI) is ₹ {formatValue(monthlyEmi.toFixed(0))}</p>
                    </div> */}

                <p className='text-black font-semibold lg:text-2xl md:text-lg  text-md text-center mt-5 mb-5'>APR Interest - {calculateAPR()}%</p>


                <div className="">
                    <div className='flex justify-between mb-3 mt-4'>
                        <p className=' lg:text-lg md:text-lg text-sm  font-medium'>Principal Amount</p>

                        <div className="input_box aprCalciulator">
                            ₹
                            <input
                                type="number"
                                value={totalAmount}
                                onChange={handleInputChange}
                                min={totalAmountMin}
                                max={totalAmountMax}
                                step={100000}
                                className="text-input p-0 "
                            />
                        </div>
                    </div>
                    <div className="slider-container col-span-3">
                        <input
                            type="range"
                            min={totalAmountMin}
                            max={totalAmountMax}
                            value={totalAmount}
                            step={100000}
                            onChange={onSliderChange}
                            className="slider form-range"
                        />
                        <div className="flex justify-between items-center">
                            <p className="mb-0 font-medium">1L </p>
                            <p className="mb-0 font-medium">1Cr</p>
                        </div>
                    </div>

                </div>
                {/* <p>{invalidAmount ? "Invalid Loan Amount!" : `Formatted: ${formatValue(totalAmount)}`}</p> */}
                <div className=" mt-7">
                    <div className='flex justify-between mb-3 mt-4'>
                        <p className='  lg:text-lg md:text-lg text-sm  font-medium'>Tenure</p>

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
                    <div className="slider-container col-span-3">
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
                            <p className="mb-0 font-medium">1 Yr </p>
                            <p className="mb-0 font-medium">25 Yrs</p>
                        </div>
                    </div>
                    {/* <div className="col-span-1 max-w-[80%]">
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
                            Yrs
                        </div>
                    </div> */}
                </div>
                {/* <p>{invalidTenure ? "Invalid Tenure!" : `Tenure: ${tenure} Years`}</p> */}

                <div className="mt-7">
                    <div className='flex justify-between mb-3 mt-4'>
                        <p className='  lg:text-lg md:text-lg text-sm  font-medium'>Interest Rate</p>

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
                    <div className="slider-container col-span-3">
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
                            <p className="mb-0 font-medium">5% </p>
                            <p className="mb-0 font-medium">15%</p>
                        </div>
                    </div>
                    {/* <div className="col-span-1 max-w-[80%]">
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
                            %
                        </div>
                    </div> */}
                </div>
                {/* <p>{invalidInterest ? "Invalid Interest Rate!" : `Interest Rate: ${interest}%`}</p> */}
                <div className=" mt-7">
                    <div className='flex justify-between mb-3 mt-4'>
                        <p className='  lg:text-lg md:text-lg text-sm  font-medium'>Loan Origination Charges</p>

                        <div className="input_box aprCalciulator">
                            <input
                                type="number"
                                min={0}
                                max={totalAmount}
                                value={loanOrigination}
                                step={10000}
                                onChange={handleLoanOriginationInputChange}
                                className="text-input p-0"
                            />
                        </div>
                    </div>
                    <div className="slider-container col-span-3">
                        <input
                            type="range"
                            min={0}
                            max={totalAmount}
                            value={loanOrigination}
                            step={10000}
                            onChange={handleLoanOriginationSliderChange}
                            className="slider form-range"
                        />

                    </div>
                    {/* <div className="col-span-1 max-w-[80%]">
                        <div className="input_box">
                            <input
                                type="number"
                                min={0}
                                max={totalAmount}
                                value={loanOrigination}
                                step={10000}
                                onChange={handleLoanOriginationInputChange}
                                className="text-input p-0"
                            />
                        </div>
                    </div> */}
                </div>
                {/* <p>{invalidInterest ? "Invalid Interest Rate!" : `Interest Rate: ${interest}%`}</p> */}

            </div>
        </>
    )
}

export default AprCalculator