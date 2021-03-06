import { Injectable } from '@nestjs/common';
import { InventoryRepository } from '../repository/inventory.repository';
import { Product } from '../../products/entities/product.entity';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  public async incrementQuantity({ code }: Product): Promise<Inventory> {
    const inventory = await this.repository.findOrCreateByProductCode(code);
    ++inventory.quantity;

    return this.repository.save(inventory);
  }

  public async decrementQuantity({ code }: any): Promise<void> {
    const inventory = await this.repository.findByProductCode(code);

    if (inventory) {
      --inventory.quantity;
      await this.repository.save(inventory);
    }
  }
}
