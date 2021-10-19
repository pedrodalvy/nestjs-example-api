import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@InputType()
export class OrdemBancariaSpfInput {
  @Field()
  @IsNumber()
  unidadeGestoraCodigo!: number;

  @Field()
  @IsNumber()
  exercicio!: number;

  @Field({ nullable: true })
  @IsString()
  numeroEmpenho?: string;

  @Field({ nullable: true })
  @IsString()
  numeroEmpenhoOriginal?: string;

  @Field({ nullable: true })
  @IsString()
  fonteRecurso?: string;

  @Field({ nullable: true })
  @IsDateString()
  dataInicial?: string;

  @Field({ nullable: true })
  @IsDateString()
  dataFinal?: string;
}
