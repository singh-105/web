/**
 * AURA LUXE — Anti-Sleep Keep-Alive Heartbeat Service
 * 
 * Automatically sends periodic HTTP pings to the application's deployment URL
 * to prevent free-tier hosting providers (e.g. Render, Heroku, Railway) 
 * from putting the web service to sleep after inactivity.
 */

export interface KeepAliveStats {
  isActive: boolean;
  intervalMinutes: number;
  lastPingTime: string | null;
  pingCount: number;
  targetUrl: string;
}

// Default interval: 5 minutes (300,000 milliseconds)
const DEFAULT_INTERVAL_MS = 5 * 60 * 1000;

class KeepAliveService {
  private timerId: number | null = null;
  private intervalMs: number = DEFAULT_INTERVAL_MS;
  private pingCount: number = 0;
  private lastPingTime: string | null = null;

  /**
   * Get the current target URL (deployment origin or custom backend URL)
   */
  public getTargetUrl(): string {
    const customUrl = import.meta.env.VITE_KEEPALIVE_URL;
    if (customUrl) return customUrl;
    
    if (typeof window !== 'undefined' && window.location) {
      return window.location.origin;
    }
    return 'http://localhost:5173';
  }

  /**
   * Start the periodic keep-alive timer
   * @param intervalMinutes Optional custom interval in minutes (default: 5)
   */
  public start(intervalMinutes: number = 5): void {
    if (this.timerId !== null) {
      return; // Already running
    }

    this.intervalMs = Math.max(1, intervalMinutes) * 60 * 1000;
    const targetUrl = this.getTargetUrl();

    console.log(
      `[AURA LUXE Keep-Alive] 🚀 Heartbeat service started. Pinging ${targetUrl} every ${intervalMinutes} minutes.`
    );

    // Initial ping after 10 seconds of app load
    setTimeout(() => {
      this.sendPing();
    }, 10000);

    // Recurring interval timer
    this.timerId = window.setInterval(() => {
      this.sendPing();
    }, this.intervalMs);
  }

  /**
   * Stop the keep-alive service
   */
  public stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
      console.log('[AURA LUXE Keep-Alive] ⏹️ Heartbeat service stopped.');
    }
  }

  /**
   * Trigger a single HTTP ping to keep the host awake
   */
  public async sendPing(): Promise<boolean> {
    const targetUrl = this.getTargetUrl();
    const timestamp = new Date().toLocaleTimeString();

    try {
      // Append query parameter to bypass aggressive browser caching
      const pingEndpoint = `${targetUrl}/?keepalive=${Date.now()}`;
      
      // Perform lightweight fetch request
      await fetch(pingEndpoint, {
        method: 'GET',
        cache: 'no-store',
        mode: 'no-cors',
        headers: {
          'X-Keep-Alive-Ping': 'AURA-LUXE-Heartbeat'
        }
      });

      this.pingCount++;
      this.lastPingTime = timestamp;

      console.log(
        `[AURA LUXE Keep-Alive] 💓 Ping #${this.pingCount} sent successfully to ${targetUrl} at ${timestamp}`
      );
      return true;
    } catch (err) {
      console.warn(
        `[AURA LUXE Keep-Alive] ⚠️ Ping attempt at ${timestamp} encountered network glitch:`,
        err
      );
      return false;
    }
  }

  /**
   * Get current operational status for UI monitoring
   */
  public getStats(): KeepAliveStats {
    return {
      isActive: this.timerId !== null,
      intervalMinutes: Math.round(this.intervalMs / (60 * 1000)),
      lastPingTime: this.lastPingTime,
      pingCount: this.pingCount,
      targetUrl: this.getTargetUrl()
    };
  }
}

export const keepAliveService = new KeepAliveService();
