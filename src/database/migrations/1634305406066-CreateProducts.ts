import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1634305406066 implements MigrationInterface {
  private table = new Table({
    name: 'products',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'qtd',
        type: 'int',
        isNullable: false,
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
      {
        name: 'deleted_at',
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
