const helloContractPerNetwork = {
  mainnet: "hello.near-examples.near",
  testnet: "hello.near-examples.testnet",
};

const paymentContractPerNetwork = {
  mainnet: "hello.near-examples.near",
  testnet: "narrow-shade.testnet",
};

const ftContractPerNetwork = {
  mainnet: "hello.near-examples.near",
  testnet: "adhesive-lizards.testnet",
};

// Chains for EVM Wallets
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: "Near Mainnet",
    explorer: "https://eth-explorer.near.org",
    rpc: "https://eth-rpc.mainnet.near.org",
  },
  testnet: {
    chainId: 398,
    name: "Near Testnet",
    explorer: "https://eth-explorer-testnet.near.org",
    rpc: "https://eth-rpc.testnet.near.org",
  },
};

export const NetworkId = "testnet";
export const HelloNearContract = helloContractPerNetwork[NetworkId];
export const PaymentNearContract = paymentContractPerNetwork[NetworkId];
export const FTNearContract = ftContractPerNetwork[NetworkId];
export const EVMWalletChain = evmWalletChains[NetworkId];
