import { Web3Provider } from "@ethersproject/providers";
import { ConnectCoinbaseInstance, ConnectMetaMaskInstance } from "./helper";
import { addNetwork, Events, SUPPORTED_WALLETS } from "./types";
import { WalletAbstract } from "./walletAbstract";

export class ExtensionWallet extends WalletAbstract {
  library: Web3Provider | undefined;
  provider: any

  constructor(wallet: SUPPORTED_WALLETS, rpcUrl?: string) {
    super(wallet); // must call super()
    if (wallet === "metamask") {
      const instance = ConnectMetaMaskInstance();
      this.provider = instance?.walletProvider
      this.library = instance?.web3Provider
    }

    if (wallet === "coinbase") {
      if (!rpcUrl) { throw new Error("no rpcUrl provided"); }
      const instance = ConnectCoinbaseInstance(rpcUrl);
      this.provider = instance?.walletProvider
      this.library = instance?.web3Provider
    }
  }

  async connect() {
    if (!this.library) {
      return [];
    }
    const accounts = await this.library.provider.request?.({ method: 'eth_requestAccounts' });
    await this.provider?.enable()
    return accounts

    // console.log("meta mask provider", MetaMaskProvider())
    // const accounts = (window as any).ethereum?.enable();
    // return accounts
    // const accounts = await this.provider.provider.request?.({
    //   method: "wallet_requestPermissions",
    //   params: [{ eth_accounts: {} }]
    // });
    // await this.library?.send('wallet_requestPermissions', [{ eth_accounts: {} }]);
    // return accounts[0].caveats[0].value;
  }

  async getAccounts() {
    if (!this.library) return [];
    const accounts = await this.library.provider.request?.({
      method: "eth_accounts",
    });
    return accounts;
  }

  async getAccount() {
    return (await this.getAccounts())[0];
  }

  async getNetwork() {
    if (!this.library) {
      return undefined;
    }
    return await this.library.getNetwork();
  }

  async sign(message: any) {
    let signer = this.library?.getSigner(0);
    return await signer?.signMessage(message);
  }

  async changeNetwork(network: addNetwork) {
    return await this.library?.send("wallet_addEthereumChain", [network]);
  }

  on(event: Events, callback: any) {
    let internalCallback
    switch (event) {
      case 'account':
        internalCallback = (accounts: string[]) => callback(accounts[0])
        this.provider?.on('accountsChanged', internalCallback)
        break
      case 'accountsChanged':
        // console.log("account change listner from wallet class running")
        internalCallback = (accounts: string[]) => callback(accounts)
        this.provider?.on('accountsChanged', internalCallback)
        break
      case 'network':
        internalCallback = (chainId: string) => callback(chainId)
        this.provider?.on('chainChanged', internalCallback)
        break
      case 'disconnect':
        internalCallback = callback
        this.provider?.on('disconnect', internalCallback)
        break
    }
    return internalCallback
  }

}
