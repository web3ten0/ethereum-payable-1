import { defineStore } from "pinia";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    ethereum: null as any,
    provider: null as any,
    notInstalledMetaMask: true,
    currentAccount: null as any,
  }),
  actions: {
    async init() {
      const provider = await detectEthereumProvider();
      if (!provider || !window.ethereum || provider !== window.ethereum) {
        this.notInstalledMetaMask = true;
      } else {
        this.notInstalledMetaMask = false;
        this.ethereum = window.ethereum;
        this.provider = new ethers.providers.Web3Provider(this.ethereum);
      }
    },
    async getCurrentAccount() {
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts", accounts);
    },
  },
});
