import { useState, useEffect, useDebugValue } from 'react';

/**
 * Custom Hook: useWindowSize
 * Listens to window resize events and returns current dimensions and device type.
 * Uses useDebugValue to display a custom label in React DevTools!
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deviceCategory =
    windowSize.width < 640
      ? 'Mobile 📱'
      : windowSize.width < 1024
      ? 'Tablet 📑'
      : 'Desktop 🖥️';

  // useDebugValue provides a label in React Developer Tools
  useDebugValue(
    `Width: ${windowSize.width}px (${deviceCategory})`,
    (val) => `[DevTools Debug] ${val}`
  );

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < 640,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    deviceCategory,
  };
}

export default useWindowSize;
