import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUsers(): Promise<{
        id: number;
        email: string;
    }[]>;
    createUser(data: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        email: string;
    }>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
    }>;
    getUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    editUser(id: number, data: {
        email?: string;
        password?: string;
    }): Promise<{
        id: number;
        email: string;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
    }>;
}
