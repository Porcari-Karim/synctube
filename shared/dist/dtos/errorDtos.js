import { z } from "zod";
export const ErrorDtoSchema = z.object({
    message: z.string()
});
export const zodErroToErrorDto = (error) => {
    const messages = error.issues.map((e) => e.message);
    const message = messages.join(" / ");
    return {
        message
    };
};
