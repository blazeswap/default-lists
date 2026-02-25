# default-lists
A list of default tokens and FTSO providers for BlazeSwap

This document explains how to create and import custom token lists for use with the BlazeSwap decentralized exchange.

## Table of Contents

1. [Introduction](#introduction)
2. [Supported Networks](#supported-networks)
3. [Token List JSON Format](#token-list-json-format)
4. [Example Token List](#example-token-list)
5. [Technical Requirements for Serving](#technical-requirements-for-serving)
6. [How to Import](#how-to-import)
7. [Hosting Recommendations](#hosting-recommendations)
8. [Inclusion in default list](#inclusion-in-default-list)
9. [Support](#support)

## Introduction

BlazeSwap includes a default set of tokens that are always available in the interface, but also allows users to import custom token lists
to add tokens that aren't included in the default token lists. This feature is useful for:

- Adding newly launched tokens before they're added to default lists
- Adding community-created tokens
- Adding tokens specific to your use case

Custom token lists are fetched from a URL you provide, parsed, validated, and then made available in the BlazeSwap interface.

## Supported Networks

BlazeSwap supports the following blockchain networks. Your custom token list can include tokens from any of these networks:

| Network | Chain ID (Decimal) | Chain ID (Hex) |
|---------|-------------------|----------------|
| Flare | 14 | 0xe |
| Songbird | 19 | 0x13 |
| Coston (Testnet) | 16 | 0x10 |
| Coston2 (Testnet) | 114 | 0x72 |

## Token List JSON Format

The custom token list should be in the following JSON format:

```json
{
  "tokens": [
    {
      "chainId": 14,
      "address": "0x...",
      "name": "Token Name",
      "symbol": "SYMBOL",
      "decimals": 18,
      "logoURI": "https://example.com/logo.png"
    }
  ]
}
```

### Token Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `chainId` | number | Yes | Network chain ID (14, 19, 16, or 114) |
| `name` | string | Yes | Full token name (e.g., "Doggo Coin") |
| `symbol` | string | Yes | Token symbol (e.g., "DOGGO") |
| `decimals` | number | Yes | Token decimals |
| `address` | string | Yes* | Token contract address (valid Ethereum address format) |
| `logoURI` | string | No | URL to token logo image |
| `feePct` | number | No | Fee percentage, if it's a fee-on-transfer token (e.g. 0.5) |

## Example Token List

Here's a complete example token list containing tokens from both Flare and Songbird networks:

```json
{
  "tokens": [
    {
      "chainId": 14,
      "name": "Pickles Warfare Token",
      "symbol": "PPW",
      "decimals": 18,
      "address": "0x627897704eD912BF77A000E5f577d1B37A6AfF57",
      "logoURI": "https://raw.githubusercontent.com/blazeswap/default-lists/51de15f0e68f775df988347a643812131b19f2cf/assets/PPW.png"
    },
    {
      "chainId": 19,
      "name": "NishiCoin",
      "symbol": "NISHI",
      "decimals": 18,
      "address": "0xCa80B7557aDbc98426C0B921f8d80c3A5c20729F",
      "logoURI": "https://raw.githubusercontent.com/blazeswap/default-lists/d4e518879dfe3893729368b650a641186c4abafb/assets/NISHI.png"
    },
    {
      "chainId": 14,
      "name": "PiCO Coin",
      "symbol": "PiCO",
      "decimals": 18,
      "address": "0x5Ef135F575d215AE5A09E7B30885E866db138aF6",
      "logoURI": "https://raw.githubusercontent.com/blazeswap/default-lists/9d0721c92ec60a46341f93b3ae27a3d32e441b9c/assets/PICO.png"
    }
  ]
}
```

---

## Technical Requirements for Serving

Your token list must be hosted on a web server that meets the following requirements:

### CORS (Cross-Origin Resource Sharing)

The server must have CORS enabled to allow the browser to fetch the token list. This means the server must include the following header in its response:

```
Access-Control-Allow-Origin: *
```

Or specifically allow the BlazeSwap default origin:

```
Access-Control-Allow-Origin: https://app.blazeswap.xyz
```

### Content-Type

The server must return the correct Content-Type header:

```
Content-Type: application/json
```

---

## How to Import

### Method 1: Token List UI

1. Navigate to the "Preferences" section, then "My tokens" tab
2. Click on the "Add list" button
3. Enter the URL of your token list
4. Confirm the import

### Preview and Confirmation

When importing a custom token list, BlazeSwap will show a preview dialog that displays:

- The number of tokens in the list
- Token details (name, symbol, network)
- Any validation warnings or errors

Review this information carefully before confirming the import. Invalid tokens will be filtered out automatically.

### Method 2: URL Query Parameter

To simplify adding a token list by 3rd party projects, BlazeSwap allows to create custom URLs that
automatically ask for permission to import the list, by simply appending the `tokenList` query parameter
to the BlazeSwap URL:

```
https://app.blazeswap.com/swap/?tokenList=https%3A%2F%2Fexample.com%2Ftokenlist.json
```

**Steps:**
1. Encode your token list URL using URL encoding
2. Append `?tokenList=` followed by the encoded URL to the BlazeSwap base URL
3. Open the URL in your browser

Example:
```
https://app.blazeswap.com/swap/?tokenList=https%3A%2F%2Fraw.githubusercontent.com%2Fyour-repo%2Fmain%2Ftokens.json
```

By adding also the `outputCurrency=0x<address>` query param you can further simplify the purchase of a new token.

---

## Hosting Recommendations

Here are some recommended platforms for hosting your custom token list:

### GitHub Gist

1. Create a new Gist at [gist.github.com](https://gist.github.com)
2. Paste your token list JSON
3. Copy the "Raw" URL of the Gist file
4. Use that URL in BlazeSwap

**Example URL:**
```
https://gist.githubusercontent.com/username/gist-id/raw/tokenlist.json
```

### GitHub Raw

1. Create a repository with your token list JSON file
2. Navigate to the file in GitHub
3. Click "Raw" to get the raw content URL

**Example URL:**
```
https://raw.githubusercontent.com/username/repo/main/tokenlist.json
```

### IPFS

Upload your token list to IPFS for decentralized hosting:

1. Use a tool like Pinata or Fleek to upload
2. Get the IPFS CID
3. Use an IPFS gateway URL

**Example URL:**
```
https://ipfs.io/ipfs/QmYourCIDHere/tokenlist.json
```

### Static HTTPS Server

Any static web server with HTTPS and CORS enabled will work:

- Netlify
- Vercel
- Cloudflare Pages
- Self-hosted with proper CORS configuration

---

## Inclusion in default list

Before asking for the inclusion in the default list you should use the custom list approach described above and get
a significant liquidity and transaction volume on BlazeSwap. After doing that, if you still want a token to be listed,
you can open an issue with:

- The token's website
- The token's contract address on the chain you want to be added
- The token smart contract shall be verified on the blockchain explorer
- The smart contract shall not allow the minting of an arbitrary amount of tokens (either the minting rules are coded in the smart contract, or the minting permission has been released)
- Providing a logo (svg or transparent webp/png)
  - The logo's shape is enclosed in a circle 
  - The logo must be 500px * 500px
  - The logo must have 8px padding

We will merge only if all above requirements are approved.

Providing all the above requirements does not guarantee the inclusion.

We will not sponsor in any way any kind of token.

You should use the PR template

---

## Support

For additional help or questions about custom token lists, please refer to the Discord server.
