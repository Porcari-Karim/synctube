import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { toErrorDto } from "../lib/error";
import { type RegisterUserDto, RegisterUserDtoSchema } from "shared";


export const SignInForm = () => {

    const auth = useAuth();
    const {register, handleSubmit} = useForm<RegisterUserDto>();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const onSubmit: SubmitHandler<RegisterUserDto> = async data => {
        setError(null);
        setPending(true);
        try {
          RegisterUserDtoSchema.parse(data);
          await auth.logIn(data.username, data.password);
        } catch (e: any) {
          const error = toErrorDto(e)
          setError(error.message);
        }
        setPending(false);
    };

  return (
    <Container maxWidth="sm">
    <Stack spacing={2}>
        <TextField label="Username" slotProps={{input: {...register("username")}}} disabled={pending} />
        <TextField label="Password" type="password" slotProps={{input: {...register("password")}}} disabled={pending} />
        {error && <Typography color="error" >{error}</Typography>}
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={pending} >Sign Up</Button>
    </Stack>
      
    </Container>
  )

}
