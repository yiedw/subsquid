module.exports = class Data1694504353711 {
    name = 'Data1694504353711'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_38414873c187a3e0c7943bc4c7" ON "block" ("number") `)
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block_number" integer, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "hash" text NOT NULL, "to" text, "from" text, "status" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2d99bb5a0ab5fb8cf8b746eb39" ON "transaction" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_bf7f889412fc52430b609e70b4" ON "transaction" ("block_timestamp") `)
        await db.query(`CREATE INDEX "IDX_de4f0899c41c688529784bc443" ON "transaction" ("hash") `)
        await db.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `)
        await db.query(`CREATE INDEX "IDX_290df3897fac99713afb5f3d7a" ON "transaction" ("from") `)
        await db.query(`CREATE INDEX "IDX_63f749fc7f7178ae1ad85d3b95" ON "transaction" ("status") `)
        await db.query(`CREATE TABLE "aave_v2_pool_event_upgraded" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "contract" text NOT NULL, "event_name" text NOT NULL, "implementation" text NOT NULL, CONSTRAINT "PK_4d911de2a0010b69130d40111e7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bddf97e6b4af568d30b65770a1" ON "aave_v2_pool_event_upgraded" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_52ccefc61b786d70dbc39c8708" ON "aave_v2_pool_event_upgraded" ("block_timestamp") `)
        await db.query(`CREATE INDEX "IDX_f18525ff711bcc34e9c57ddee2" ON "aave_v2_pool_event_upgraded" ("transaction_hash") `)
        await db.query(`CREATE INDEX "IDX_6cb3e69e7ce861ca69af1f19e8" ON "aave_v2_pool_event_upgraded" ("contract") `)
        await db.query(`CREATE INDEX "IDX_1b6766d5645e522e5727351af4" ON "aave_v2_pool_event_upgraded" ("event_name") `)
        await db.query(`CREATE INDEX "IDX_59f0afebf59e78b74cf3091c16" ON "aave_v2_pool_event_upgraded" ("implementation") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_38414873c187a3e0c7943bc4c7"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`DROP TABLE "transaction"`)
        await db.query(`DROP INDEX "public"."IDX_2d99bb5a0ab5fb8cf8b746eb39"`)
        await db.query(`DROP INDEX "public"."IDX_bf7f889412fc52430b609e70b4"`)
        await db.query(`DROP INDEX "public"."IDX_de4f0899c41c688529784bc443"`)
        await db.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`)
        await db.query(`DROP INDEX "public"."IDX_290df3897fac99713afb5f3d7a"`)
        await db.query(`DROP INDEX "public"."IDX_63f749fc7f7178ae1ad85d3b95"`)
        await db.query(`DROP TABLE "aave_v2_pool_event_upgraded"`)
        await db.query(`DROP INDEX "public"."IDX_bddf97e6b4af568d30b65770a1"`)
        await db.query(`DROP INDEX "public"."IDX_52ccefc61b786d70dbc39c8708"`)
        await db.query(`DROP INDEX "public"."IDX_f18525ff711bcc34e9c57ddee2"`)
        await db.query(`DROP INDEX "public"."IDX_6cb3e69e7ce861ca69af1f19e8"`)
        await db.query(`DROP INDEX "public"."IDX_1b6766d5645e522e5727351af4"`)
        await db.query(`DROP INDEX "public"."IDX_59f0afebf59e78b74cf3091c16"`)
    }
}
