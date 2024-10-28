// wallet selector
import "@near-wallet-selector/modal-ui/styles.css";
import {
  setupWalletSelector,
  WalletSelector,
  NetworkId,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
// near api js
import { providers, utils } from "near-api-js";
import { createContext } from "react";

// ethereum wallets
import { wagmiConfig, web3Modal } from "@/wallets/web3modal";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

interface WalletOptions {
  networkId: NetworkId; // Ensure it's of type NetworkId
  createAccessKeyFor?: string;
}

export class Wallet {
  private createAccessKeyFor?: string;
  private networkId: NetworkId;
  private selector!: WalletSelector;

  /**
   * @constructor
   * @param {Object} options - the options for the wallet
   * @param {string} options.networkId - the network id to connect to
   * @param {string} options.createAccessKeyFor - the contract to create an access key for
   */
  constructor({ networkId, createAccessKeyFor }: WalletOptions) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.networkId = networkId;
  }

  /**
   * To be called when the website loads
   * @param {Function} accountChangeHook - a function that is called when the user signs in or out
   * @returns {Promise<string>} - the accountId of the signed-in user
   */
  startUp = async (
    accountChangeHook: (signedAccountId: string) => void
  ): Promise<string> => {
    this.selector = await setupWalletSelector({
      network: this.networkId,
      modules: [
        setupMyNearWallet(),
        setupLedger(),
        setupMeteorWallet(),
        setupSender(),
      ],
    });

    const isSignedIn = this.selector.isSignedIn();
    const accountId = isSignedIn
      ? this.selector.store.getState().accounts[0]?.accountId || ""
      : "";

    this.selector.store.observable.subscribe((state) => {
      const signedAccount = state?.accounts.find(
        (account) => account.active
      )?.accountId;
      accountChangeHook(signedAccount || "");
    });

    return accountId;
  };

  /**
   * Displays a modal to login the user
   */
  signIn = async (): Promise<void> => {
    const modal = setupModal(this.selector, {
      contractId: this.createAccessKeyFor || "",
    });
    modal.show();
  };

  /**
   * Logout the user
   */
  signOut = async (): Promise<void> => {
    const selectedWallet = await this.selector.wallet();
    await selectedWallet.signOut();
  };

  /**
   * Makes a read-only call to a contract
   * @param {Object} options - the options for the call
   * @param {string} options.contractId - the contract's account id
   * @param {string} options.method - the method to call
   * @param {Object} options.args - the arguments to pass to the method
   * @returns {Promise<any>} - the result of the method call
   */
  viewMethod = async ({
    contractId,
    method,
    args = {},
  }: {
    contractId: string;
    method: string;
    args?: object;
  }): Promise<any> => {
    const url = `https://rpc.${this.networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url });

    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from((res as any).result).toString());
  };

  /**
   * Makes a call to a contract
   * @param {Object} options - the options for the call
   * @param {string} options.contractId - the contract's account id
   * @param {string} options.method - the method to call
   * @param {Object} options.args - the arguments to pass to the method
   * @param {string} options.gas - the amount of gas to use
   * @param {string} options.deposit - the amount of yoctoNEAR to deposit
   * @returns {Promise<any>} - the resulting transaction
   */
  callMethod = async ({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: string;
    method: string;
    args?: object;
    gas?: string;
    deposit?: string;
  }): Promise<any> => {
    // Sign a transaction with the "FunctionCall" action
    const selectedWallet = await (await this.selector).wallet();
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    // Ensure outcome is not void before proceeding
    if (!outcome) {
      throw new Error("Transaction failed or did not return an outcome.");
    }

    return providers.getTransactionLastResult(outcome);
  };

  /**
   * Makes a call to a contract
   * @param {string} txhash - the transaction hash
   * @returns {Promise<any>} - the result of the transaction
   */
  getTransactionResult = async (txhash: string): Promise<any> => {
    const { network } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unused");
    return providers.getTransactionLastResult(transaction);
  };

  /**
   * Gets the balance of an account
   * @param {string} accountId - the account id to get the balance of
   * @returns {Promise<number>} - the balance of the account
   */
  getBalance = async (accountId: string): Promise<number> => {
    const { network } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve account state from the network
    const account = await provider.query({
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    });

    // Format the amount and remove commas
    const amountString = utils.format.formatNearAmount((account as any).amount);
    const amount = Number(amountString.replace(/,/g, "").trim());

    // Return amount in NEAR
    return (account as any).amount ? amount : 0;
  };

  /**
   * Signs and sends transactions
   * @param {Object[]} transactions - the transactions to sign and send
   * @returns {Promise<FinalExecutionOutcome[]>} - the resulting transactions
   */
  signAndSendTransactions = async ({
    transactions,
  }: {
    transactions: any[];
  }): Promise<any[]> => {
    const selectedWallet = await this.selector.wallet();
    const outcomes = await selectedWallet.signAndSendTransactions({
      transactions,
    });

    // Ensure outcomes is not void before proceeding
    if (!outcomes) {
      throw new Error("Transaction failed or did not return an outcome.");
    }

    return outcomes; // The outcomes should be of type FinalExecutionOutcome[]
  };

  /**
   * Gets the access keys for an account
   * @param {string} accountId - the account id
   * @returns {Promise<object[]>} - the access keys
   */
  getAccessKeys = async (accountId: string): Promise<any[]> => {
    const { network } = this.selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve account state from the network
    const keys = await provider.query({
      request_type: "view_access_key_list",
      account_id: accountId,
      finality: "final",
    });
    return (keys as any).keys;
  };
}

/**
 * @typedef NearContext
 * @property {Wallet} wallet Current wallet
 * @property {string} signedAccountId The AccountId of the signed user
 */

/** @type {Context<NearContext>} */
export const NearContext = createContext<{
  wallet: Wallet | undefined;
  signedAccountId: string;
}>({
  wallet: undefined,
  signedAccountId: "",
});
