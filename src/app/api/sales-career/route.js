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
// const validateOrigin = (req) => {
//     const allowedOrigin = process.env.APP_URL || 'http://localhost:3000';
//     const origin = req.headers.get('origin') || req.headers.get('referer');
//     if (!origin || !origin.startsWith(allowedOrigin)) {
//         throw new Error('Access forbidden');
//     }
// };

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

        const query = 'SELECT * FROM sales_career ORDER BY id DESC';
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
    qualification: Joi.string().min(2).max(100).required()
        .messages({
            'string.empty': 'Qualification is required',
            'string.min': 'Qualification must be at least 2 characters long',
            'string.max': 'Qualification must be less than or equal to 100 characters'
        }),
    dob: Joi.date().required()
        .messages({
            'date.base': 'Date of birth is required and must be a valid date'
        }),
    communicationAddress: Joi.string().min(10).max(300).required()
        .messages({
            'string.min': 'Communication address must be at least 10 characters',
            'string.max': 'Communication address must be less than or equal to 300 characters',
            'string.empty': 'Communication address is required'
        }),
    pincode: Joi.string().pattern(/^\d{6}$/).required()
        .messages({
            'string.pattern.base': 'Pincode must be exactly 6 digits',
            'string.empty': 'Pincode is required'
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
    permanentAddress: Joi.string().min(10).max(300).required()
        .messages({
            'string.min': 'Permanent address must be at least 10 characters',
            'string.max': 'Permanent address must be less than or equal to 300 characters',
            'string.empty': 'Permanent address is required'
        }),
    timejoin: Joi.date().required()
        .messages({
            'date.base': 'Joining date is required and must be a valid date'
        }),
    howKnow: Joi.string().min(5).max(100).required()
        .messages({
            'string.min': 'How you know us should be at least 5 characters long',
            'string.max': 'How you know us should be less than or equal to 100 characters',
            'string.empty': 'How you know us is required'
        }),
    selectedState: Joi.string().min(2).max(50).required()
        .messages({
            'string.empty': 'State is required',
            'string.min': 'State must be at least 2 characters long',
            'string.max': 'State must be less than or equal to 50 characters'
        }),
    permanentPincode: Joi.string().pattern(/^\d{6}$/).required()
        .messages({
            'string.pattern.base': 'Permanent Pincode must be exactly 6 digits',
            'string.empty': 'Permanent Pincode is required'
        }),
    relativeWorking: Joi.string().valid('Yes', 'No').required()
        .messages({
            'any.only': 'Relative working status must be either Yes or No',
            'string.empty': 'Relative working status is required'
        }),
    previousExperience: Joi.string().valid('Yes', 'No').required()
        .messages({
            'any.only': 'Previous experience tatus must be either Yes or No',
            'string.empty': 'Previous experience status is required'
        })
});

const skipEncryptionFields = ['photoUrl', 'resumeUrl'];

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
            qualification,
            dob,
            communicationAddress,
            pincode,
            branch,
            permanentAddress,
            timejoin,
            howKnow,
            selectedState,
            permanentPincode,
            relativeWorking,
            previousExperience,
            resumeUrl,
            photoUrl
        } = body;


        if (!name || !email || !mobileNumber || !dob || !qualification || !communicationAddress || !permanentAddress || !branch || !selectedState || !pincode || !timejoin || !howKnow || !permanentPincode || !resumeUrl) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields', status: 400, message: "❗Please fill in all fields." },

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
        const encryptedBranch = JSON.stringify(encryptedData.branch || []);
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = now.toTimeString().split(' ')[0]; // HH:mm:ss

        const query = `
            INSERT INTO sales_career 
            (name, mobile_number, email_id, dob, qualification, communication_address, pincode, selected_state, branch, permanent_address, time_join, how_know, permanent_pincode, relative_working, previous_experience,resumeUrl, photoUrl, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)
        `;

        const values = [
            encryptedData.name,
            encryptedData.mobileNumber,
            encryptedData.email,
            encryptedData.dob,
            encryptedData.qualification,
            encryptedData.communicationAddress,
            encryptedData.pincode,
            encryptedData.selectedState,
            encryptedBranch,
            encryptedData.permanentAddress,
            encryptedData.timejoin,
            encryptedData.howKnow,
            encryptedData.permanentPincode,
            encryptedData.relativeWorking,
            encryptedData.previousExperience,
            resumeUrl,
            photoUrl,
            formattedDate + ' ' + formattedTime
        ];

        await queryDB(query, values);

        return NextResponse.json(
            { success: true, message: 'Data submitted successfully', status: 201 },

        );
    } catch (error) {
        const status = error.message === 'Access forbidden' ? 403 : 500;
        console.error('POST Error:', error.message);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message, status: status },
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
            if (key === "resumeUrl" || key === "photoUrl") {
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
