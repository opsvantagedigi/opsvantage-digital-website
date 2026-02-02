import { useState, useEffect } from 'react';

/**
 * A non-visual component that sends a tracking event on route change.
 * This demonstrates the correct way to handle browser-specific APIs in Next.js.
 */
export const TrackingBeacon = () => {
  const [path, setPath] = useState('');

  useEffect(() => {
    // This code block will ONLY run on the client-side, after the component has mounted.
    // This safely prevents the "window is not defined" error during the build process.
    if (window.location.pathname !== path) {
      const currentPath = window.location.pathname;
      setPath(currentPath);

      // In a real scenario, you would send this to your analytics service.
      console.log(`[Analytics Beacon]: User navigated to ${currentPath}`);
    }
  }, []); // The empty dependency array ensures this runs once on mount.
           // For tracking route changes, you'd integrate with Next.js's router events.

  // This component renders nothing to the DOM. Its purpose is purely for side-effects.
  return null;
};