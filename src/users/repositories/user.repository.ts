import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }
}
