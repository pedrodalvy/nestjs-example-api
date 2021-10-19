import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  public async findOrCreateByProductCode(
    productCode: number,
  ): Promise<Inventory> {
    let inventory = await this.findOne({ where: { productCode } });

    if (!inventory) {
      inventory = this.create({ productCode, quantity: 0 });
    }

    return inventory;
  }
}
