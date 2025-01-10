'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CryptoJS from "crypto-js";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
ModuleRegistry.registerModules([CsvExportModule]);
import { useCareerLeads } from '@/query/useQuery';
import Link from 'next/link';
import { REACT_APP_BASE_URL } from '@/env/env';
import { Userlogin } from '@/store';

const NewCareer = () => {
    const token = Userlogin(state => state?.login)
    const gridRef = useRef();
    const { data } = useCareerLeads({ token });
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: ''
    });

    const decryptValue = (encryptedValue) => {
        try {
            if (!encryptedValue) return '';

            if (Array.isArray(encryptedValue)) {
                return encryptedValue.map((item) => {
                    const decryptedData = CryptoJS.AES.decrypt(item, process.env.NEXT_PUBLIC_SECRET_KEY);
                    const utf8String = decryptedData.toString(CryptoJS.enc.Utf8);
                    return utf8String || '';
                });
            }

            const decryptedData = CryptoJS.AES.decrypt(encryptedValue, process.env.NEXT_PUBLIC_SECRET_KEY);
            const utf8String = decryptedData.toString(CryptoJS.enc.Utf8);

            return utf8String || '';
        } catch (error) {
            console.error("Decryption error:", error, "Encrypted Value:", encryptedValue);
            return '';
        }
    };


    useEffect(() => {
        if (data?.data) {
            if (data?.data?.status !== 403 && data?.data?.status !== 401) {
                const decryptedData = data.data.map((item, index) => ({
                    id: index + 1,
                    Name: decryptValue(item.name),
                    MobileNumber: decryptValue(item.mobileNumber),
                    EmailID: decryptValue(item.emailID),
                    Expertise: decryptValue(JSON.parse(item.expertise)),
                    Qualification: decryptValue(item.qualification),
                    Experience: decryptValue(item.experience),
                    Location: decryptValue(item.location),
                    Branch: decryptValue(JSON.parse(item.branch)),
                    CurrentCTC: decryptValue(item.currentCTC),
                    ExpectedCTC: decryptValue(item.expectedCTC),
                    Resume: `${item.s3Url}`,
                    CreatedAt: item.formattedDate ? item.formattedDate : ''
                }));

                setOriginalData(decryptedData);
                // console.log(decryptedData, "decryptedData");
                setFilteredData(decryptedData);
            }
        }
    }, [data?.data]);

    const applyDateFilter = () => {
        if (!dateFilter.startDate && !dateFilter.endDate) {
            setFilteredData(originalData);
            return;
        }

        const filtered = originalData.filter(item => {
            const itemDate = new Date(item.CreatedAt);
            const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
            const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

            if (start && end) {
                return itemDate >= start && itemDate <= end;
            }
            if (start) {
                return itemDate >= start;
            }
            if (end) {
                return itemDate <= end;
            }
            return true;
        });

        setFilteredData(filtered);
    };


    const columns = [
        { field: 'Name' },
        { field: 'MobileNumber' },
        { field: 'EmailID' },
        { field: 'Expertise' },
        { field: 'Qualification' },
        { field: 'Experience' },
        { field: 'Location' },
        { field: 'Branch' },
        { field: 'CurrentCTC' },
        { field: 'ExpectedCTC' },
        {
            field: 'Resume',
            headerName: 'Resume',
            cellRenderer: (params) => {
                console.log(params, "params");
                if (!params.value) {
                    return 'No Resume';
                }

                // const fullResumeUrl = `${REACT_APP_BASE_URL}${params.value}`;
                return (
                    <Link
                        href={params.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'blue',
                            textDecoration: 'underline'
                        }}
                    >
                        View Resume
                    </Link>
                );
            },
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        { field: 'CreatedAt' },
    ];




    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            filter: true,
        };
    }, []);

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];



    const onBtnExport = useCallback(() => {
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.exportDataAsCsv();
        }
    }, []);


    return (
        <div className="p-4  max-w-[1280px] md:m-auto">
            <h1 className="mt-5 mb-5 font-medium text-center text-heading md:text-[1.75rem] text-[1.5rem]">Repco Leads For New Career</h1>
            <div className="mb-4 mt-4 flex space-x-4 items-center">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Start Date:</label>
                    <input
                        type="date"
                        value={dateFilter.startDate}
                        onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                        className="border rounded px-2 py-1"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">End Date:</label>
                    <input
                        type="date"
                        value={dateFilter.endDate}
                        onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                        className="border rounded px-2 py-1"
                    />
                </div>
                <button
                    onClick={applyDateFilter}
                    className="bg-[#FF0169] text-sm text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                    Apply Filter
                </button>
            </div>

            <button className='bg-[#FF0169] mb-3 text-sm font-medium text-white px-4 py-2 rounded hover:bg-blue-600 transition' onClick={onBtnExport}>Download CSV</button>
            <div
                className="ag-theme-quartz"
                style={{ height: 500 }}
            >
                {
                    filteredData.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600 text-lg">No data available</p>
                        </div>
                    )
                }
                {
                    filteredData?.length > 0 && (
                        <AgGridReact
                            ref={gridRef}
                            pagination={pagination}
                            paginationPageSize={paginationPageSize}
                            paginationPageSizeSelector={paginationPageSizeSelector}
                            rowData={filteredData}
                            defaultColDef={defaultColDef}
                            suppressExcelExport={true}
                            columnDefs={columns}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default NewCareer;