import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({
    name,
    email,
    password,
    role,
  }: CreateUserInput): Promise<User> {
    const user = await this.repository.create({ name, email, password, role });
    const savedUser = await this.repository.save(user);

    if (!savedUser) {
      throw new InternalServerErrorException('Problem to create a user.');
    }

    return savedUser;
  }
}
