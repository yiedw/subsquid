import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as erc721 from './abi/erc721'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
    })
    .setBlockRange({
        from: 17682419
    })
    .addTrace({
        type: ['create'],
        transaction: true,
    })
    .addLog({
        topic0: [erc721.events.Transfer.topic],
    })
    .setFields({
        trace: {
            createResultCode: true, // for checking ERC721 compliance
            createResultAddress: true,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
