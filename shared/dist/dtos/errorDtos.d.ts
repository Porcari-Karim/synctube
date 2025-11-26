import { z } from "zod";
export declare const ErrorDtoSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export declare const zodErroToErrorDto: (error: any) => {
    message: any;
};
export type ErrorDto = z.infer<typeof ErrorDtoSchema>;
