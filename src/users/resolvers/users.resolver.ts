import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { CreateUserService } from '../services/create-user.service';
import { FindAllUsersService } from '../services/find-all-users.service';
import { FindOneUserService } from '../services/find-one-user.service';
import { UpdateUserInput } from '../dto/update-user.input';
import { UpdateUserService } from '../services/update-user.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findOneUserService: FindOneUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.createUserService.execute(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.findAllUsersService.execute();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.findOneUserService.execute({ id });
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.updateUserService.execute(updateUserInput);
  }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
