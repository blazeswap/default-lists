export interface Provider {
  address: string;
  chainId: number;
  description: string;
  logoURI: string;
  name: string;
}

export type ProviderArray = Provider[];

declare const providers: {
  providers: ProviderArray;
};

export default providers;
