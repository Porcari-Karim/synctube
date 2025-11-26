import { z } from "zod";
export declare const UserDtoSchema: z.ZodObject<{
    username: z.ZodString;
}, z.core.$strip>;
export type UserDto = z.infer<typeof UserDtoSchema>;
export declare const RegisterUserDtoSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
export declare const LoginUserDtoSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
