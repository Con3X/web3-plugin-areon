import { Web3Context, Contract } from 'web3';

import { ARC20Abi, ARC20Bytecode } from './artifacts/ARC20';
import { ARC721Abi, ARC721Bytecode } from './artifacts/ARC721';

export class Contracts {
  constructor(private web3Context: Web3Context) {}

  public ARC20(address: string): Contract<typeof ARC20Abi> {
    const erc20Contract = new Contract(ARC20Abi, address, {
      data: ARC20Bytecode,
    });
    erc20Contract.link(this.web3Context);
    return erc20Contract;
  }

  ARC721(address: string): Contract<typeof ARC721Abi> {
    const erc721Contract = new Contract(ARC721Abi, address, {
      data: ARC721Bytecode,
    });
    erc721Contract.link(this.web3Context);
    return erc721Contract;
  }
}

// export const Contracts = (web3Context: Web3Context) => ({
//   ARC20(address: string): Contract<typeof ARC20Abi> {
//     const erc20Contract = new Contract(ARC20Abi, address, {
//       data: ARC20Bytecode,
//     });
//     erc20Contract.link(web3Context);
//     return erc20Contract;
//   },

//   ARC721(address: string): Contract<typeof ARC721Abi> {
//     const erc721Contract = new Contract(ARC721Abi, address, {
//       data: ARC721Bytecode,
//     });
//     erc721Contract.link(web3Context);
//     return erc721Contract;
//   },
// });
