import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepo: Partial<UsersRepository>;
  let jwt: JwtService;

  const mockUser = {
    id: 'abc123',
    email: 'test@example.com',
    password: 'hashedpass',
    isAdmin: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(mockUser),
            saveUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepo = module.get(UsersRepository);
    jwt = module.get(JwtService);
  });

  it('✅ debe retornar access_token si email y password son válidos', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.signIn('test@example.com', 'myPassword123');

    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('fake-jwt-token');
  });

  it('❌ debe lanzar UnauthorizedException si las credenciales son incorrectas', async () => {
    (usersRepo.getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      service.signIn('wrong@example.com', 'wrongPassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
