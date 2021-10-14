import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserService } from './services/create-user.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.createUserService.execute(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return 'necessário ao menos um tipo @Query';
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
