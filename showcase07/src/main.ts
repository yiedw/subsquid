import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Contract, Transfer} from './model'
import {processor} from './processor'
import {isErc721} from './isErc721'
import * as erc721 from './abi/erc721'
import {Database} from '@subsquid/file-store'
import {Column, Table, Types} from '@subsquid/file-store-parquet'

const dbOptions = {
    tables: {
        ContractsTable: new Table("contracts.parquet", {
                block_number: Column(Types.Uint64()),
                create_index: Column(Types.Uint64()),
                kind: Column(Types.Uint8()),
                transaction_hash: Column(Types.Binary()),
                contract_address: Column(Types.Binary()),
                deployer: Column(Types.Binary()),
                factory: Column(Types.Binary()),
                init_code: Column(Types.Binary()),
                code: Column(Types.Binary()),
                init_code_hash: Column(Types.Binary()),
                code_hash: Column(Types.Binary())
            },
            {
                compression: "GZIP",
                rowGroupSize: 300000,
                pageSize: 1000
            }
        ),
    }
}


// @ts-ignore
// processor.run(new Database(dbOptions), async (ctx) => {
//     for (let block of ctx.blocks) {
//         let index = 0
//         for (let trc of block.traces) {
//             if (trc.type == "create" && trc.result?.code) {
//                 // is erc21 contract check
//                 if(!trc.transaction){
//                     ctx.log.fatal('ERROR : trace came without a parent transaction')
//                     console.log(trc)
//                     process.exit(1)
//                 }
//             }
//             let {block_number} = block.traces.
//             let {transaction_hash}: any = trc.transaction?.hash
//             ctx.store.ContractsTable.write({
//                 block_number,
//                 create_index,
//                 kind,
//                 transaction_hash,
//                 contract_address,
//                 deployer,
//                 factory,
//                 init_code,
//                 code,
//                 init_code_hash,
//                 code_hash
//             })
//         }
//     }
// })
