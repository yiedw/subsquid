import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {AaveV2PoolEventUpgraded} from '../model'
import * as spec from '../abi/aave-v2-pool'
import {Log, Transaction} from '../processor'

const address = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Upgraded'].topic: {
                let e = spec.events['Upgraded'].decode(log)
                EntityBuffer.add(
                    new AaveV2PoolEventUpgraded({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Upgraded',
                        implementation: e[0],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}

export function parseFunction(ctx: DataHandlerContext<Store>, transaction: Transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
