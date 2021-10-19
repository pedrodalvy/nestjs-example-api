import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Min(0)
  qtd?: number;

  @Field(() => Int, { nullable: true })
  code?: number;
}
