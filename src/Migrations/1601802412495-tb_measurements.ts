import {MigrationInterface, QueryRunner} from "typeorm";

export class tbMeasurements1601802412495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tb_measurements" (
                "id" VARCHAR DEFAULT uuid_in(md5(random()::text || clock_timestamp()::text)::cstring) PRIMARY KEY,
                "timestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
                "origin" VARCHAR(50) NOT NULL,
                "url" VARCHAR(256) NOT NULL,
                "domLoad" FLOAT NOT NULL,
                "firstContentfulPaint" FLOAT NOT NULL,
                "timeToFirstByte" FLOAT NOT NULL,
                "windowLoad" FLOAT NOT NULL,
                "resourceLoads" JSONB NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tb_measurements";
        `);
    }
}
