import { UpdateUserService } from './update-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { TestUtil } from '../../common/test/TestUtil';
import { NotFoundException } from '@nestjs/common';

describe('UpdateUser Service', () => {
  let service: UpdateUserService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
  });

  it('should update a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    const mockUpdatedUser = { ...mockUser, name: 'Updated Name' };
    mockRepository.findOne.mockReturnValue(mockUser);
    mockRepository.save.mockReturnValue(mockUpdatedUser);

    const updatedUser = await service.execute(mockUser);

    expect(updatedUser).toMatchObject(mockUpdatedUser);
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should return exception when doesnt found a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(undefined);
    mockRepository.save.mockReturnValue(mockUser);

    await expect(service.execute(mockUser)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(0);
  });
});
