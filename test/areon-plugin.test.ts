import { Web3 } from 'web3';
import { AreonPlugin } from '../src';

describe('AreonPlugin Tests', () => {
  it('should be able to register the plugin with `web3.registerPlugin(new AreonPlugin())`', () => {
    const web3 = new Web3('http://some-rpc-provider.com');
    expect(web3.areon).toBeUndefined();
    web3.registerPlugin(new AreonPlugin());
    expect(web3.areon).toBeDefined();
  });

  it('should be able to register the plugin with `new AreonPlugin().registerAt(web3)`', () => {
    let web3 = new Web3('http://some-rpc-provider.com');
    expect(web3.areon).toBeUndefined();
    web3 = new AreonPlugin().registerAt(web3);
    expect(web3.areon).toBeDefined();
  });
});
