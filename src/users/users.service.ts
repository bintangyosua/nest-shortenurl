import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.users.findMany({
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }

  async createUser(data: { email: string; password: string }) {
    return this.prismaService.users.create({
      data,
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }

  async getUserById(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: { email },
    });
  }

  async editUser(
    id: number,
    data: {
      email?: string;
      password?: string;
    },
  ) {
    return this.prismaService.users.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prismaService.users.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }
}
