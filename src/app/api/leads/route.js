'use server';
import { NextResponse } from 'next/server';
import db from '@/lib/dbConnection';
import Joi from 'joi';
import CryptoJS from 'crypto-js';
import { verifyToken } from '../jwtToken';
import createFormLogger from '@/utils/logger';

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

        const query = 'SELECT * FROM leads ORDER BY id DESC';
        const results = await queryDB(query);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // console.error('GET Error:', error.message);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message, status: 500 },

        );
    }
}

// POST handler
function encryptValue(value) {
    // Ensure value is a non-null, non-empty string before encryption
    if (!value || typeof value !== 'string') {
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

    // Multi-layer sanitization
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

// Joi validation schema
const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]{2,50}$/).required()
        .messages({
            'string.pattern.base': 'Name must contain only letters and spaces, between 2-50 characters'
        }),
    mobile: Joi.string().pattern(/^\d{10}$/).required()
        .messages({
            'string.pattern.base': 'Mobile number must be exactly 10 digits'
        }),
    email: Joi.string().email({ minDomainSegments: 2 }).max(254).required()
        .messages({
            'string.email': 'Please enter a valid email address'
        }),
    location: Joi.string().max(200).pattern(/^[a-zA-Z0-9\s,.-]{2,200}$/).required()
        .messages({
            'string.pattern.base': 'Property location contains invalid characters'
        }),
    pincode: Joi.string().pattern(/^\d{6}$/).required()
        .messages({
            'string.pattern.base': 'Pincode must be exactly 6 digits'
        }),
    loanAmount: Joi.required(),
    purpose: Joi.string().max(200).pattern(/^[a-zA-Z0-9\s,.-]{2,200}$/).required()
        .messages({
            'string.pattern.base': 'Loan purpose contains invalid characters'
        }),
    utmSrc: Joi.string().allow(null, '').optional(),
    utmMedium: Joi.string().allow(null, '').optional(),
    utmCampaign: Joi.string().allow(null, '').optional()
});

// Validation function
async function validateBody(body) {
    try {
        const validationResult = await schema.validateAsync(body, {
            abortEarly: false,
            stripUnknown: true
        });
        return { isValid: true, data: validationResult };
    } catch (error) {
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

// Security headers function
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

// Encrypt all fields
function encryptData(data) {
    const encryptedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(`Encrypting key: ${key}, value: ${data[key]}`);
            encryptedData[key] = encryptValue(data[key]);
        }
    }
    return encryptedData;
}

// Decrypt form data
function decryptFormData(data) {
    const decryptedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            decryptedData[key] = decryptValue(data[key]);
        }
    }
    return decryptedData;
}

const leadFormLogger = createFormLogger('leads');

export async function POST(req) {
    try {
        if (!validateOrigin(req)) {
            return setSecurityHeaders(NextResponse.json(
                { error: 'Access forbidden', status: 403 },
                { status: 403 }
            ));
        }

        const body = await req.json();
        console.log(body, "body"); // Log the raw request body
        const decryptedBody = decryptFormData(body);
        console.log(decryptedBody, "decryptedBody"); // Log the decrypted body

        // Sanitize and validate data
        const sanitizedData = Object.fromEntries(
            Object.entries(decryptedBody).map(([key, value]) => [
                key,
                sanitizeInput(value)
            ])
        );

        // Validate sanitized data
        const validationResult = await validateBody(sanitizedData);

        if (!validationResult.isValid) {
            return setSecurityHeaders(NextResponse.json({
                success: false,
                status: 400,
                errors: validationResult.errors
            }, { status: 400 }));
        }

        var encryptedData = encryptData(validationResult.data);

        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = date.toTimeString().split(' ')[0];

        const query = `
            INSERT INTO leads 
            (name, email, mobileNumber, location, pincode, loanAmount, purpose, utmSrc, utmMedium, utmCampaign, formattedDate, time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            encryptedData.name,
            encryptedData.email,
            encryptedData.mobile,
            encryptedData.location,
            encryptedData.pincode,
            encryptedData.loanAmount,
            encryptedData.purpose,
            encryptedData.utmSrc || null,
            encryptedData.utmMedium || null,
            encryptedData.utmCampaign || null,
            formattedDate,
            formattedTime
        ];

        await queryDB(query, values);

        leadFormLogger.info('Lead form submitted successfully');

        return setSecurityHeaders(NextResponse.json(
            { success: true, message: 'Data submitted successfully', status: 201 },
            { status: 201 }
        ));

    } catch (error) {
        console.error('Error:', error);
        leadFormLogger.error('Error submitting lead form', encryptedData);
        return setSecurityHeaders(NextResponse.json(
            {
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
                status: 500
            },
            { status: 500 }
        ));
    }
}

