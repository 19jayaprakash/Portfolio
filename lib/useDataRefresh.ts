import { useEffect } from 'react';

/**
 * Hook to listen for portfolio data updates from admin panel
 * Triggers a callback when admin saves new data
 */
export function useDataRefresh(callback: () => void) {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio-data-updated') {
        console.log('Portfolio data updated! Refreshing...');
        callback();
      }
    };

    // Listen for storage events from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for updates (every 2 seconds)
    const interval = setInterval(() => {
      const lastUpdate = localStorage.getItem('portfolio-data-updated');
      if (lastUpdate) {
        const updateTime = parseInt(lastUpdate);
        const now = Date.now();
        // If update happened in last 3 seconds, refresh
        if (now - updateTime < 3000) {
          console.log('Detected recent update, refreshing...');
          callback();
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [callback]);
}
