import { useMutation } from "@tanstack/react-query"
import { ROOMS_KEY, ROOMS_URL } from "./useRoomsQuery"
import type { CreateRoomDto } from "shared"
import axiosInstance from "../lib/axios-instance"
import { queryClient } from "../lib/query-client"

export const useRoomsMutations = () => {

    const createRoomMutation = useMutation({
        mutationFn: (newRoom: CreateRoomDto) => {
            return axiosInstance.post(ROOMS_URL, newRoom);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROOMS_KEY] });
        }
    })

    const deleteRoomMutation = useMutation({
        mutationFn: (_id: string) => {
            return axiosInstance.delete(`${ROOMS_URL}${_id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROOMS_KEY] });
        }
    })

    const updateRoomMutation = useMutation({
        mutationFn: ({id, newRoom}: {id: string, newRoom: CreateRoomDto} ) => {
            return axiosInstance.patch(`${ROOMS_URL}${id}`, newRoom);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ROOMS_KEY] });
        }
    })

    return {
        createRoomMutation,
        deleteRoomMutation,
        updateRoomMutation
    }
}