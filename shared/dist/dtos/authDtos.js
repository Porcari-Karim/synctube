import { z } from "zod";
export const UserDtoSchema = z.object({
    username: z.string().min(3, "Username is too short !").max(20, "Username is too long !"),
});
export const RegisterUserDtoSchema = UserDtoSchema.extend({
    password: z.string().min(5, "Password is too short !"),
});
export const LoginUserDtoSchema = RegisterUserDtoSchema;
