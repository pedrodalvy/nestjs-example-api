import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
} from '../services';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Roles } from '../../common/role/roles.decorator';
import { Role } from '../../common/role/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';

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

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
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

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.findOneUserService.execute({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.updateUserService.execute(updateUserInput);
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.deleteUserService.execute({ id });
  }

  @Subscription(() => User)
  async userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
