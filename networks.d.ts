export interface Network {
  apiDocs?: string;
  assetCode: string;
  blockExplorer: string;
  cflrFaucet?: string;
  chainId: string;
  chainName: string;
  rpcEnpoint: string;
  websocketEndpoint?: string;
}

export type NetworkArray = Network[];

declare const Networks: {
  networks: NetworkArray;
};

export default Networks;
