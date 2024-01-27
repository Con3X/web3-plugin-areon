import { AddressConverter, AreonPlugin } from '../src';

describe('Test Areon Address Conversion', () => {
  it('should throw if Ethereum Address is invalid', async () => {
    const address = async () => {
      return AddressConverter.ethToAreon('0x123456f6ed06f81eb1edc6fcce34414e2c21fe5C');
    };
    await expect(address).rejects.toThrow('Invalid address checksum');
  });

  it('should throw if Areon Address is invalid', async () => {
    const address = async () => {
      return AddressConverter.areonToEth('areonvaloper1k6ews5uuxh9x3r4q663h2pdqatc9lxstm8w9c3');
    };
    await expect(address).rejects.toThrow('Unrecognized address format');
  });

  it('should convert Ethereum Address to Areon Address', async () => {
    const address = await AddressConverter.ethToAreon('0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c');
    expect(address).toBeDefined();
    expect(typeof address).toBe('string');
    expect(address).toBe('areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt');
  });

  it('should convert Areon Account Address to Ethereum Address', async () => {
    const address = await AddressConverter.areonToEth('areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt');
    expect(address).toBeDefined();
    expect(typeof address).toBe('string');
    expect(address).toBe('0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c');
  });

  it('should convert Areon Validator Address to Ethereum Address', async () => {
    const address = await AddressConverter.validatorToEth('areonvaloper1k6ews5uuxh9x3r4q663h2pdqatc9lxstm8w9c3');
    expect(address).toBeDefined();
    expect(typeof address).toBe('string');
    expect(address).toBe('0xb6B2E8539C35CA688Ea0D6a37505A0EAf05f9A0B');
  });

  it('AddressConverter is the same class accessed from a plugin instance', async () => {
    expect(await new AreonPlugin().AddressConverter).toBe(AddressConverter);
  });
});
