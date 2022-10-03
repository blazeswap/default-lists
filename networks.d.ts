export interface Network {
  assetCode: string;
  blockExplorer: string;
  faucet?: string;
  chainId: string;
  chainName: string;
  gasLimit: number;
  rpcEndpoint: string;
  websocketEndpoint?: string;
}

export type NetworkArray = Network[];

declare const Networks: {
  networks: NetworkArray;
};

export default Networks;
