export interface addNetwork {
  chainId: string;
  rpcUrls: string[];
  chainName: string;
  blockExplorerUrls: string[];
  nativeCurrency: currency;
}

interface currency {
  name: string;
  symbol: string;
  decimals: number;
}

export type Events = "account" | "accountsChanged" | "network" | "disconnect";

export type SUPPORTED_WALLETS = "metamask" | "coinbase";

export type Network = {
  name: string;
  chainId: number;
  ensAddress?: string;
  _defaultProvider?: (providers: any, options?: any) => any;
};
