import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import {
  CreateUserService,
  FindAllUsersService,
  DeleteUserService,
  FindOneUserService,
  UpdateUserService,
} from '../services';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findOneUserService: FindOneUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.createUserService.execute(createUserInput);

    await pubSub.publish('userAdded', { userAdded: user });

    return user;
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

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.deleteUserService.execute({ id });
  }

  @Subscription(() => User)
  async userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
