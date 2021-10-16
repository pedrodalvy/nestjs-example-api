import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Product])],
      resolvers: [
        {
          EntityClass: Product,
          DTOClass: Product,
          CreateDTOClass: CreateProductInput,
          UpdateDTOClass: UpdateProductInput,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [],
})
export class ProductsModule {}
