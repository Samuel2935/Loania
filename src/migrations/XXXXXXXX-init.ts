import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1234567890 implements MigrationInterface {
  name = 'Init1234567890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "loan" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "status" character varying NOT NULL,
        "due_date" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_loan_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "loan"`);
  }
}
