import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  @Min(0)
  qtd!: number;
}
