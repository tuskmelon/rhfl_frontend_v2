import './globals.css';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/Header';
import QueryProvider from '@/provider/QueryProvider';
import Script from 'next/script';
import 'flowbite/dist/flowbite.min.css';
import { Toaster } from 'react-hot-toast';
import { headers } from 'next/headers';


export const metadata = {
  title: 'Repco Home Finance Limited (RHFL)',
  description:
    'Repco Home Finance is one of the leading housing loan finance companies in India. We offer housing loan products at attractive interests.',
};

export default async function RootLayout({ children }) {

  // console.log(await params, "params");

  const headersObj = await headers();
  const headerValue = headersObj?.get('x-custom-header') || 'Default Value';
  const finalValue = headerValue?.split('/')?.pop();

  console.log(finalValue, "finalValue");

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="manifest" href="manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryProvider>
          <Toaster />
          {
            finalValue !== "leads" && finalValue !== "thank-you" ?
              <Header /> : ""
          }
          <div className={`${finalValue === "leads" || finalValue === "thank-you" ? "" : "lg:mt-[8.4rem]"}`}>
          
            {children}
          </div>
          {
            finalValue !== "leads" && finalValue !== "thank-you" ?
              <Footer /> : ""
          }

        </QueryProvider>
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" strategy="afterInteractive" />
      </body>
    </html >
  );
}
