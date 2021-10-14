import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { IsUniqueEmailValidator } from './dto/validators/is-unique-email.validator';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUsersService } from './services/find-all-users.service';
import { FindOneUserService } from './services/find-one-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

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
