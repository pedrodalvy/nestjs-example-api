import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as ormConfig from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { SpfModule } from './spf/spf.module';

const modules = [
  UsersModule,
  ProductsModule,
  AuthModule,
  InventoryModule,
  SpfModule,
];

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.qgl',
      playground: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
