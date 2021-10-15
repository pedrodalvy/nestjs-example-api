import { hashSync } from 'bcrypt';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export const hashPasswordTransform: ValueTransformer = {
  to(password: string): string {
    const salt = process.env.PASSWORD_SALT || 8;
    return hashSync(password, Number(salt));
  },

  from(hash: string): string {
    return hash;
  },
};
