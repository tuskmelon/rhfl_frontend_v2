// app/api/HomePageApi.js
'use server';

import senderRequest from "@/services/Http";

export const handleCarousel = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "home-banners?populate[banners][populate][0]=img"
        );
        return response;
    } catch (error) {
        console.error('Error fetching carousels:', error);
        return { data: [] }; // Fallback for SSG
    }
};

export const handleInterestPercentage = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "repco-bank-detail?populate=*&fields[0]=InterestRate"
        );
        return response;
    } catch (error) {
        console.error('Error fetching interest rate:', error);
        return { data: { attributes: { InterestRate: 0 } } }; // Fallback for SSG
    }
};

export const handleDocumentList = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "document-collections?populate=*&sort[0]=createdAt:asc"
        );
        return response;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return { data: [] }; // Fallback for SSG
    }
};

export const handleProductList = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "product-lists?populate=*&fields[0]=ProductPreviewText&fields[1]=ProductName&fields[2]=IsASpecialProduct&fields[3]=ProductId&sort[0]=ProductOrder:asc&fields[4]=ProductOrder"
        );
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [] }; // Fallback for SSG
    }
};

export const handleSpecificProductData = async (productId) => {
    try {
        const response = await senderRequest(
            "get", 
            `product-lists?populate=*&filters[ProductId][$eqi]=${productId}&sort[0]=ProductOrder:asc`
        );
        return response;
    } catch (error) {
        console.error('Error fetching specific product:', error);
        return { data: [] }; // Fallback for SSG
    }
};

export const handleBranchCardDetails = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "reach-us-cards?populate=*&sort[0]=createdAt:asc"
        );
        return response;
    } catch (error) {
        console.error('Error fetching branch details:', error);
        return { data: [] }; // Fallback for SSG
    }
};

export const handleStats = async () => {
    try {
        const response = await senderRequest(
            "get", 
            "stat-counters?populate=*&sort[0]=createdAt:asc"
        );
        return response;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { data: [] }; // Fallback for SSG
    }
};