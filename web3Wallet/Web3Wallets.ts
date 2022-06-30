import { Network, Web3Provider } from "@ethersproject/providers";
import { CoinbaseWallet } from "./Coinbase";
import { MetaMaskWallet } from "./MetaMask";
import { addNetwork, Events, SUPPORTED_WALLETS } from "./types";
import { ExtensionWallet } from "./ExtensionWallet";
import { WalletAbstract } from "./walletAbstract";

export class Web3Wallets extends WalletAbstract {
    library: Web3Provider | undefined;
    provider: any;
    private instance: WalletAbstract;

    constructor(wallet: SUPPORTED_WALLETS, options?: { rpcUrl: string }) {
        super(wallet); // must call super()
        this.instance = new ExtensionWallet(wallet, options?.rpcUrl!)
        if (wallet === "metamask") {
            this.instance = new MetaMaskWallet(wallet, options?.rpcUrl);
            this.provider = this.instance.provider;
        }
        else if (wallet === "coinbase") {
            if (!options?.rpcUrl) throw new Error("no rpcUrl provided");
            this.instance = new CoinbaseWallet(wallet, options?.rpcUrl);
            this.provider = this.instance.provider;
        }
    }

    connect(): Promise<string[]> {
        return this.instance.connect();
    }

    changeNetwork(network: addNetwork): Promise<any> {
        return this.instance.changeNetwork(network);
    }

    sign(message: any): Promise<string | undefined> {
        return this.instance.sign(message);
    }

    getAccount(): Promise<string> {
        return this.instance.getAccount();
    }

    getNetwork(network: addNetwork): Promise<Network | undefined> {
        return this.instance.getNetwork(network);
    }

    getAccounts(): Promise<string[]> {
        return this.instance.getAccounts();
    }

    on(event: Events, callback: any) {
        this.instance.on(event, callback);
    }
}
