import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "shared"
import axiosInstance from "../lib/axios-instance";
import { queryClient } from "../lib/query-client";


const AUTH_KEY = "auth";

const AUTH_URL = "/api/auth";

const useAuthQuery = () => {
    const query = useQuery<UserDto>({
        queryKey: [AUTH_KEY],
        queryFn: async () => {
            const response = axiosInstance.get<UserDto>(AUTH_URL+"/me");
            return (await response).data;
        }
    })

    return query;
}

const logIn = async (username: string, password: string) => {
    const response = await axiosInstance.post(`${AUTH_URL}/login`, {
        username,
        password
    });
    console.log(response);
    if(response.status === 200) {
        queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    }
    
}

const logOut = async () => {
    const response = await axiosInstance.post(`${AUTH_URL}/logout`);
    console.log(response);
    if(response.status === 200) {
        queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    }
    
}

const register = async (username: string, password: string) => {
    const response = await axiosInstance.post(`${AUTH_URL}/register`, {
        username,
        password
    });
    if(response.status !== 201) {
        console.error("Registration failed");
        throw new Error((response.data as any).error || "Registration failed");
    }
    
};

export const useAuth = () => {
    const query = useAuthQuery();
    const user = query.data;
    return {
        ...query,
        user,
        logIn,
        register,
        logOut
    }
}