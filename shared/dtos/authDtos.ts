import { z } from "zod"


export const UserDtoSchema = z.object({
    username: z.string().min(3, "Username is too short !").max(20, "Username is too long !"),
})

export type UserDto = z.infer<typeof UserDtoSchema>;

export const RegisterUserDtoSchema = UserDtoSchema.extend({
    password: z.string().min(5, "Password is too short !"),
})

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;

export const LoginUserDtoSchema = RegisterUserDtoSchema;

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;

