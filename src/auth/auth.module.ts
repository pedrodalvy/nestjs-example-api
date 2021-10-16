import { Module } from '@nestjs/common';
import { AuthUserService } from './services/auth-user.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGeneratorService } from './services/jwt-generator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES,
        },
      }),
    }),
  ],
  providers: [AuthUserService, JwtGeneratorService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
