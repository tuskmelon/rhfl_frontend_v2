'use server'
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {

        const allowedOrigin = process.env.APP_URL || 'http://localhost:3000';
        const origin = req.headers.get('origin') || req.headers.get('referer');

        if (!origin || !origin.startsWith(allowedOrigin)) {
            return new Response(
                JSON.stringify({ error: 'Access forbidden', status: 403 }),
            );
        }
        const { captchaValue } = await req.json();

        const SITE_SECRET = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;
        console.log(SITE_SECRET, "SITE_SECRET");

        const data = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`
        );
        console.log(data, "data", data.data.success);
        if (data.data.success === true) {
            return NextResponse.json(data.data, { status: 200 });
        } else {
            return NextResponse.json({
                status: 'failed',
                error: data.data,
            }, { status: 400 });
        }
    } catch (error) {
        console.log('Error message from authController\'s verifyCaptcha:', error);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
};