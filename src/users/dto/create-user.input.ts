import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUniqueEmailValidator } from './validators/is-unique-email.validator';

@InputType()
export class CreateUserInput {
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

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'O password deve possuir ao menos $constraint1 caracteres',
  })
  readonly password: string;
}
