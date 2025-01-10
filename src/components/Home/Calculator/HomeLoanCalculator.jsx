'use client';

import dynamic from 'next/dynamic';
import '../../../styles/Home_Loan_Calculator.css';
import { yearlyAmortizationSchedule, amortizationSchedule } from 'amortization';
// Dynamically import HighchartsReact to prevent SSR issues
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation'
import Calculation_Table from './Calculation_Table';
import Link from 'next/link';


if (typeof window !== 'undefined') {
  highcharts3d(Highcharts);
}

const HomeLoanCalculator = () => {
  const pathname = usePathname()
  //console.log("HomeLoanCalculator", pathname);


  const [totalAmount, setTotalAmount] = useState(5000000);
  const [totalAmountMin] = useState(100000);
  const [totalAmountMax] = useState(10000000);

  const [tenure, setTenure] = useState(6);
  const [minTenure] = useState(1);
  const [maxTenure] = useState(25);

  const [interest, setInterest] = useState(8.5);
  const [minInterest] = useState(5);
  const [maxInterest] = useState(15);

  const [amortizationDetails, setAmortizationDetails] = useState([]);
  const [monthlyAmortizationDetails, setMonthlyAmortizationDetails] = useState([]);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidTenure, setInvalidTenure] = useState(false);
  const [invalidInterest, setInvalidInterest] = useState(false);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [yearlySummary, setYearlySummary] = useState([]);

  const formatValue = (value) => {
    const valueString = value.toString();
    const lastThree = valueString.slice(-3);
    const otherNumbers = valueString.slice(0, -3);
    const formattedValue =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers && "," + lastThree);
    return formattedValue;
  };

  const calculatePaymentSchedule = (schedule) => {
    const today = new Date();
    const paymentDates = schedule.map((item, index) => {
      const paymentDate = new Date(today);
      paymentDate.setMonth(paymentDate.getMonth() + index);
      return {
        ...item,
        paymentDate: paymentDate.toLocaleDateString(),
        paymentYear: paymentDate.getFullYear(),
        paymentMonth: paymentDate.toLocaleString('default', { month: 'long' }),
      };
    });
    return paymentDates;
  };

  const calculateYearlySummary = (schedule) => {
    return schedule.reduce((acc, item) => {
      const { paymentYear, payment, principalPayment, interestPayment } = item;

      if (!acc[paymentYear]) {
        acc[paymentYear] = { totalPayment: 0, totalPrincipal: 0, totalInterest: 0 };
      }

      acc[paymentYear].totalPayment += payment;
      acc[paymentYear].totalPrincipal += principalPayment;
      acc[paymentYear].totalInterest += interestPayment;

      return acc;
    }, {});
  };

  useEffect(() => {
    const yearlySchedule = yearlyAmortizationSchedule(totalAmount, tenure, interest);
    const monthlySchedule = amortizationSchedule(totalAmount, tenure, interest);
    setAmortizationDetails(yearlySchedule);
    setMonthlyAmortizationDetails(monthlySchedule);
    setMonthlyEmi(monthlySchedule[0]?.payment || 0);

    const scheduleWithDates = calculatePaymentSchedule(monthlySchedule);
    //console.log(scheduleWithDates, "scheduleWithDates");
    setPaymentSchedule(scheduleWithDates);

    const yearlyData = calculateYearlySummary(scheduleWithDates);
    const yearlySummaryArray = Object.entries(yearlyData).map(([year, values]) => ({
      year,
      ...values,
    }));

    //console.log(yearlySummaryArray, "yearlySummaryArray");
    setYearlySummary(yearlySummaryArray);
  }, [totalAmount, tenure, interest]);

  // Formula 
  // E = [P x R x (1+R) ^N] / [(1+R) ^N-1]

  // useEffect(() => {
  //   setMonthAmortization(0);
  // }, [])

  const getTotalLoanPaymentCost = () => {
    return amortizationDetails.reduce((sum, item) => sum + item.paymentRounded, 0);
  };

  const getTotalInterestRate = () => {
    return amortizationDetails.reduce((sum, item) => sum + item.interestPaymentRounded, 0);
  };

  // const handleSliderChange = useCallback(
  //   debounce((value) => {
  //     if (value >= totalAmountMin && value <= totalAmountMax) {
  //       setTotalAmount(value);
  //       setInvalidAmount(false);
  //     } else {
  //       setInvalidAmount(true);
  //     }
  //   }, 100),
  //   []
  // );

  const handleSliderChange = (value) => {
    if (value >= totalAmountMin && value <= totalAmountMax) {
      setTotalAmount(value);
      setInvalidAmount(false);
    } else {
      setInvalidAmount(true);
    }
  };
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

  const onSliderChange = (e) => handleSliderChange(Number(e.target.value));
  const handleInputChange = (e) => handleTotalAmountChange(Number(e.target.value));
  const handleSliderYrChange = (e) => handleTenureChange(Number(e.target.value));
  const handleYrInputChange = (e) => handleTenureChange(Number(e.target.value));
  const handleInterestSliderChange = (e) => handleInterestChange(Number(e.target.value));
  const handleInterestInputChange = (e) => handleInterestChange(Number(e.target.value));



  const highChartOptions = {
    colors: ["#EC6B5680", "#fdb515", "#ec1852"],
    chart: {
      type: 'pie',
      options3d: {
        enabled: false,
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
          style: { fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem' },
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
          ["Principal Amount", totalAmount],
          ["Interest Rate", Number(getTotalInterestRate().toFixed(0))],
          ["Total Amount", Number(getTotalLoanPaymentCost().toFixed(0))],
        ],
      },
    ],
  };

  return (
    <div className="max-w-[1280px]  m-auto mt-10" >
      <h1 className="mb-1 mb-sm-1 mb-md-3 mb-lg-4 text-[#414141] md:text-[2.75rem] text-[1.5rem] font-semibold text-center" data-aos="zoom-in">Home Loan <span className='text-[#FF0169]'>EMI Calculator</span></h1>
      <div className='grid md:grid-cols-2 grid-cols-1 justify-center items-center mx-2 gap-7 border border-[#FFC0DA] rounded-xl p-md-10 p-5 bg_image_home'
        data-aos="fade-right"
        data-aos-delay={800}
      >
        <div>
          <div className="">
            <div className='flex justify-between mb-4 items-center'>
              <h3 className='text-[#6C6363] font-medium  md:text-xl text-[17px]'>Principal Amount</h3>
              <div className="input_box md:!w-[30%] w-[55%] ">
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
              <div className="flex justify-between items-center mt-2 mb-2">
                <p className="mb-0 text-[17px]">₹ 1 Lakhs </p>
                <p className="mb-0 text-[17px]">₹ 1 Crore</p>
              </div>
            </div>
          </div>
          {/* <p>{invalidAmount ? "Invalid Loan Amount!" : `Formatted: ${formatValue(totalAmount)}`}</p> */}
          <div className="mt-10">
            <div>
              <div className='flex justify-between mb-4 items-center'>
                <h3 className='text-[#6C6363] font-medium md:text-xl text-[17px]'>Tenure</h3>
                <div className="input_box text-center md:!w-[14%] w-[20%]">
                  <input
                    type="number"
                    value={tenure}
                    onChange={handleYrInputChange}
                    min={minTenure}
                    max={maxTenure}
                    step={1}
                    className="text-input text-center p-0"
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
                <div className="flex justify-between items-center ">
                  <p className="mb-0 text-[17px]">1 Yr </p>
                  <p className="mb-0 text-[17px]">25 Yrs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div>
              <div className='flex justify-between mb-4 items-center'>
                <h3 className='text-[#6C6363] font-medium md:text-xl text-[17px]'>Interest Rate (P.A)</h3>
                <div className="input_box text-center md:!w-[14%] w-[20%]">
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
                <div className="flex justify-between items-center ">
                  <p className="mb-0 text-[17px]">5 % </p>
                  <p className="mb-0 text-[17px]">15 %</p>
                </div>
              </div>

            </div>
          </div>
          {/* <p>{invalidTenure ? "Invalid Tenure!" : `Tenure: ${tenure} Years`}</p> */}

          {/* <div className="">
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
                %
              </div>
            </div>
          </div> */}
        </div>
        <div className="border-l ps-md-3 p-0 border-none md:border-[#FFC0DA]">
          <p className='md:text-[24px] textt-[16px] text-[#6C6363] text-center'>  Monthly EMI ₹ <span className='text-[#FF0169] font-semibold text-[1.9em]'>{formatValue(monthlyEmi.toFixed(0))}</span></p>
          <div className='md:flex justify-around mt-4 gap-3'>
            <div className='flex gap-2 items-center'>
              <p className='h-1 bg-[#ec1852] rounded-full p-1'> </p>
              <p className='font-medium text-sm'>Total Amount</p>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='h-1 bg-[#fdb515] rounded-full p-1'> </p>
              <p className='font-medium text-sm'>Interest Rate</p>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='h-1 bg-[#EC6B5680] rounded-full p-1'> </p>
              <p className='font-medium text-sm'>Principal Amount</p>
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
          <div className="">
            <p className='text-[20px] text-[#6C6363] text-center py-3'>Total Amount Payable is <span className='text-[#FF0169] font-semibold'>₹{formatValue(getTotalLoanPaymentCost().toFixed(0))}</span></p>
            <p className='text-[20px] text-[#6C6363] text-center py-3'>Total Interest Payable is  <span className='text-[#FF0169] font-semibold'>₹{formatValue(getTotalInterestRate().toFixed(0))}</span></p>
            {
              pathname === "/" && (
                <>
                  <Link href='/emi-calculator' prefetch={true}>
                    <p className='font-semibold text-[20px] mt-4 text-[#FF0169] text-center'>Get More Details   ❯</p>
                  </Link>

                  <div className='mt-10 m-auto text-center' >
                    <Link href="/apply-now" prefetch={true} className='bg-[#FF0169] text-white px-10 py-2   rounded-md mt-5'>
                      Apply Now
                    </Link>
                  </div>
                </>
              )
            }

          </div>
        </div>

      </div>


      {/* <p>{invalidInterest ? "Invalid Interest Rate!" : `Interest Rate: ${interest}%`}</p> */}
      {
        pathname === "/emi-calculator" && (
          <Calculation_Table
            amortizationDetails={yearlySummary}
            monthlyAmortizationDetails={paymentSchedule}
            formatValue={formatValue}
          />
        )
      }
    </div>
  );
};

export default HomeLoanCalculator;
