import { Network, Web3Provider } from "@ethersproject/providers";
import { addNetwork, Events, SUPPORTED_WALLETS } from "./types";

abstract class WalletAbstract {
  private wallet: SUPPORTED_WALLETS;
  abstract library: Web3Provider | undefined;
  abstract provider: any;

  constructor(wallet: SUPPORTED_WALLETS, rpcUrl?: string) {
    this.wallet = wallet;
  }

  abstract connect(): Promise<string[]>;

  abstract getAccounts(): Promise<string[]>;

  abstract getAccount(): Promise<string>;

  abstract changeNetwork(network: addNetwork): Promise<any>;

  abstract sign(message: any): Promise<string | undefined>;

  abstract getNetwork(network: addNetwork): Promise<Network | undefined>;

  abstract on(event: Events, callback: any): any
}

export { WalletAbstract };
