'use server';

import { NextResponse } from 'next/server';
import db from '@/lib/dbConnection';
import { verifyToken } from '../jwtToken';
import CryptoJS from 'crypto-js';
import Joi from 'joi';

// Utility function for database queries
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

// Utility function for origin validation
const validateOrigin = (req) => {
    const allowedOrigin = process.env.APP_URL || 'http://localhost:3000';
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
        if (verifyResponse.status !== 200) {
            return NextResponse.json(
                { error: 'Access forbidden', message: verifyResponse.message, status: verifyResponse.status },
            );
        };

        const query = 'SELECT * FROM newcareer ORDER BY id DESC';
        const results = await queryDB(query);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        const status = error.message === 'Access forbidden' ? 403 : 500;
        console.error('GET Error:', error.message);
        return NextResponse.json(
            { success: false, error: error.message, status: status },
        );
    }
}

// POST handler

function encryptValue(value) {
    // Ensure value is a non-null, non-empty string before encryption
    if (value === null || value === undefined) {
        console.warn('Value is null or undefined, using default empty string.');
        value = ''; // Use an empty string or handle differently
    } else if (typeof value !== 'string') {
        console.error('Invalid value to encrypt:', value);
        return null;
    }
    return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
}

function decryptValue(encryptedValue) {
    if (!encryptedValue) return 'undefined';
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
    name: Joi.string().min(2).max(50).pattern(/^[a-zA-Z\s]+$/).required()
        .messages({
            'string.pattern.base': 'Name must contain only letters and spaces, between 2-50 characters',
            'string.empty': 'Name is required'
        }),
    email: Joi.string().email().max(254).required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required'
        }),
    mobileNumber: Joi.string().pattern(/^\d{10}$/).required()
        .messages({
            'string.pattern.base': 'Mobile number must be exactly 10 digits',
            'string.empty': 'Mobile number is required'
        }),
    expertise: Joi.array().items(
        Joi.string().min(2).max(100).required().messages({
            'string.min': 'Each expertise must be at least 2 characters long',
            'string.max': 'Each expertise must be less than or equal to 100 characters',
            'string.empty': 'Expertise cannot be empty'
        })
    ).min(1).required().messages({
        'array.min': 'At least one expertise must be provided',
        'array.base': 'Expertise must be an array of strings',
        'any.required': 'Expertise is required'
    }),
    qualification: Joi.string().min(2).max(100).required()
        .messages({
            'string.empty': 'Qualification is required',
            'string.min': 'Qualification must be at least 2 characters long',
            'string.max': 'Qualification must be less than or equal to 100 characters'
        }),
    experience: Joi.number().min(0).required()
        .messages({
            'number.base': 'Experience must be a valid number',
            'number.min': 'Experience cannot be negative',
            'any.required': 'Experience is required'
        }),
    location: Joi.string().min(2).max(100).required()
        .messages({
            'string.empty': 'Location is required',
            'string.min': 'Location must be at least 2 characters long',
            'string.max': 'Location must be less than or equal to 100 characters'
        }),
    branch: Joi.array().items(
        Joi.string().min(2).max(50).required().messages({
            'string.min': 'Each branch name must be at least 2 characters long',
            'string.max': 'Each branch name must be less than or equal to 50 characters',
            'string.empty': 'Branch name cannot be empty'
        })
    ).min(1).required().messages({
        'array.min': 'At least one branch must be selected',
        'array.base': 'Branch must be an array of strings',
        'any.required': 'Branch is required'
    }),
    currentCTC: Joi.number().greater(0).required()
        .messages({
            'number.base': 'Current CTC must be a valid number',
            'number.greater': 'Current CTC must be greater than 0',
            'any.required': 'Current CTC is required'
        }),
    expectedCTC: Joi.number().greater(0).required()
        .messages({
            'number.base': 'Expected CTC must be a valid number',
            'number.greater': 'Expected CTC must be greater than 0',
            'any.required': 'Expected CTC is required'
        }),
    // s3Url: Joi.string().uri().required()
    //     .messages({
    //         'string.uri': 'S3 URL must be a valid URL',
    //         'string.empty': 'S3 URL is required'
    //     })
});


const skipEncryptionFields = ['s3Url'];

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

export async function POST(req) {
    try {
        validateOrigin(req);

        const body = await req.json();
        const {
            name,
            email,
            mobileNumber,
            expertise,
            qualification,
            experience,
            location,
            branch,
            currentCTC,
            expectedCTC,
            s3Url,
        } = body;

        if (!name || !email || !mobileNumber || !s3Url) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields', status: 400 },

            );
        }

        const decryptedBody = decryptFormData(body);


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

        const encryptedData = encryptData(sanitizedData);
        // const encryptedBranch = JSON.stringify(encryptedData.branch || []);

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = now.toTimeString().split(' ')[0]; // HH:mm:ss

        const query = `
        INSERT INTO newcareer 
        (name, mobileNumber, emailID, expertise, qualification, experience, location, branch, currentCTC, expectedCTC, formattedDate, formattedTime, s3Url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            encryptedData.name,
            encryptedData.mobileNumber,
            encryptedData.email,
            JSON.stringify(encryptedData.expertise || []),
            encryptedData.qualification,
            encryptedData.experience,
            encryptedData.location,
            JSON.stringify(encryptedData.branch || []),
            encryptedData.currentCTC,
            encryptedData.expectedCTC,
            formattedDate,
            formattedTime,
            s3Url,
        ];


        await queryDB(query, values);

        return NextResponse.json(
            { success: true, message: 'Data submitted successfully', status: 201 },

        );
    } catch (error) {
        const status = error.message === 'Access forbidden' ? 403 : 500;
        console.error('POST Error:', error.message);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message, status: 500 },
        );
    }
}


const encryptData = (data) => {
    console.log(data, "data");
    const encryptedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            console.log(value, "value");

            // Skip encryption for specific keys
            if (key === "s3Url") {
                encryptedData[key] = value;
            } else if (Array.isArray(value)) {
                encryptedData[key] = value.map((item) => encryptValue(item.toString()));
            } else {
                encryptedData[key] = encryptValue(value.toString());
            }
        }
    }
    return encryptedData;
};


// Decrypt all form data fields except for specified fields
function decryptFormData(data) {
    const decryptedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];


            if (skipEncryptionFields.includes(key)) {
                decryptedData[key] = value;
            } else if (Array.isArray(value)) {

                decryptedData[key] = value.map((item) => decryptValue(item));
            } else {

                decryptedData[key] = decryptValue(value);
            }
        }
    }

    return decryptedData;
}

