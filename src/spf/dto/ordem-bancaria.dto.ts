import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ListaNaturezaDespesa {
  @Field({ nullable: true })
  NaturezaDespesa: string;

  @Field({ nullable: true })
  ValorItem: number;
}

@ObjectType()
class DadosCredor {
  @Field({ nullable: true })
  CredorIdentificacao: string;

  @Field({ nullable: true })
  RazaoSocial: string;

  @Field({ nullable: true })
  Email: string;

  @Field({ nullable: true })
  Telefone: string;

  @Field({ nullable: true })
  CEP: string;

  @Field({ nullable: true })
  UF: string;

  @Field({ nullable: true })
  Municipio: string;

  @Field({ nullable: true })
  Bairro: string;

  @Field({ nullable: true })
  Logradouro: string;

  @Field({ nullable: true })
  Numero: string;

  @Field({ nullable: true })
  Complemento: string;
}

@ObjectType()
export class OrdemBancariaDto {
  @Field({ nullable: true })
  CodigoUG: number;

  @Field({ nullable: true })
  NumeroEmpenho: string;

  @Field({ nullable: true })
  NumeroEmpenhoOriginal: string;

  @Field({ nullable: true })
  DataEmissaoEmpenho: string;

  @Field({ nullable: true })
  DataContabilizacao: string;

  @Field({ nullable: true })
  ValorEmpenho: number;

  @Field({ nullable: true })
  TipoEmpenho: string;

  @Field({ nullable: true })
  ModalidadeEmpenho: string;

  @Field({ nullable: true })
  FuncionalProgramatica: string;

  @Field({ nullable: true })
  FonteRecurso: string;

  @Field({ nullable: true })
  NumeroContrato: number;

  @Field({ nullable: true })
  VersaoContrato: string;

  @Field({ nullable: true })
  CodigoEvento: string;

  @Field(() => [ListaNaturezaDespesa], { nullable: true })
  ListaNaturezaDespesa: ListaNaturezaDespesa[];

  @Field(() => DadosCredor, { nullable: true })
  DadosCredor: DadosCredor;
}
