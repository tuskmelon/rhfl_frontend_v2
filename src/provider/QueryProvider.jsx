'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function QueryProvider({ children }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}