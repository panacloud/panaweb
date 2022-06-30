import { SUPPORTED_WALLETS } from "./types";
import { ExtensionWallet } from "./ExtensionWallet";

export class CoinbaseWallet extends ExtensionWallet {
    constructor(wallet: SUPPORTED_WALLETS, rpcUrl?: string) {
        super(wallet, rpcUrl)
    }
}
