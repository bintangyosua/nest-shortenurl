import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        { provide: UsersService, useValue: { getUserByEmail: jest.fn() } },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return access_token if credentials are correct', async () => {
      const email = 'batman@gmail.com';
      const password = '123456';
      const user = { id: 1, email, password: await bcrypt.hash(password, 10) };

      jest.spyOn(usersService, 'getUserByEmail').mockResolvedValueOnce(user);

      const result = await service.signIn(email, password);
      expect(result).toHaveProperty('access_token');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const user = {
        id: 1,
        email,
        password: await bcrypt.hash('correctpassword', 10),
      };

      jest.spyOn(usersService, 'getUserByEmail').mockResolvedValueOnce(user);

      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
