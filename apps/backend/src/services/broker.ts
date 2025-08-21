// Broker integration stubs for MT5 / cTrader
export type BrokerPlatform = 'mt5' | 'ctrader';

export interface LiveMetrics {
  balance: number;
  equity: number;
  openTrades: number;
}

export async function fetchLiveMetrics(_userId: string, _platform: BrokerPlatform): Promise<LiveMetrics> {
  // TODO: integrate with real broker APIs
  return { balance: 10000, equity: 10020, openTrades: 0 };
}

