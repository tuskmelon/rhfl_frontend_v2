'use client'
import React, { useEffect, useState } from 'react'
import './AuctionMela.css'
import { getAuctionMela, getAuctionRegion } from '@/api/AuctionMelaApi';
import moment from 'moment';
import { Modal } from 'flowbite-react';
import search from '../../assets/search.svg';
import Image from 'next/image';
import Link from 'next/link';

const AuctionMela = () => {
    const [auctionMelaStates, setAuctionMelaState] = useState([]);
    const [state, setState] = useState('Tamil Nadu');
    const [cityData, setCityData] = useState([]);
    const [city, setCity] = useState("");
    const [textSearch, setTextSearch] = useState("");
    const [autionData, setAuctionData] = useState([]);
    const [responseModal, setResponseModal] = useState(false)
    const [newImage, setNewImage] = useState('');
    const [filteresCity, setFilteresCity] = useState([]);


    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const resp = await getAuctionMela();

                setCityData(resp);

                console.log(resp, "resp");

                setFilteresCity(resp?.filter((item) => item?.locator_state?.State == "Tamil Nadu"));

                setAuctionMelaState([
                    { "State": "Tamil Nadu", "id": 1 },
                    { "State": "Kerala", "id": 2 },
                    { "State": "Andhra Pradesh", "id": 3 },
                    { "State": "Karnataka", "id": 4 },
                    { "State": "Telangana", "id": 5 },
                    { "State": "Gujarat", "id": 6 },
                    { "State": "Madhya Pradesh", "id": 7 },
                    { "State": "Rajasthan", "id": 8 },
                    { "State": "Jharkhand", "id": 9 },
                    { "State": "Orissa", "id": 10 },
                    { "State": "Pondicherry", "id": 11 },
                    { "State": "West Bengal", "id": 12 },
                    { "State": "Maharashtra", "id": 13 }
                ]);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };

        fetchAuctionData();

    }, []);

    useEffect(() => {
        setState('Tamil Nadu');
        console.log(cityData, "cityvalue")

        setFilteresCity(cityData?.filter((item) => item?.locator_state?.State == "Tamil Nadu"));
    }, [])

    useEffect(() => {
        console.log(cityData, state,"state")
        if (state?.length > 0) {

            // console.log(cityData, state)
            setFilteresCity(cityData?.filter((item) => item?.locator_state?.State == state))
        }
    }, [state])


    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const resp = await getAuctionRegion({ state, city, textSearch });
                if (resp) {
                    const currentDate = moment();

                    const filteredData = resp?.filter((item) => {
                        return moment(item.endDate).isAfter(currentDate, 'day') && moment(item.startDate).isBefore(currentDate, 'day');
                    });
                    setAuctionData(filteredData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAuctionData();
    }, [state, city]);

    const handleSearchText = async () => {
        try {
            const response = await getAuctionRegion({ state, city, textSearch });
            if (response && Array.isArray(response)) {
                const currentDate = moment();
                const filteredData = response.filter((item) => {
                    return moment(item.endDate).isAfter(currentDate, 'day') && moment(item.startDate).isBefore(currentDate, 'day');
                });
                console.log(filteredData, "filteredData");
                setAuctionData(filteredData);
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
        }
    };




    console.log(auctionMelaStates, "auctionMelaStates", autionData)
    return (
        <div className='topFilterSection'>
            {/* <h3 className='text-center'>Auction Sale Notices</h3> */}
            <Modal show={responseModal} onClose={() => setResponseModal(false)} size='2xl'>
                <Modal.Header>Auction Sale Notices </Modal.Header>
                <Modal.Body data-aos="fade-right">
                    <Image src={newImage} className=' m-auto rounded-md mb-3' alt="popupimage" width={500} height={500} />
                    {/* <button type="button" className="okButton m-auto" onClick={() => setResponseModal(false)}>Close</button> */}
                </Modal.Body>
            </Modal>
            <div className="flex flex-col md:flex-row justify-center mt-4 gap-4 md:m-1 m-3">
                <div className="md:w-1/4">
                    <select
                        required
                        name="State"
                        value={state || ""}
                        onChange={(e) => {
                            setState(e.target.value);
                            setCity("");
                        }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-300"
                    >
                        <option value="all">All</option>
                        {auctionMelaStates?.map((item, index) => (
                            <option key={index} value={item.State}>
                                {item.State}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:w-1/4">
                    <select
                        required
                        name="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!state}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none ${state ? "focus:ring focus:ring-pink-300" : "bg-gray-100 cursor-not-allowed"
                            }`}
                    >
                        <option value="" disabled>
                            Location
                        </option>
                        {filteresCity?.map((item, index) => (
                            <option key={index} value={item?.Region}>
                                {item?.Region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:w-1/2 flex items-center gap-4">
                    <input
                        type="text"
                        name="Text Search"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-300"
                        value={textSearch?.length > 0 ? textSearch : ""}
                        placeholder="Eg: Property Name, Borrowee Name"
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <button
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md ${textSearch.length >= 2 ? "bg-pink-600 hover:bg-pink-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        onClick={() => handleSearchText()}
                        disabled={textSearch?.length < 2}
                    >
                        <p className="hidden md:block m-0">Search</p>
                        <Image src={search} alt="Search Icon" className="w-5 invert" width={20} height={20} />
                    </button>
                </div>
            </div>


            <p className='mt-3 mb-4 text-center font-bold'>Search Results : {autionData?.length} </p>

            <div className='grid lg:grid-cols-2 gap-7 mt-4 md:m-1 m-3'>
                {
                    autionData?.length > 0 ?
                        autionData?.map((item, index) => (
                            <div className=' mb-4' key={index}>
                                <div className='card_design md:flex gap-2 p-2'>
                                    <div className=' p-0'>
                                        {item?.image?.formats?.thumbnail?.url && (
                                            <Image
                                                src={item?.image?.formats?.thumbnail?.url}
                                                alt="logo"
                                                className="auction_image"
                                                width={200}
                                                height={200}
                                                onClick={() => {
                                                    setResponseModal(true);
                                                    setNewImage(item.image.url);
                                                }}
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
                                        <Link href={item?.document?.url} target="_blank">
                                            <p className='pdf_view mt-3 p-2 flex gap-2 items-center '> <Image src={'https://s3.ap-south-1.amazonaws.com/rhfl-strapi/vscode_icons_file_type_pdf2_2_04f50ba11e_6b5372339d.webp'} className='pdf_icon' alt="logo" width={20} height={20} />View PDF</p>
                                        </Link>
                                    </div>
                                    <div className='flex flex-col items-start ps-4 md:mt-1 mt-3 borderColor '>
                                        <div className=''>
                                            <p className='pdf_title mb-1'> <span>Property:  </span> {item.property} </p>
                                            <p className='pdf_title mb-1'> <span>Location:  </span> {item?.auction_region.Region}</p>
                                            <p className='pdf_title mb-1'> <span>Borrower: </span> {item?.borrower}</p>
                                            {/* <p className='pdf_title mb-1'><span>Start Date: </span>{new Date(item.startDate).toLocaleDateString()}</p> */}
                                            <p className='pdf_title mb-1'><span>End Date: </span>
                                                {new Date(item.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p className='text-center'>No Data Found</p>
                }


            </div>

        </div>
    )
}

export default AuctionMela