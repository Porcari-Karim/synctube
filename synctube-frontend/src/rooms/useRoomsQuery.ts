import { useQuery } from "@tanstack/react-query"
import type { RoomDto } from "shared"
import axiosInstance from "../lib/axios-instance";

const ROOMS_KEY = 'rooms';

const ROOM_ID_KEY = ROOMS_KEY+"Id";

const ROOMS_URL = '/api/rooms/';

const getRooms = async (search: string) => {
    
    const response = await axiosInstance.get(ROOMS_URL, {params: {search: search}});
    if(response.status !== 200) {
        throw new Error('Failed to fetch rooms');
    }
    const data: RoomDto[] = await response.data;
    return data;
}

const getRoomById = async (id: string) => {
    
    const response = await axiosInstance.get(ROOMS_URL+id);
    if(response.status !== 200) {
        throw new Error('Failed to fetch rooms');
    }
    const data: RoomDto = await response.data;
    return data;
}

const useRoomsQuery = (search: string) => {
    const query = useQuery({queryKey: [ROOMS_KEY, search], queryFn: () => getRooms(search)});
    return query;
}

const useRoomByIdQuery = (id: string) => {
    const query = useQuery({queryKey: [ROOM_ID_KEY], queryFn: () => getRoomById(id)});
    return query;
}

export {
    ROOMS_KEY,
    ROOMS_URL,
    useRoomsQuery,
    useRoomByIdQuery,
}