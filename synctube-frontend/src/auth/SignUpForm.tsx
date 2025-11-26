import {  useForm, type SubmitHandler } from "react-hook-form";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { toErrorDto } from "../lib/error";
import { LoginUserDtoSchema } from "shared";

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
}

export const SignUpForm = () => {

    const auth = useAuth();
    const {register, handleSubmit} = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const onSubmit: SubmitHandler<FormData> = async data => {
        if(data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(null);
        setPending(true);
        try {
          LoginUserDtoSchema.parse({
            username: data.username,
            password: data.password
          })
          await auth.register(data.username, data.password);
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
        <TextField label="Confirm password" type="password" slotProps={{input: {...register("confirmPassword")}}} disabled={pending} />
        {error && <Typography color="error" >{error}</Typography>}
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={pending} >Sign Up</Button>
    </Stack>
      
    </Container>
  )

}
