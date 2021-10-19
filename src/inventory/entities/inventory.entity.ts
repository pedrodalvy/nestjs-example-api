import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity('inventory')
export class Inventory {
  @IDField(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @FilterableField()
  @Column({ name: 'product_code' })
  productCode: number;

  @FilterableField()
  @Column()
  quantity: number;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'productCode', referencedColumnName: 'code' })
  products: Product[];
}
