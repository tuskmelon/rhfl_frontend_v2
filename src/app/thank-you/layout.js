import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Thank You</title>
                <meta name="Thank You" content="Thank You" />
            </Head>

            <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s){
                            if(f.fbq)return;n=f.fbq=function(){
                                n.callMethod ?
                                n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                            };
                            if(!f._fbq)f._fbq=n;
                            n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)
                        }(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '5307899675977099');
                        fbq('track', 'PageView');
                    `,
                }}
            />

            {/* Google Tag Manager */}
            <Script
                id="gtm-head"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){
                            w[l]=w[l]||[];w[l].push({'gtm.start': 
                            new Date().getTime(),event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TBMXZV3');
                    `,
                }}
            />

            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TBMXZV3"
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                    title="Google Tag Manager"
                ></iframe>
            </noscript>

            <noscript>
                <Image
                    height={1}
                    width={1}
                    style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=5307899675977099&ev=PageView&noscript=1"
                    alt="Facebook Pixel"
                />
            </noscript>

            <div className="scroll-smooth">
                {children}
            </div>
        </>
    );
}
