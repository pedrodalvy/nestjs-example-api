import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUserService } from '../services/auth-user.service';
import { AuthInput } from '../dto/auth.input';
import { AuthType } from '../dto/auth.type';
import { JwtGeneratorService } from '../services/jwt-generator.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly jwtGeneratorService: JwtGeneratorService,
  ) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const user = await this.authUserService.execute(data);

    return await this.jwtGeneratorService.execute(user);
  }
}
