
'use client'
import React, { useState } from 'react';
import Xmark from '../../assets/Xmark.svg';
import Menu from '../../assets/Menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import DownArrow from '../../assets/DownArrow.svg';
import imageLogo from '../../assets/image8.png';
import HeaderIcons from '../../assets/header_icons(1).svg';
import HeaderIcons1 from '../../assets/header_icons(2).svg';
import HeaderIcons2 from '../../assets/header_icons(3).svg';
import HeaderIcons3 from '../../assets/header_icons(4).svg';
import HeaderIcons4 from '../../assets/header_icons(5).svg';
import HeaderIcons5 from '../../assets/header_icons(6).svg';
import HeaderIcons6 from '../../assets/header_icons(7).svg';
import HeaderIcons8 from '../../assets/header_icons(8).svg';
import HeaderModal from '@/components/Modals/HeaderModal';

const MobileHeader = ({ productList, headerLogo }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);


    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const toggleDropdown = (index) => {
        setDropdownOpen((prev) => (prev === index ? null : index));
    };

    const menuItems = [
        { label: 'Home', link: '/', icon: HeaderIcons },
        { label: 'About Us', link: '/about', icon: HeaderIcons1 },
        { label: 'Customer Relations', link: '#', icon: HeaderIcons2 },
        { label: 'Products', link: '#', icon: HeaderIcons3 },
        { label: 'Investors', link: '#', icon: HeaderIcons4 },
        { label: 'Careers', link: '/careers', icon: HeaderIcons5 },
        { label: 'Notices', link: '#', icon: HeaderIcons6 },
        { label: 'Blog', link: '/blogs', icon: HeaderIcons8 },
    ];


    return (
        <div className="flex items-center ">
            <div className="block xl:hidden">
                <div
                    className={`fixed z-20   left-0 top-0 w-full h-full bg-black/30 ${menuOpen ? 'visible' : 'invisible'
                        } transition-all`}
                    onClick={toggleMenu}
                ></div>
                <div
                    className={` bg-white border-l-2 z-[999]  w-full max-w-md h-screen min-h-screen  overflow-y-auto shadow-md fixed top-0 transition-all duration-500 ${menuOpen ? 'right-0' : '-right-full'
                        }`}
                >
                    <div className="flex justify-between items-center bg-[#FFE2EE] ps-5 pe-5 py-8">
                       {headerLogo && (
                               <Image
                                 src={headerLogo?.Logo[0]?.img?.url || repcoLogo}
                                 width={160}
                                 height={124}
                                 className="header-logo md:w-[150px] md:h-[110px] w-[100px] h-[80px]"
                                 alt="Header Logo"
                               />
                             )}
                        <div className=" w-10 h-10  flex items-center justify-center rounded-[4px]" onClick={toggleMenu}>
                            <Image src={Xmark} alt="img" className='' />
                        </div>
                    </div>
                    <ul className="mt-3 p-4 pt-0">

                        {menuItems?.map((item, index) => (
                            <li key={index} className="leading-[164%] relative w-full">

                                <Link
                                    prefetch={true}
                                    href={item?.link}
                                    className={` py-[14px] border-b px-3 text-md border-b-[#FCBED7] text-[#555555] font-medium flex justify-between items-center ${dropdownOpen === index ? 'text-primary' : ''
                                        }`}
                                    onClick={() => { toggleDropdown(index); { item?.link !== '#' && toggleMenu() } }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Image src={item?.icon} alt="img" className='w-[15px] h-[15px]' />
                                        <span>{item.label}</span>
                                    </div>
                                    {['Products', 'Customer Relations', 'Investors', 'Notices'].includes(item.label) && (
                                        <Image src={DownArrow} alt="img" className='w-[14px] h-[14px]' />
                                    )}
                                </Link>
                                {['Customer Relations'].includes(item.label) && (
                                    <ul
                                        className={`max-h-0  min-w-56 border-b border-b-slate-300 w-full transition-all duration-500 ${dropdownOpen === index ? 'opacity-100 visible max-h-[450px]' : 'opacity-0 invisible '
                                            }`}
                                    >
                                        <li className='flex gap-3 items-center px-4 py-4 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link
                                                prefetch={true}
                                                href="/AchMandate"
                                                className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >
                                                NACH-E-Mandate
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                                {['Investors'].includes(item.label) && (
                                    <ul
                                        className={`max-h-0 min-w-56 border-b border-b-slate-300 w-full transition-all duration-500 ${dropdownOpen === index ? 'opacity-100 visible max-h-[450px]' : 'opacity-0 invisible '
                                            }`}
                                    >
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/financial-information" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Financial Information </Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/announcements" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Announcements</Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/share-details" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Share Prices & Ownership</Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/corporate-governance" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Corporate Governance</Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/investors" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Investors Information</Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/intimation-stock-exchange" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Intimation to Stock Exchanges</Link>
                                        </li>
                                    </ul>
                                )}
                                {['Notices'].includes(item.label) && (
                                    <ul
                                        className={`max-h-0 min-w-56 border-b border-b-slate-300 w-full transition-all duration-500 ${dropdownOpen === index ? 'opacity-100 visible max-h-[450px]' : 'opacity-0 invisible '
                                            }`}
                                    >
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/auction-mela" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Auction Mela</Link>
                                        </li>
                                        <li className='flex gap-3 items-center  px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/auction-sale-notices" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Auction Sale Notices</Link>
                                        </li>
                                        <li className='flex gap-3 items-center  px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/bids-digitization" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Bids Digitization</Link>
                                        </li>
                                        <li className='flex gap-3 items-center px-4 py-1 '>
                                            <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                            <Link prefetch={true} href="/possession-notices" className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                onClick={() => {
                                                    toggleMenu();
                                                    toggleDropdown(null);
                                                }}
                                            >Possession Notices</Link>
                                        </li>
                                    </ul>
                                )}
                                {['Products'].includes(item.label) && (
                                    <ul
                                        className={`max-h-0 min-w-56 border-b border-b-slate-300 w-full transition-all duration-500 overflow-y-auto ${dropdownOpen === index ? 'opacity-100 visible max-h-[450px]' : 'opacity-0 invisible '
                                            }`}
                                    >

                                        {
                                            productList?.length > 0 &&
                                            productList?.map((products, index) => (
                                                !products?.IsASpecialProduct && (
                                                    <li className='flex gap-3 items-center px-4 py-1 ' key={index}>
                                                        <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                                        <Link prefetch={true} href={"/products/" + products.ProductId} className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                            onClick={() => {
                                                                toggleMenu();
                                                                toggleDropdown(null);
                                                            }}
                                                        >{products.ProductName}</Link>
                                                    </li>
                                                )
                                            ))
                                        }

                                        <p className='SpecialLoan text-lg'>Repco Special Loans</p>
                                        {
                                            productList?.length > 0 &&
                                            productList?.map((products, index) => (
                                                products?.IsASpecialProduct && (
                                                    <li className='flex gap-3 items-center px-4 py-1 ' key={index}>
                                                        <p className='p-1 rounded-full bg-[#FF0169] h-1'></p>
                                                        <Link prefetch={true} href={"/products/" + products.ProductId} className="text-start text-[#555555] text-[14px] font-medium rounded-t-none "
                                                            onClick={toggleMenu}>{products.ProductName}</Link>
                                                    </li>
                                                )
                                            ))
                                        }

                                    </ul>
                                )}
                            </li>
                        ))}
                        <div className='flex gap-2 mt-4'>
                            <li>
                                <Link prefetch={true} href="/apply-now" className=" navApplyNow block py-2 text-sm text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    onClick={toggleMenu}
                                >Apply Now!</Link>
                            </li>
                            <li className="">
                                <HeaderModal />
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="block xl:hidden" onClick={toggleMenu}>
                    <div className="flex flex-col items-end cursor-pointer">
                        <Image src={Menu} alt="img" className='' />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MobileHeader;
