'use server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
import db from '@/lib/dbConnection';

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


const isAllowedOrigin = (req) => {
    const allowedOrigin = process.env.APP_URL || 'http://localhost:3000';
    // console.log(allowedOrigin, "allowedOrigin");
    const origin = req.headers.get('origin') || req.headers.get('referer');
    return origin && origin.startsWith(allowedOrigin);
};

export async function POST(req) {
    try {
        // validateOrigin(req);
        // console.log(req, "req");

        if (!isAllowedOrigin(req)) {
            return NextResponse.json(
                { error: 'Access forbidden' , message: 'Access forbidden', status: 403 },
            );
        }

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (email === 'admin@repcohome.com' && password === 'admin') {

            const token = jwt.sign(
                { email, role: 'admin' },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return NextResponse.json(
                {
                    success: true,
                    message: 'Login successful',
                    status: 200,
                    token
                },
            );
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials', message: 'Invalid credentials', status: 401 },

            );
        }
    } catch (error) {
        const status = error.message === 'Access forbidden' ? 403 : 500;
        // console.error('POST Error:', error.message);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message, status: status },
        );
    }
}
