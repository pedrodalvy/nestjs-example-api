import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const user = await this.repository.create({ name, email, password });

    return this.repository.save(user);
  }
}
