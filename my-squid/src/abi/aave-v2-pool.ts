import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './aave-v2-pool.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Upgraded: new LogEvent<([implementation: string] & {implementation: string})>(
        abi, '0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b'
    ),
}

export const functions = {
    admin: new Func<[], {}, string>(
        abi, '0xf851a440'
    ),
    implementation: new Func<[], {}, string>(
        abi, '0x5c60da1b'
    ),
    initialize: new Func<[_logic: string, _data: string], {_logic: string, _data: string}, []>(
        abi, '0xd1f57894'
    ),
    upgradeTo: new Func<[newImplementation: string], {newImplementation: string}, []>(
        abi, '0x3659cfe6'
    ),
    upgradeToAndCall: new Func<[newImplementation: string, data: string], {newImplementation: string, data: string}, []>(
        abi, '0x4f1ef286'
    ),
}

export class Contract extends ContractBase {
}
