import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { DeepPartial, DeleteOneOptions } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService } from '../../inventory/services/inventory.service';

@Injectable()
export class ProductsService extends TypeOrmQueryService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    private readonly inventoryService: InventoryService,
  ) {
    super(repo);
  }

  async createOne(record: DeepPartial<Product>): Promise<Product> {
    const product = await super.createOne(record);

    await this.inventoryService.incrementQuantity(product);

    return product;
  }

  async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<Product>,
  ): Promise<Product> {
    const product = await this.repo.findOne(id);

    await this.inventoryService.decrementQuantity(product);

    return super.deleteOne(id, opts);
  }
}
