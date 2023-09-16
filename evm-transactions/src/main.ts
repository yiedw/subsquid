import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor} from './processor'
import {Address} from './model'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    for (let i of ctx.blocks) {
        for (let tx of i.transactions) {
            if (tx.value.toString() != '0') {
                await ctx.store.upsert(new Address({
                    id: tx.from
                }))
            }
        }
    }


})
