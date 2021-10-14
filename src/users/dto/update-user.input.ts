import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUniqueEmailValidator } from './validators/is-unique-email.validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'O nome deve possuir ao menos $constraint1 caracteres.',
  })
  readonly name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUniqueEmailValidator)
  readonly email: string;
}
