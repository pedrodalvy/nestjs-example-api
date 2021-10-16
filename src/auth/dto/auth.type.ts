import { User } from '../../users/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
