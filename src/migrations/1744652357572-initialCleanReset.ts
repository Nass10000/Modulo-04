import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCleanReset1744652357572 implements MigrationInterface {
    name = 'InitialCleanReset1744652357572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    }

}
