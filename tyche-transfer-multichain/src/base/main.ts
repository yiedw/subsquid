import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Transfer} from '../model'
import * as erc20abi from '../abi/erc20'
import {processor} from './processor'
import * as erc721 from '../abi/erc721'
import {isErc721} from "../isErc721";

processor.run(new TypeormDatabase({supportHotBlocks: false, stateSchema: 'eth_processor'}), async (ctx) => {

    // const newNftContracts: Map<string, Contract> = new Map()

    const transfers: Transfer[] = []
    for(let block of ctx.blocks){
        for (let log of block.logs){
            if(log.topics[0]===erc721.events.Transfer.topic){
                let {from, to, tokenId} = erc721.events.Transfer.decode(log)
                transfers.push(new Transfer({
                    id:log.id,
                    network:"BASE",
                    block:log.block.height,
                    timestamp:new Date(block.header.timestamp),
                    from:from,
                    to:to,
                    tokenId:tokenId,
                    tx:log.transactionHash
                }))
            }
        }
    }

    // for (let block of ctx.blocks) {
    //     for (let trc of block.traces) {
    //         if (trc.type == "create" && trc.result?.code && isErc721(trc.result.code)) {
    //             if (!trc.transaction) {
    //                 ctx.log.fatal(`ERROR: trace came without a parent transaction`)
    //                 console.log(trc)
    //                 process.exit(1)
    //             }
    //             let address = trc.result.address
    //             ctx.log.info(`Detected an NFT contract deployment at ${address}`)
    //             newNftContracts.set(address, new Contract({
    //                 id: address,
    //                 creator:trc.transaction.from,
    //             }))
    //         }
    //     }
    // }
    // await ctx.store.upsert([...newNftContracts.values()])
    // console.log(transfers)
    await ctx.store.upsert(transfers)
})
