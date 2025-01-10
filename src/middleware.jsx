import { NextResponse } from 'next/server';

export default async function middleware(req) {
    const { pathname, search } = req.nextUrl;

    const response = NextResponse.next();

    response.headers.set('x-custom-header', pathname);
    response.headers.set('x-search-url', search);

//    console.log(response, "response");

    return response;
}

export const config = {
    matcher: '/:path*',
};
