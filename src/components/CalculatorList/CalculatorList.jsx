
import React from 'react'
import Breadcrumbs from '../Breadcrumbs'
import Link from 'next/link'

const CalculatorList = () => {
    return (
        <div className=' mb-8 max-w-[1280px] m-auto'>
            <Breadcrumbs />
            <div className="headings text-center mt-6 mb-4">Other Calculators</div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-8 md:m-1 m-4'>
                <Link href="/other-calculators/stamp-duty-calculator" prefetch={true}>
                <div className='text-center bg-[#ff0169] hover:bg-white border border-[#ff0169] text-white hover:text-black transition-colors duration-300 ease-in-out shadow-md p-10 rounded-md'>
                        <p className=' lg:text-xl md:text-lg'>Stamp Duty Calculator</p>
                    </div>
                </Link>
                <Link href="/other-calculators/area-conversion-calculator" prefetch={true}>
                    <div className='text-center bg-[#ff0169] hover:bg-white border border-[#ff0169] text-white hover:text-black transition-colors duration-300 ease-in-out shadow-md p-10 rounded-md'>
                         <p className=' lg:text-xl md:text-lg'>Area Conversion Calculator</p>
                    </div>
                </Link>
                <Link href="/other-calculators/guideline-values" prefetch={true}>
                    <div className='text-center bg-[#ff0169] hover:bg-white border border-[#ff0169] text-white hover:text-black transition-colors duration-300 ease-in-out shadow-md p-10 rounded-md'>
                         <p className=' lg:text-xl md:text-lg'>Guideline Values</p>
                    </div>
                </Link>
                <Link href="/other-calculators/apr-calculator" prefetch={true}>
                    <div className='text-center bg-[#ff0169] hover:bg-white border border-[#ff0169] text-white hover:text-black transition-colors duration-300 ease-in-out shadow-md p-10 rounded-md'>
                         <p className=' lg:text-xl md:text-lg'>APR Calculator</p>
                    </div>
                </Link>

            </div>
        </div >
    )
}

export default CalculatorList