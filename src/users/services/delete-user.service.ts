import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

interface IRequest {
  id: number;
}

@Injectable()
export class DeleteUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const oldUser = { ...user };
    await this.repository.remove(user);

    return oldUser;
  }
}
