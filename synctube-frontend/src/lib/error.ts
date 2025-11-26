import { AxiosError } from "axios";
import { zodErroToErrorDto, type ErrorDto } from "shared"
import { ZodError } from "zod"


export const toErrorDto = (error: any): ErrorDto => {
    if(error instanceof ZodError){
        return zodErroToErrorDto(error)
    }
    if(error instanceof AxiosError) {
        return error.response?.data as ErrorDto;
    }
    
    if(error instanceof Error){
        return {
            message: error.message
        }
    }

    return {
        message: "Invalid error ! Something went wrong"
    }

}