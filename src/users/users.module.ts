import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { IsUniqueEmailValidator } from './dto/validators/is-unique-email.validator';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUsersService } from './services/find-all-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    UsersResolver,
    CreateUserService,
    FindAllUsersService,
    IsUniqueEmailValidator,
  ],
})
export class UsersModule {}
