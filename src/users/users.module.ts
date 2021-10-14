import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { IsUniqueEmailValidator } from './dto/validators/is-unique-email.validator';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserService,
  FindAllUsersService,
  DeleteUserService,
  FindOneUserService,
  UpdateUserService,
} from './services';

const services = [
  CreateUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
  DeleteUserService,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersResolver, IsUniqueEmailValidator, ...services],
})
export class UsersModule {}
