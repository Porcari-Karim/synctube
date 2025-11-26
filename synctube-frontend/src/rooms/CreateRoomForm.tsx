import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form"
import { CreateRoomDtoSchema, type CreateRoomDto } from "shared";
import { useRoomsMutations } from "./useRoomsMutations";
import { useState } from "react";
import { toErrorDto } from "../lib/error";
import { useAlert } from "../utils/useAlert";




export const CreateRoomForm = () => {

    const {Alerts, alert} = useAlert()

    const {createRoomMutation} = useRoomsMutations();

    const {register, handleSubmit, reset} = useForm<CreateRoomDto>();

    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<CreateRoomDto> = async (data) => {
        setError(null);
        try {
            const newRoom = CreateRoomDtoSchema.parse(data);
            createRoomMutation.mutate(newRoom);
            alert("Succesfully created a new room !")
            reset({title: "", youtubeVideoUrl: ""})
        } catch (e: any) {
            setError(toErrorDto(e).message)
        }
        
    }


    return (
        <Stack spacing={2} >
            <TextField label="Room Title" slotProps={{input: {...register("title")}}} disabled={createRoomMutation.isPending} />
            <TextField label="YouTube video URL" slotProps={{input: {...register("youtubeVideoUrl")}}} disabled={createRoomMutation.isPending} />
            {error && <Typography color="error" >{error}</Typography>}
            {createRoomMutation.error && <Typography color="error" >{toErrorDto(createRoomMutation.error).message}</Typography>}
            <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={createRoomMutation.isPending} >Submit</Button>
            <Alerts/>
        </Stack>
    )
}