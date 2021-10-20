import { AuthUserService } from './auth-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../../users/repositories/user.repository';
import { TestUtil } from '../../common/test/TestUtil';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('When AuthUser Service be called', () => {
  let authUserService: AuthUserService;

  const mockRepository = {
    findByEmail: jest.fn(),
  };

  const compareSpy = jest.spyOn(bcrypt, 'compare');

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    authUserService = module.get<AuthUserService>(AuthUserService);
  });

  beforeEach(() => {
    mockRepository.findByEmail.mockReset();
    compareSpy.mockReset();
  });

  it('should be defined', () => {
    expect(authUserService).toBeDefined();
  });

  it('should call UserRepository with correct value', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findByEmail.mockReturnValue(mockUser);

    compareSpy.mockImplementation(() => Promise.resolve(true));

    const requestData = { email: mockUser.email, password: mockUser.password };
    await authUserService.execute(requestData);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(requestData.email);
  });

  it('should throw if not found a user', async () => {
    mockRepository.findByEmail.mockReturnValue(undefined);

    const requestData = { email: 'wrong@email.com', password: 'any' };
    await expect(authUserService.execute(requestData)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(mockRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it('should compare passwords with correct values', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findByEmail.mockReturnValue(mockUser);

    compareSpy.mockImplementation(() => Promise.resolve(true));

    const requestData = { email: mockUser.email, password: mockUser.password };
    await authUserService.execute(requestData);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith(
      requestData.password,
      mockUser.password,
    );
  });

  it('should throw exception with wrong password', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findByEmail.mockReturnValue(mockUser);

    compareSpy.mockImplementation(() => Promise.resolve(false));

    const requestData = { email: mockUser.email, password: 'wrong_pass' };
    await expect(authUserService.execute(requestData)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
