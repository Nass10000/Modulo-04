import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminColumn1744656686085 implements MigrationInterface {
    name = 'AddAdminColumn1744656686085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "admin" TO "isAdmin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "admin"`);
    }

}
