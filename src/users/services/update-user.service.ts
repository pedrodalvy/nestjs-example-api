import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({
    id,
    name,
    email,
    role,
  }: UpdateUserInput): Promise<User> {
    const user = await this.repository.findOneOrFail(id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.updatedAt = new Date();

    return this.repository.save(user);
  }
}
