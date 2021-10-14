import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

interface IRequest {
  id: number;
}

@Injectable()
export class FindOneUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute({ id }: IRequest): Promise<User> {
    return this.repository.findOneOrFail(id);
  }
}
