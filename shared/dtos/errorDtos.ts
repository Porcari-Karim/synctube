import { z } from "zod"


export const ErrorDtoSchema = z.object({
    message: z.string()
})

export const zodErroToErrorDto = (error: any) => {
    const messages = error.issues.map((e: any) => e.message);
    const message = messages.join(" / ");
    return {
        message
    }
}

export type ErrorDto = z.infer<typeof ErrorDtoSchema>;