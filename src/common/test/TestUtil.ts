import { User } from '../../users/entities/user.entity';

export class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();

    user.id = 1;
    user.name = 'Valid Name';
    user.email = 'valid@email.com';
    user.password = 'hashed_password';
    user.role = 'admin';
    user.createdAt = new Date();

    return user;
  }
}
