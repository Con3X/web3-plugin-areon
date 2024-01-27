import { bech32 } from 'bech32';
const addrCodec = require('crypto-addr-codec');

const checksummedHexDecoder = (chainId?: string) => {
  return (data: string): Buffer => {
    const stripped = (0, addrCodec.stripHexPrefix)(data);
    if (
      !(0, addrCodec.isValidChecksumAddress)(data, chainId || null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error('Invalid address checksum');
    }
    return Buffer.from((0, addrCodec.stripHexPrefix)(data), 'hex');
  };
};
const checksummedHexEncoder = (chainId?: string) => {
  return (data: Buffer): string => (0, addrCodec.toChecksumAddress)(data.toString('hex'), chainId || null);
};

const bech32Encoder = (prefix: string) => {
  return (data: Buffer): string => bech32.encode(prefix, bech32.toWords(data));
};

const makeBech32Decoder = (currentPrefix: string) => {
  return (data: string) => {
    const { prefix, words } = bech32.decode(data);
    if (prefix !== currentPrefix) {
      throw Error('Unrecognized address format');
    }
    return Buffer.from(bech32.fromWords(words));
  };
};

const hexChecksumChain = (name: string, chainId?: string) => ({
  decoder: checksummedHexDecoder(chainId),
  encoder: checksummedHexEncoder(chainId),
  name,
});

const bech32Chain = (name: string, prefix: string) => ({
  decoder: makeBech32Decoder(prefix),
  encoder: bech32Encoder(prefix),
  name,
});

const ETH = hexChecksumChain('ETH');
const AREON = bech32Chain('AREON', 'areon');

/**
 * Convert between Ethereum (EIP55HEX) and Areon addresses (Bech32).
 * For more check: https://docs.areon.network/concepts/accounts
 */
export class AddressConverter {
  /**
   * Convert Ethereum address to Areon account address.
   */
  public static ethToAreon(ethAddress: string) {
    const data = ETH.decoder(ethAddress);
    return AREON.encoder(data);
  }
  /**
   * Convert Areon account address to Ethereum address.
   */
  public static areonToEth(areonAddress: string) {
    const data = AREON.decoder(areonAddress);
    return ETH.encoder(data);
  }
  /**
   * Convert Areon Validator address to Ethereum address.
   */
  public static validatorToEth(areonValidatorAddress: string) {
    const data = bech32Chain('AREON', 'areonvaloper').decoder(areonValidatorAddress);
    return ETH.encoder(data);
  }
}
