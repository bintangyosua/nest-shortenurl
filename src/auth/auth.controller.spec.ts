import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const signUpDto = { email: 'test@example.com', password: '123456' };

      const result = await authController.signUp(signUpDto);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
    });
  });

  describe('signIn', () => {
    it('should call authService.signIn with email and password', async () => {
      const signInDto = { email: 'test@example.com', password: 'password123' };
      const accessToken = { access_token: 'mockedToken' };

      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(accessToken);

      const result = await authController.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
      expect(result).toEqual(accessToken);
    });

    it('should throw an HttpException if signIn fails', async () => {
      const signInDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValueOnce(
          new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
        );

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
