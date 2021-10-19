import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { FindAllUsersService } from './find-all-users.service';
import { TestUtil } from '../../common/test/TestUtil';

describe('FindAllUsers Service', () => {
  let service: FindAllUsersService;

  const mockRepository = {
    find: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUsersService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindAllUsersService>(FindAllUsersService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
  });

  it('should show empty user list', async () => {
    mockRepository.find.mockReturnValue([]);

    const users = await service.execute();

    expect(users).toHaveLength(0);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should be list all users', async () => {
    const user = TestUtil.giveMeAValidUser();
    mockRepository.find.mockReturnValue([user, user]);

    const users = await service.execute();

    expect(users).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });
});
