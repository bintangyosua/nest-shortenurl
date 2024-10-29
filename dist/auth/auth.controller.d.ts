import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signUp(signUpDto: Record<string, any>): Promise<{
        id: number;
        email: string;
    }>;
    signIn(signInDto: Record<string, any>): Promise<any>;
    getProfile(request: any): Promise<Record<string, any>>;
}
