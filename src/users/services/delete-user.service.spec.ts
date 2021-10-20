import { DeleteUserService } from './delete-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { TestUtil } from '../../common/test/TestUtil';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUser Service', () => {
  let service: DeleteUserService;

  const mockRepository = {
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.remove.mockReset();
  });

  it('should delete a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(mockUser);
    mockRepository.remove.mockReturnValue(mockUser);

    const deletedUser = await service.execute(mockUser);

    expect(deletedUser).toMatchObject(mockUser);
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepository.remove).toHaveBeenCalledTimes(1);
  });

  it('should return exception when doesnt found a user to delete', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockRepository.findOne.mockReturnValue(undefined);
    mockRepository.remove.mockReturnValue(mockUser);

    await expect(service.execute(mockUser)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepository.remove).toHaveBeenCalledTimes(0);
  });
});
