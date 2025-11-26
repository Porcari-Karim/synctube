import { type PropsWithChildren } from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router";

export const Protected = ({children}: PropsWithChildren) => {
    const {user} = useAuth();

    return (
        <>
        {
            user ? 
            <>
             {children}
            </>
            :
            <Navigate to="/" />
        }
        </>
    )

}