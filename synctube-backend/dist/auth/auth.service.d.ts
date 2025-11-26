import type { LoginUserDto, RegisterUserDto, UserDto } from 'shared';
declare const authService: {
    registerUser: (user: RegisterUserDto) => Promise<void>;
    logInUser: (user: LoginUserDto) => Promise<void>;
    getCurrentUser: () => UserDto | null;
    logOutUser: () => Promise<void>;
};
export { authService };
//# sourceMappingURL=auth.service.d.ts.map