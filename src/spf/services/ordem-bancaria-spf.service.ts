import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { OrdemBancariaSpfInput } from '../dto/ordem-bancaria-spf.input';
import { spfConfig } from '../../config/spfconfig';
import { AuthSpfService } from './auth-spf.service';
import { OrdemBancariaDto } from '../dto/ordem-bancaria.dto';

@Injectable()
export class OrdemBancariaSpfService {
  constructor(
    private httpService: HttpService,
    private authSpfService: AuthSpfService,
  ) {}

  public async buscarOrdemBancaria(
    requestData: OrdemBancariaSpfInput,
  ): Promise<OrdemBancariaDto[]> {
    const uri = 'documento/Empenhos';

    const token = await this.authSpfService.getToken();

    const response = await lastValueFrom(
      this.httpService.get(uri, {
        baseURL: spfConfig.baseURL,
        params: { ...requestData, token },
      }),
    );

    const responseData = await response.data;
    return <OrdemBancariaDto[]>responseData.data;
  }
}
