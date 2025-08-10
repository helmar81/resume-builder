'use client';

import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasMadeChoice = localStorage.getItem('cookie-consent');
    if (!hasMadeChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);

    // Call gtag to update consent state
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };
  
  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsVisible(false);

    // Optionally, you can also ensure the consent remains denied if the user declines
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-2xl rounded-lg bg-gray-800 p-4 text-white shadow-xl md:flex md:items-center md:justify-between">
        <p className="mb-4 text-sm md:mb-0">
          This website uses cookies to enhance the user experience and analyze
          site traffic. By continuing to use this site, you agree to our use of cookies.
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecline}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;