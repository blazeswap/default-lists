export interface Token {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

export type TokenArray = Token[];

declare const tokens: {
  tokens: TokenArray;
};

export default tokens;
