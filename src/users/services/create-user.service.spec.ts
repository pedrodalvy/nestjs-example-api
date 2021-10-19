import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { TestUtil } from '../../common/test/TestUtil';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserService } from './create-user.service';

describe('CreateUser Service', () => {
  let service: CreateUserService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
  });

  it('should create a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.create.mockReturnValue(mockUser);
    mockRepository.save.mockReturnValue(mockUser);

    const savedUser = await service.execute(mockUser);

    expect(savedUser).toMatchObject(mockUser);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should return exception when doesnt create a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.create.mockReturnValue(mockUser);
    mockRepository.save.mockReturnValue(undefined);

    await expect(service.execute(mockUser)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );

    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
