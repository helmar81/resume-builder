'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
    const [hasConsent, setHasConsent] = useState(false); // Assume this state is updated by a cookie banner

    useEffect(() => {
        // This is a placeholder. You would have a real cookie banner logic here
        // For example, reading a cookie to check if the user has consented.
        const userConsent = localStorage.getItem('user-consent');
        if (userConsent === 'granted') {
            setHasConsent(true);
        }
    }, []);

    useEffect(() => {
        if (hasConsent) {
            // Update the consent status to 'granted'
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }, [hasConsent]);

    return (
        <>
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script id='google-analytics' strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                // Set default consent to 'denied'
                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                // Configure Google Analytics with your Measurement ID
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `}
            </Script>
        </>
    );
}