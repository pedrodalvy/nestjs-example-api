import { JwtGeneratorService } from './jwt-generator.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TestUtil } from '../../common/test/TestUtil';

describe('When JwtGenerator Service be called', () => {
  let jwtGeneratorService: JwtGeneratorService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtGeneratorService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    jwtGeneratorService = module.get<JwtGeneratorService>(JwtGeneratorService);
  });

  beforeEach(() => {
    mockJwtService.signAsync.mockReset();
  });

  it('should be defined', () => {
    expect(jwtGeneratorService).toBeDefined();
  });

  it('should call JwtService with correct payload', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockJwtService.signAsync.mockReturnValue('any');

    await jwtGeneratorService.execute(mockUser);

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      username: mockUser.name,
      sub: mockUser.id,
      role: mockUser.role,
    });
    expect(mockJwtService.signAsync).toHaveBeenCalledTimes(1);
  });

  it('should be return a token', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockJwtService.signAsync.mockReturnValue('jwt_token');

    const { token } = await jwtGeneratorService.execute(mockUser);

    expect(token).toEqual('jwt_token');
  });

  it('should be return a user', async () => {
    const mockUser = TestUtil.giveMeAValidUser();
    mockJwtService.signAsync.mockReturnValue('jwt_token');

    const { user } = await jwtGeneratorService.execute(mockUser);

    expect(user).toMatchObject(mockUser);
  });
});
