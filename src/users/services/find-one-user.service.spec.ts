import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { TestUtil } from '../../common/test/TestUtil';
import { FindOneUserService } from './find-one-user.service';
import { NotFoundException } from '@nestjs/common';

describe('FindOneUser Service', () => {
  let service: FindOneUserService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindOneUserService>(FindOneUserService);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
  });

  it('should find a existing user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(mockUser);

    const foundUser = await service.execute({ id: 1 });

    expect(foundUser).toEqual(mockUser);
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return exception when does not to find a user', async () => {
    mockRepository.findOne.mockReturnValue(undefined);

    await expect(service.execute({ id: 1 })).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
