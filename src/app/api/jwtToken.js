import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


const SECRET_KEY = process.env.JWT_SECRET ;

export async function verifyToken(req) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1]; 

        console.log(token, "tokenDB");
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Authorization token is missing' },
                { status: 401 }
            );
        }

        
        const decoded = jwt.verify(token, SECRET_KEY);

        console.log(decoded, "decoded");

       
        req.user = decoded;

        return NextResponse.next(); 
    } catch (error) {
        // console.error('JWT Verification Error:', error.message);
        return NextResponse.json(
            { success: false, error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}
