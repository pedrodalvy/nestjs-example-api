import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'O password deve possuir ao menos $constraint1 caracteres',
  })
  readonly password: string;
}
