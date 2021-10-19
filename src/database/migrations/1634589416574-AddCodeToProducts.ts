import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCodeToProducts1634589416576 implements MigrationInterface {
  private column = new TableColumn({
    name: 'code',
    type: 'int',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', this.column);
  }
}
