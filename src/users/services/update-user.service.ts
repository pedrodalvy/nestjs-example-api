import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({ id, name, email }: UpdateUserInput): Promise<User> {
    const user = await this.repository.findOneOrFail(id);

    user.name = name;
    user.email = email;

    return this.repository.save(user);
  }
}
