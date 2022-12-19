export interface Provider {
  address: string;
  chainId: number;
  description?: string;
  logoURI?: string;
  name: string;
  url?: string;
  listed?: boolean;
}

export type ProviderArray = Provider[];

declare const providers: {
  providers: ProviderArray;
};

export default providers;
