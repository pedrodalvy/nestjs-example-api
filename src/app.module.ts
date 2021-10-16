import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as ormConfig from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/app.module';
import { AuthModule } from './auth/auth.module';

const modules = [UsersModule, ProductsModule, AuthModule];

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
