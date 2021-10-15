import { hashSync } from 'bcrypt';

export const hashPasswordTransform = {
  to(password: string): string {
    const salt = process.env.PASSWORD_SALT || 8;
    return hashSync(password, Number(salt));
  },
  from(hash: string): string {
    return hash;
  },
};
