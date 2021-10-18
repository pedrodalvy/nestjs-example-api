import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from '../dto/auth.type';

@Injectable()
export class JwtGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  public async execute(user: User): Promise<AuthType> {
    const payload = {
      username: user.name,
      sub: user.id,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }
}
