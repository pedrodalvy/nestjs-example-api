import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as ormConfig from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/app.module';

const modules = [UsersModule, ProductsModule];

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.qgl',
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
