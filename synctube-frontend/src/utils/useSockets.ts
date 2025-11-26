import { useEffect, useRef } from "react"
import { IoEvent, type ErrorEvent, type JoinEvent, type MessageEvent, type PlayPauseEvent } from "shared";
import { io, Socket } from "socket.io-client"
import { useGlobalAlert } from "./useAlert";
import { useAuth } from "../auth/useAuth";

type HandlersType = {
    joinHandler : (data: JoinEvent) => any
    errorHandler: (data: ErrorEvent) => any
    messageHandler: (data: MessageEvent) => any
    playHandler: (data: PlayPauseEvent) => any
    pauseHandler: (data: PlayPauseEvent) => any
}


export const useSockets = (roomId: string, handlers: HandlersType) => {

    const socketRef = useRef<Socket>(null);
    const {alert} = useGlobalAlert();
    const {user} = useAuth();

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_WS_URL, {
            autoConnect: true,
            withCredentials: true,
        });

        socketRef.current.on(IoEvent.Join, handlers.joinHandler);
        socketRef.current.on(IoEvent.Error, handlers.errorHandler);
        socketRef.current.on(IoEvent.Message, handlers.messageHandler);
        socketRef.current.on(IoEvent.Play, handlers.playHandler);
        socketRef.current.on(IoEvent.Pause, handlers.pauseHandler);

        socketRef.current.on("connect", () => {
            console.log("connected")
        })

        socketRef.current.io.on("open", () => {
            alert("Connected !", "success")
            socketRef.current?.emit(IoEvent.Join, {_id: roomId, username: user?.username})
        })

        socketRef.current.io.on("error", (err) => {
            alert("Error: "+ err.message, "error");
        })

        socketRef.current.io.on("close", () => {
            alert("Disconnected !", "error")
        })

        socketRef.current.emit(IoEvent.Join, {_id: roomId})


        return () => {
            socketRef.current?.close();
        }

    }, [])

    const getCurrentSocketValue = () => socketRef.current;

    const sendMessage = (message: MessageEvent) => {
        console.log(socketRef.current?.listenersAny());
        socketRef.current?.emit(IoEvent.Message, message);
    }

    const play = (time: number) => {
        socketRef.current?.emit(IoEvent.Play, {time: time, updatedAt: Date.now()})
    }

    const pause = (time: number) => {
        socketRef.current?.emit(IoEvent.Pause, {time: time, updatedAt: Date.now()})
    }

    return {
        getCurrentSocketValue,
        sendMessage,
        play,
        pause,
    }

}