// File: /app/api/contact/route.js
'use server';
import { NextResponse } from 'next/server';
import db from '@/lib/dbConnection';
import { verifyToken } from '../jwtToken';
import CryptoJS from 'crypto-js';
import Joi from 'joi';
import createFormLogger from '@/utils/logger';
// import { DOMPurify } from 'dompurify';
// import { escape } from 'html-escaper';

// Utility function to handle database queries
const queryDB = (query, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Common function to check the allowed origin
const validateOrigin = (req) => {
    const allowedOrigin = process.env.APP_URL || 'http://localhost:3000';
    console.log(allowedOrigin, "allowedOrigin");
    const origin = req.headers.get('origin') || req.headers.get('referer');
    return origin && origin.startsWith(allowedOrigin);
};

// GET handler
export async function GET(req) {
    try {



        if (!validateOrigin(req)) {
            return NextResponse.json(
                { error: 'Access forbidden', status: 403 },

            );
        }

        const verifyResponse = await verifyToken(req);
        console.log(verifyResponse, "verifyResponse");
        if (verifyResponse.status !== 200) {
            return NextResponse.json(
                { error: 'Access forbidden', message: verifyResponse.message, status: verifyResponse.status },

            );
        };

        const query = 'SELECT * FROM apply_now_form ORDER BY id DESC';
        const results = await queryDB(query);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // console.error('GET Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message, status: 500 },
        );
    }
}


function encryptValue(value) {
    return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
}


function decryptValue(encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.NEXT_PUBLIC_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}


function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return input;
    }


    let sanitized = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

    // Remove dangerous patterns
    sanitized = sanitized
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
        .replace(/vbscript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/expression\s*\(.*\)/gi, '')
        .replace(/url\s*\(.*\)/gi, '');

    return sanitized;
}


const schema = Joi.object({
    Name: Joi.string().pattern(/^[a-zA-Z\s]{2,50}$/).required()
        .messages({
            'string.pattern.base': 'Name must contain only letters and spaces, between 2-50 characters'
        }),
    MobileNumber: Joi.string().pattern(/^\d{10}$/).required()
        .messages({
            'string.pattern.base': 'Mobile number must be exactly 10 digits'
        }),
    EmailID: Joi.string().email({ minDomainSegments: 2 }).max(254).required()
        .messages({
            'string.email': 'Please enter a valid email address'
        }),
    PropertyLocation: Joi.string().max(200).pattern(/^[a-zA-Z0-9\s,.-]{2,200}$/).required()
        .messages({
            'string.pattern.base': 'Property location contains invalid characters'
        }),
    State: Joi.string().pattern(/^[a-zA-Z\s]{2,50}$/).required()
        .messages({
            'string.pattern.base': 'State must contain only letters and spaces'
        }),
    Pincode: Joi.string().pattern(/^\d{6}$/).required()
        .messages({
            'string.pattern.base': 'Pincode must be exactly 6 digits'
        }),
    LoanPurpose: Joi.string().max(200).pattern(/^[a-zA-Z0-9\s,./-]{2,200}$/).required()
        .messages({
            'string.pattern.base': 'Loan purpose contains invalid characters'
        }),
    LoanAmount: Joi.number().min(1000).max(1000000000).required()
        .messages({
            'number.min': 'Loan amount must be at least 1000',
            'number.max': 'Loan amount exceeds maximum limit'
        }),
    IncomeStatus: Joi.string().valid('Salaried', 'Others', 'Business').required()
        .messages({
            'any.only': 'Invalid income status selected'
        })
});

async function validateBody(body) {
    try {
        const validationResult = await schema.validateAsync(body, {
            abortEarly: false,
            stripUnknown: true
        });
        return { isValid: true, data: validationResult };
    } catch (error) {
        // Format validation errors in a user-friendly way
        const errors = error.details.map(detail => ({
            field: detail.context.key || 'unknown',
            message: detail.message.replace(/['"]/g, '')
        }));

        return {
            isValid: false,
            errors: errors
        };
    }
}


function setSecurityHeaders(response) {
    response.headers.set('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "font-src 'self'; " +
        "frame-ancestors 'none';"
    );
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    return response;
}

const homeLoanLogger = createFormLogger('home_loan_form');

export async function POST(req) {
    try {
        if (!validateOrigin(req)) {
            return setSecurityHeaders(NextResponse.json(
                { error: 'Access forbidden', status: 403 },
                { status: 403 }
            ));
        }

        const body = await req.json();
        const decryptedBody = decryptFormData(body);

        // Sanitize all input data
        const sanitizedData = Object.fromEntries(
            Object.entries(decryptedBody).map(([key, value]) => [
                key,
                sanitizeInput(value)
            ])
        );


        const validationResult = await validateBody(sanitizedData);

        if (!validationResult.isValid) {
            return setSecurityHeaders(NextResponse.json({
                success: false,
                status: 400,
                errors: validationResult.errors
            }, { status: 400 }));
        }

        var encryptedData = encryptData(sanitizedData);

        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = date.toTimeString().split(' ')[0];

        const query = `
            INSERT INTO apply_now_form 
            (Name, MobileNumber, EmailID, PropertyLocation, State, Pincode, LoanPurpose, LoanAmount, IncomeStatus, Date, Time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            encryptedData.Name,
            encryptedData.MobileNumber,
            encryptedData.EmailID,
            encryptedData.PropertyLocation,
            encryptedData.State,
            encryptedData.Pincode,
            encryptedData.LoanPurpose,
            encryptedData.LoanAmount,
            encryptedData.IncomeStatus,
            formattedDate,
            formattedTime
        ];


        await queryDB(query, values);
        homeLoanLogger.info('Data submitted successfully', JSON.stringify(encryptedData));
        return setSecurityHeaders(NextResponse.json(
            { success: true, message: 'Data submitted successfully', status: 200 },
            { status: 200 }
        ));

    } catch (error) {
        console.error('Error:', error);
        homeLoanLogger.error('Error submitting data', JSON.stringify(encryptedData));
        return setSecurityHeaders(NextResponse.json(
            { error: 'Internal server error', status: 500 },
            { status: 500 }
        ));
    }
}


function encryptData(data) {
    const encryptedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            encryptedData[key] = encryptValue(data[key]);
        }
    }
    return encryptedData;
}


function decryptFormData(data) {
    const decryptedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            decryptedData[key] = decryptValue(data[key]);
        }
    }
    return decryptedData;
}