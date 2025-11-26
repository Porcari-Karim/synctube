import { useParams } from "react-router"
import { useSockets } from "../utils/useSockets"
import { Stack, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { useGlobalAlert } from "../utils/useAlert"
import { RoomChat } from "./RoomChat"
import type { MessageEvent } from "shared"
import ReactPlayer from 'react-player'
import { useRoomByIdQuery } from "./useRoomsQuery"


type RoomPageParams = {
    id: string
}

export const Room = () => {
    
    const params = useParams<RoomPageParams>()
    const {alert} = useGlobalAlert();
    const [messages, setMessages] = useState<MessageEvent[]>([])
    const playerRef = useRef<HTMLVideoElement>(null);

    const [volume, setVolume] = useState<number>(0);

    const [playing, setPlaying] = useState<boolean>(true);


    if(!params.id) return <Typography>Please input a valid room Id</Typography>

    const {data} = useRoomByIdQuery(params.id);

    const {sendMessage, play, pause} = useSockets(params.id, {
        joinHandler: (data) => {
            alert(`${data.username} joined the room`, "info")
        },
        errorHandler: (data) => {
            alert(data.error, "error");
        },
        messageHandler: (data) => {
            setMessages(prev => [...prev, data]);
        },
        playHandler: (data) => {
            console.log(data)
            if(playerRef.current?.currentTime) {
                playerRef.current.currentTime = (data.time)
                setPlaying(true);
            }
            
        },
        pauseHandler: (data) => {
            console.log(data)
            if(playerRef.current?.currentTime) {
                playerRef.current.currentTime = (data.time)
                setPlaying(false);
            }
        }
    })

    const onPlay: React.ReactEventHandler<HTMLVideoElement> = (e) => {
        play(e.currentTarget.currentTime)
        console.log(e.currentTarget.currentTime)
        setPlaying(true);
    }

    const onPause: React.ReactEventHandler<HTMLVideoElement> = (e) => {
        pause(e.currentTarget.currentTime)
        console.log(e.currentTarget.currentTime)
        setPlaying(false);
    }

    const onSeek: React.ReactEventHandler<HTMLVideoElement> = (e) => {
        if(playing) return play(e.currentTarget.currentTime);
        pause(e.currentTarget.currentTime)
    }

    return (
        <Stack direction="row" height="100%" justifyContent="space-between" >
            <Stack flex={1}>
                <ReactPlayer src={data?.youtubeVideoUrl} width="100%" height="100%" controls
                playing={playing} 
                onPause={onPause} 
                onPlay={onPlay}
                onSeeked={onSeek}
                volume={volume} 
                onVolumeChange={(e) => {setVolume(e.currentTarget.volume)}}
                // onVolumeChangeCapture={(e) => console.log(e.currentTarget.volume)}
                ref={playerRef}
                />
            </Stack>
            <RoomChat  messages={messages.slice().reverse()} onMessage={sendMessage} roomId={params.id} />
        </Stack>
    )
}