import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput } from '../dto/auth.input';
import { compare } from 'bcrypt';
import { UserRepository } from '../../users/repositories/user.repository';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ email, password }: AuthInput): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    return user;
  }
}
