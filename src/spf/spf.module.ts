import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdemBancariaSpfService } from './services/ordem-bancaria-spf.service';
import { OrdemBancariaSpfResolver } from './resolvers/ordem-bancaria-spf.resolver';
import { AuthSpfService } from './services/auth-spf.service';

@Module({
  imports: [HttpModule],
  providers: [
    OrdemBancariaSpfResolver,
    OrdemBancariaSpfService,
    AuthSpfService,
  ],
})
export class SpfModule {}
