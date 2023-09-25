import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc20'

// export const ETH_USDC_ADDRESS = '0x7EA2be2df7BA6E54B1A9C70676f668455E329d29'.toLowerCase()
export const BASE_TYCHE_ADDRESS = '0x7C638ddf68DD3cfa46a213F9AEa1de6035E6A00A'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('base-mainnet'),
//        chain: 'https://rpc.ankr.com/eth',
    })
    .addLog({
        address:[BASE_TYCHE_ADDRESS],
        topic0:[erc721abi.events.Transfer.topic],
        transaction:true
    })
    // .addTrace({
    //     type: ['create'],
    //     transaction: true,
    // })
    .setFields({
        log:{
            transactionHash:true
        }
        // trace: {
        //     createResultCode: true, // for checking ERC721 compliance
        //     createResultAddress: true,
        // },
    })
    .setBlockRange({
        from: 2_416_343 , // contract is created
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
