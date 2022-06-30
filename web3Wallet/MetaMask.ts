import { ExtensionWallet } from "./ExtensionWallet";
import { SUPPORTED_WALLETS } from "./types";

export class MetaMaskWallet extends ExtensionWallet {
  constructor(wallet: SUPPORTED_WALLETS, rpcUrl?: string) {
    super(wallet, rpcUrl);
  }
}
