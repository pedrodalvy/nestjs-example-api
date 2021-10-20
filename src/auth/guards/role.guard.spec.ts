import { RolesGuard } from './roles.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { TestUtil } from '../../common/test/TestUtil';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('When Roles Guard be called', () => {
  let rolesGuard: RolesGuard;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  const spyGqlCreate = jest.spyOn(GqlExecutionContext, 'create');

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
  });

  beforeEach(() => {
    mockReflector.getAllAndOverride.mockReset();
    spyGqlCreate.mockReset();
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should return true if no roles is required', () => {
    mockReflector.getAllAndOverride.mockReturnValue(undefined);
    const mockExecutionContext = createMock<ExecutionContext>();

    const canActivate = rolesGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBeTruthy();
  });

  it('should return false if the given user does not have permission', () => {
    const mockExecutionContext = createMock<ExecutionContext>();
    mockReflector.getAllAndOverride.mockReturnValue(['user']);

    const mockUser = TestUtil.giveMeAValidUser();
    const spyGqlCreate = jest.spyOn(GqlExecutionContext, 'create');
    spyGqlCreate.mockImplementation(() => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getContext: function () {
        return { req: { user: mockUser } };
      },
    }));

    const canActivate = rolesGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBeFalsy();
  });

  it('should return true if the given user does have permission', () => {
    const mockExecutionContext = createMock<ExecutionContext>();
    mockReflector.getAllAndOverride.mockReturnValue(['admin']);

    const mockUser = TestUtil.giveMeAValidUser();
    const spyGqlCreate = jest.spyOn(GqlExecutionContext, 'create');
    spyGqlCreate.mockImplementation(() => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getContext: function () {
        return { req: { user: mockUser } };
      },
    }));

    const canActivate = rolesGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBeTruthy();
  });
});
