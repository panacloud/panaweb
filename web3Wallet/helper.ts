import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from '@metamask/detect-provider'

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

export const ConnectMetaMaskInstance = (): { web3Provider: Web3Provider | undefined, walletProvider: any | undefined } | undefined => {
  if (typeof window != "undefined") {
    if (typeof (window as any).ethereum !== "undefined") {
      console.log("line 19 ", (window as any).ethereum)
      const providers = (window as any).ethereum.providers;
      // const providers = await detectEthereumProvider()
      const walletProvider = providers?.find((p: { isMetaMask: any }) => p.isMetaMask); // <-- LOOK HERE
      console.log("walletProvider ", walletProvider)
      const web3Provider = getLibrary(walletProvider)
      return {
        walletProvider,
        web3Provider
      }
    }
  } else {
    undefined
  }
};

export const ConnectCoinbaseInstance = (rpcUrl: string): { web3Provider: Web3Provider | undefined, walletProvider: any } | undefined => {
  // const DEFAULT_ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934`
  if (!rpcUrl) {
    throw new Error("no rpc url provided");
  }
  const DEFAULT_CHAIN_ID = 1;
  if (typeof window !== "undefined") {
    console.log("window ", window)

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: "web3wallets",
    });
    const walletProvider = coinbaseWallet.makeWeb3Provider(rpcUrl, DEFAULT_CHAIN_ID);
    console.log("walletProvider ", walletProvider)

    const web3Provider=getLibrary(walletProvider);
    return {
      walletProvider,
      web3Provider
    }
    } else {
    return undefined;
  }
};