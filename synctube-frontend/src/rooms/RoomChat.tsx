import { Send } from "@mui/icons-material"
import { Button, ButtonGroup, Divider, Stack, TextField, Typography } from "@mui/material"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { MessageEvent } from "shared"
import { useAuth } from "../auth/useAuth"

type RoomChatProps = {
    messages: MessageEvent[],
    onMessage: (message: MessageEvent) => any,
    roomId: string,
}

type MessageForm = {
    text: string
}

export const RoomChat = ({ messages, onMessage, roomId }: RoomChatProps) => {

    const {user} = useAuth();

    const {register, handleSubmit, reset} = useForm<MessageForm>();
    
    const submit: SubmitHandler<MessageForm>  = (data) => {
            if(data.text === "") return;
            onMessage({
                room_id: roomId,
                sender: {
                    username: user!.username
                },
                datetime: Date.now(),
                text: data.text
            });
            reset({text: ""});
        }
    

    


    return (
        <Stack direction="column" padding="15px" justifyContent="space-between" height="100%"  boxShadow="0px 6px 18px rgba(0,0,0,0.5)"  spacing="10px" >
            <Stack direction="column-reverse" flex={1} justifyContent="flex-start" alignItems="center" spacing="5px" overflow="auto" >
                {
                    messages.map(message => {
                        return (
                            <Stack width="100%" direction="column" key={message.sender.username + message.datetime} pb="5px">
                                <Typography variant="subtitle1" >{message.sender.username}</Typography>
                                <Typography variant="caption" >{(new Date(Number(message.datetime))).toLocaleString()}</Typography>
                                <Typography variant="subtitle2" mb="5px" >{message.text}</Typography>
                                <Divider/>
                            </Stack>
                        )
                    })
                }
            </Stack>
            <Stack width="100%" height="60px" alignItems="center" justifyContent="center" >
                <form onSubmit={handleSubmit(submit)}>
                    <ButtonGroup size="medium" >
                        <TextField  slotProps={{input: {...register("text")}}}  label="New message"  />
                        <Button variant="outlined" style={{aspectRatio: 1}} type="submit" ><Send/></Button>       
                    </ButtonGroup>
                </form>
            </Stack>
        </Stack>
    )
}