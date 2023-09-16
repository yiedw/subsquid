import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'

const ACCOUNT_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
    })
    .setFinalityConfirmation(75)
    .setBlockRange({
        from: 17682419,
        to: 17876101
    })
    .addTransaction({
        to: ["0xE592427A0Aece92De3Edee1F18E0157C05861564"],
    })
    .setFields({
        transaction:{
            from:true,
            value:true,
            hash:true,
            input:true
        }
    })
