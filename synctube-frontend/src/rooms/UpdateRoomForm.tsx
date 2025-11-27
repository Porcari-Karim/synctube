import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form"
import { CreateRoomDtoSchema, type CreateRoomDto, type RoomDto } from "shared";
import { useRoomsMutations } from "./useRoomsMutations";
import { useState } from "react";
import { toErrorDto } from "../lib/error";
import { useAlert } from "../utils/useAlert";




export const UpdateRoomForm = ({room}: {room: RoomDto}) => {

    const {Alerts, alert} = useAlert()

    const {updateRoomMutation} = useRoomsMutations();

    const {register, handleSubmit, reset} = useForm<CreateRoomDto>({
        values:  {
            title: room.title,
            youtubeVideoUrl: room.youtubeVideoUrl
        }
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<CreateRoomDto> = async (data) => {
        setError(null);
        try {
            const newRoom = CreateRoomDtoSchema.parse(data);
            updateRoomMutation.mutate({
                newRoom: newRoom,
                id: room._id
            });
            alert(`Succesfully updated room ${room._id}`)
            reset({title: "", youtubeVideoUrl: ""})
        } catch (e: any) {
            setError(toErrorDto(e).message)
        }
        
    }


    return (
        <Stack spacing={2} >
            <TextField label="Room Title" slotProps={{input: {...register("title")}}} disabled={updateRoomMutation.isPending} />
            <TextField label="YouTube video URL" slotProps={{input: {...register("youtubeVideoUrl")}}} disabled={updateRoomMutation.isPending} />
            {error && <Typography color="error" >{error}</Typography>}
            {updateRoomMutation.error && <Typography color="error" >{toErrorDto(updateRoomMutation.error).message}</Typography>}
            <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={updateRoomMutation.isPending} >Submit</Button>
            <Alerts/>
        </Stack>
    )
}