import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as ormConfig from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';

const modules = [UsersModule];

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
