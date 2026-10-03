import { useEffect, useState } from 'react';
import { keepAliveService, KeepAliveStats } from '../services/keepAliveService';

/**
 * Custom React hook to automatically run anti-sleep keep-alive pings
 * @param intervalMinutes Timer interval in minutes (default: 5 minutes)
 */
export function useKeepAlive(intervalMinutes: number = 5) {
  const [stats, setStats] = useState<KeepAliveStats>(keepAliveService.getStats());

  useEffect(() => {
    // Start anti-sleep timer on component mount
    keepAliveService.start(intervalMinutes);

    // Refresh stats every 15 seconds for reactive UI rendering
    const statsTimer = setInterval(() => {
      setStats(keepAliveService.getStats());
    }, 15000);

    return () => {
      clearInterval(statsTimer);
    };
  }, [intervalMinutes]);

  const triggerManualPing = async () => {
    await keepAliveService.sendPing();
    setStats(keepAliveService.getStats());
  };

  return {
    ...stats,
    triggerManualPing
  };
}
