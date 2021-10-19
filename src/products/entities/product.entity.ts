import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { Inventory } from '../../inventory/entities/inventory.entity';

@ObjectType()
@Entity('products')
@Relation('inventory', () => Inventory)
export class Product {
  @IDField(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @FilterableField()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @FilterableField()
  @Column()
  qtd: number;

  @FilterableField()
  @Column()
  code: number;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Field(() => Inventory, { nullable: true })
  @ManyToOne(() => Inventory, (inventory) => inventory.products)
  @JoinColumn({ name: 'code', referencedColumnName: 'productCode' })
  inventory: Inventory;
}
