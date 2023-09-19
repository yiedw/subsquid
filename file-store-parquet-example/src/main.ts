import {Database, LocalDest} from "@subsquid/file-store";
import * as erc20abi from "./abi/erc20";
import {processor} from './processor'
import {Column, Table, Types} from "@subsquid/file-store-parquet";

const dbOptions = {
    tables: {
        TransfersTable: new Table(
            'transfers.parquet',
            {
                from: Column(
                    Types.String(),
                    {
                        compression: 'UNCOMPRESSED'
                    }
                ),
                to: Column(Types.String()),
                value: Column(Types.Uint64())
            },
            {
                compression: 'GZIP',
                rowGroupSize: 300000,
                pageSize: 1000
            }
        )
    },
    dest: new LocalDest('./data'),
    chunkSizeMb: 10,
    // Explicitly keeping the default value of syncIntervalBlocks (infinity).
    // Make sure to use a finite value here if your output data rate is low!
    syncIntervalBlocks: undefined
}


processor.run(new Database(dbOptions), async (ctx) => {
    for (let c of ctx.blocks) {
        for (let i of c.items) {
            if (i.kind==='evmLog') {
                let { from, to, value } = erc20abi.events.Transfer.decode(i.evmLog)
                ctx.store.TransfersTable.write({ from, to, value: value.toBigInt() })
            }
        }
    }
});
