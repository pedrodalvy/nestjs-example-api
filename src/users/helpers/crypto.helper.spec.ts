import { hashPasswordTransform } from './crypto.helper';
import * as bcryptHelper from 'bcrypt';

describe('When hash password', () => {
  it('should transform a string in hash', () => {
    const hashSyncSpy = jest.spyOn(bcryptHelper, 'hashSync');
    hashSyncSpy.mockReturnValue('hashed_value');

    const salt = 10;
    process.env.PASSWORD_SALT = String(salt);

    const transform = hashPasswordTransform;
    const password = 'password';

    const transformedPassword = transform.to(password);

    expect(transformedPassword).toEqual('hashed_value');
    expect(hashSyncSpy).toHaveBeenCalledWith(password, salt);
    expect(hashSyncSpy).toHaveBeenCalledTimes(1);
  });

  it('should return same argument passed', () => {
    const transform = hashPasswordTransform;
    const password = 'password';

    const transformedPassword = transform.from(password);

    expect(transformedPassword).toEqual(password);
  });
});
