import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly repository: UserRepository) {}

  public async execute(): Promise<User[]> {
    return this.repository.find();
  }
}
