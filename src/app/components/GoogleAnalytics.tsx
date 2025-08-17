'use client';

import Script from 'next/script';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
    return (
        <>
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script id='google-analytics' strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                // Check for user's stored consent and set it.
                // If no consent is stored, set default to 'denied'.
                const hasMadeChoice = localStorage.getItem('cookie-consent');
                const analyticsConsent = hasMadeChoice === 'true' ? 'granted' : 'denied';

                gtag('consent', 'default', {
                    'analytics_storage': analyticsConsent
                });
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `}
            </Script>
        </>
    );
}