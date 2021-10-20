import { JwtStrategy } from './jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../../users/repositories/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { TestUtil } from '../../common/test/TestUtil';

describe('When JwtStrategy be called', () => {
  let jwtStrategy: JwtStrategy;
  process.env.JWT_SECRET = 'any secret';

  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
  });

  it('shoul call repository with correct value', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(mockUser);

    const payload = { sub: mockUser.id, name: mockUser.name };
    await jwtStrategy.validate(payload);

    expect(mockRepository.findOne).toHaveBeenCalledWith(payload.sub);
  });

  it('should throw if not found user', async () => {
    mockRepository.findOne.mockReturnValue(undefined);

    const payload = { sub: 1, name: 'any' };
    await expect(jwtStrategy.validate(payload)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return a user if found', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(mockUser);

    const payload = { sub: mockUser.id, name: mockUser.name };
    const validUser = await jwtStrategy.validate(payload);

    expect(validUser).toMatchObject(mockUser);
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
