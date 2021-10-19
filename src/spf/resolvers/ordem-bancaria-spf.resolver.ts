import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdemBancariaSpfService } from '../services/ordem-bancaria-spf.service';
import { OrdemBancariaSpfInput } from '../dto/ordem-bancaria-spf.input';
import { OrdemBancariaDto } from '../dto/ordem-bancaria.dto';

@Resolver(() => OrdemBancariaDto)
export class OrdemBancariaSpfResolver {
  constructor(private readonly service: OrdemBancariaSpfService) {}

  @Query(() => [OrdemBancariaDto], { name: 'buscarOB' })
  async buscarOB(
    @Args('ordemBancariaInput') input: OrdemBancariaSpfInput,
  ): Promise<OrdemBancariaDto[]> {
    return await this.service.buscarOrdemBancaria(input);
  }
}
