import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { CreateUserService } from '../services/create-user.service';
import { FindAllUsersService } from '../services/find-all-users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsers: FindAllUsersService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.createUserService.execute(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.findAllUsers.execute();
  }

  //
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }
  //
  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }
  //
  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
