# web3-plugin-areon

A web3.js plugin for Areon Network. It provides easy way to create and interact with ARC20 & ARC721 Contracts. In addition to utility methods for Areon Address conversion from and to Ethereum Address format.


> npm package: https://www.npmjs.com/package/@con3x/web3-plugin-areon/
> 
> Playground: https://github.com/con3x/web3-plugin-areon-playground
> 
> Project website: www.web3areon.com

## Introduction
As web3.js v4.x supports plugins, this library utilizes that to build a plugin for Areon Network. This plugin allows users to execute calls like `AddressConverter.ethToAreon('...')` & `AddressConverter.areonToEth('...')` and `web3.areon.Contracts.ARC20().deploy(...).send(...)` & `web3.areon.Contracts.ARC721('0x...').methods.balanceOf('0x...')`.

## Features


This package utilizes IntelliSense, in order to provide the developers with the best development experience possible. So, they can use code auto-complete and hover over a method to see the method parameters and return type, and they can get a compiler error when messing up with a method name or its parameters, or when wrongly assigning its return type.

### Address Conversion

This plugin ease conversion between Ethereum and Areon as an alternative to https://github.com/Areon-Network/address-converter/. However, this plugin provide type-safety as it is written in TypeScript. In addition to providing all the necessary tools in on place.

It is good to know that, Areon uses `bech32` that is prefixed with `areon` for normal accounts and `areonvaloper` for validators account. While Ethereum uses addresses according to EIP-55. More on this is available at: https://docs.areon.network/concepts/accounts.


```ts

// The same functions below are accessible also with `new AreonPlugin().AddressConverter...`
// And, if you registered the plugin, you can access them with web3.areon.AddressConverter...
// However, it is simpler to call them as follow:

import { AddressConverter } from 'web3-plugin-areon';

const areonAddress = AddressConverter.ethToAreon(
  '0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c'
);

const ethAddress = AddressConverter.areonToEth(
  'areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt'
);

const validatorEthAddress = AddressConverter.validatorToEth(
  'areonvaloper1k6ews5uuxh9x3r4q663h2pdqatc9lxstm8w9c3'
);
```


### ARC Contracts

Generally speaking each ARC is a proposal document providing information to the AREON ecosystem and community. And there are
currently ARC-20 for Tokens, and ARC-721 for NFTs, which you can find here: https://github.com/Areon-Network/ARCs/

This plugin provides easy access to contracts following the ARC-20 and ARC-721 and would continue to provide support for other ARCs added to https://github.com/Areon-Network/ARCs/ whether they are for tokens or any others.

Because ARC-20 and ARC-721 are Smart Contracts, and because this is would not be necessarily the case other ARCs, they are organized under `web3.areon.Contracts.ARC20` and `web3.areon.Contracts.ARC721`. This is also to remind you that those are just normal web3.js contracts that you can interact with the same way you would do with any other smart contract. Except that, this plugin make the contracts objects ready for you. And, without this plugin you would need to generate the ABI and the ByteCode as in this tutorial: https://docs.web3js.org/guides/smart_contracts/smart_contracts_guide. 

#### ex. Getting the Balance of an ARC-20 Token Holder and number of NFTs Owned

To check things quickly, clone this repo, go to the `test` folder, update or keep the code, and then run `yarn && yarn test` in the terminal.

Or import and use the plugin package inside your TypeScript project following these steps:

1. In your TypeScript project run:
`yarn add web3 @con3x/web3-plugin-areon`

2. After that, use something like the following code to call the RPC methods:

```typescript
import { Web3 } from 'web3';
import { AreonPlugin } from '@con3x/web3-plugin-areon';

async function main() {
  const web3 = new Web3('https://testnet-rpc.areon.network');
  web3.registerPlugin(new AreonPlugin());
  
  // to get the token balance of an account:
  const devTokenContract = await web3.areon.Contracts.ARC20(
    '0xb8082fa72bd534eb0fa124a0ea8fb9824356fd74'
  );
  const arc20balance = await devTokenContract.methods
    .balanceOf('0x6e994beb7015e68db2ce06fffe365e489f90b64d')
    .call();
  console.log(
    'The balance of devToken at test net for 0xccd517c6f596512b7290040f58a6ddb492da7a9f, is:',
    Web3.utils.fromWei(arc20balance, 'ether')
  );

  // to get the number of nft owned by an account:
  const numberOfNftOwned = await web3.areon.Contracts.ARC721(
    '0x811abcac79de50cdf432462282e8c16eb4aca70d'
  );
  const nftNumber = await numberOfNftOwned.methods
    .balanceOf('0xccd517c6f596512b7290040f58a6ddb492da7a9f')
    .call();
  console.log(
    'The number of AreonTestnetNft owned by 0xccd517c6f596512b7290040f58a6ddb492da7a9f, is:',
    nftNumber
  );
  
}
main();
```

## Running the tests


After cloning the repository locally and installing the dependencies, you can run the tests with:
  `yarn test` or if you want to see the coverage report: `yarn test-coverage` 

And you should see something like:

```js
PASS  test/areon-plugin.test.ts
  AreonPlugin Tests
    ✓ should be able to register the plugin with `web3.registerPlugin(new AreonPlugin())` (19 ms)
    ✓ should be able to register the plugin with `new AreonPlugin().registerAt(web3)` (6 ms)

PASS  test/web3-areon-address-converter.test.ts
  Test Areon Address Conversion
    ✓ should throw if Ethereum Address is invalid (11 ms)
    ✓ should throw if Areon Address is invalid (1 ms)
    ✓ should convert Ethereum Address to Areon Address (1 ms)
    ✓ should convert Areon Account Address to Ethereum Address (1 ms)
    ✓ should convert Areon Validator Address to Ethereum Address (1 ms)

PASS  test/web3-areon-arc20-contract.test.ts
  test Contracts at web3.areon.contracts
    ✓ can call ARC20 contract methods (303 ms)

PASS  test/web3-areon-arc721-contract.test.ts
  test Contracts at web3.areon.contracts
    ✓ can call ARC721 contract methods (263 ms)

-----------------------|---------|----------|---------|---------|-------------------
| File                    | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ----------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files               | 100       | 100        | 100       | 100       |
| src                     | 100       | 100        | 100       | 100       |
| address-converter.ts    | 100       | 100        | 100       | 100       |
| areon-plugin.ts         | 100       | 100        | 100       | 100       |
| contracts.ts            | 100       | 100        | 100       | 100       |
| index.ts                | 100       | 100        | 100       | 100       |
| src/artifacts           | 100       | 100        | 100       | 100       |
| ARC20.ts                | 100       | 100        | 100       | 100       |
| ARC721.ts               | 100       | 100        | 100       | 100       |
| ----------------------- | --------- | ---------- | --------- | --------- | ------------------- |
Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total

```


### Future Plan
Continue to support the Areon Developers by providing easy access to every ARC added in the future to https://github.com/Areon-Network/ARCs/.


## License
This project is open-sourced under the [MIT License](https://choosealicense.com/licenses/mit/).
