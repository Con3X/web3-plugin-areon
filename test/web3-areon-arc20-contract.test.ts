import { Web3 } from 'web3';
import { AreonPlugin } from '../src';

describe('test Contracts at web3.areon.contracts', () => {
  let web3: Web3;

  beforeAll(async () => {
    web3 = new Web3('https://testnet-rpc.areon.network');
    web3.registerPlugin(new AreonPlugin());
  });

  afterAll(() => {});

  it('can call ARC20 contract methods', async () => {
    const devTokenContract = await web3.areon.Contracts.ARC20('0x811abcac79de50cdf432462282e8c16eb4aca70d');
    const balance = await devTokenContract.methods.balanceOf('0xccd517c6f596512b7290040f58a6ddb492da7a9f').call();
    expect(balance).toBeDefined();
    expect(typeof balance).toBe('bigint');
    // console.log('balance: ', balance);
  });
});
