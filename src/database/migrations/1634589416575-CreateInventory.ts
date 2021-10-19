import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInventory1634589416575 implements MigrationInterface {
  private table = new Table({
    name: 'inventory',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'product_code',
        type: 'int',
      },
      {
        name: 'quantity',
        type: 'int',
        default: 0,
      },
      {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamp with time zone',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
