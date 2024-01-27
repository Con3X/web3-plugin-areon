import { Web3, Web3PluginBase } from 'web3';

import { AddressConverter } from './address-converter';
import { Contracts } from './contracts';

export class AreonPlugin extends Web3PluginBase {
  public pluginNamespace = 'areon';

  AddressConverter = AddressConverter;

  Contracts = new Contracts(this);

  constructor() {
    super();
  }

  /**
   * Register the plugin with web3 and return the web3 instance.
   * @note There would be some work to refactor and enhance the typescript types for `registerAt`. Or possibly refactor web3.registerPlugin for the matter.
   * @param web3
   * @returns web3 instance with the plugin registered
   */
  public registerAt(web3: Web3): Web3 & { areon: AreonPlugin } {
    web3.registerPlugin(this);
    return web3 as Web3 & { areon: AreonPlugin };
  }
}

// Using Module Augmentation seems a bit hacky. Revisit this in the future and possibly use generics instead.
declare module 'web3' {
  interface Web3 {
    areon: {
      AddressConverter: typeof AddressConverter;
      Contracts: Contracts;
    };
  }
}
