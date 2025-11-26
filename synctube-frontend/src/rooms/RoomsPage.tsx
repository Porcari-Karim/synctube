import { Box, Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material"
import { useRoomsQuery } from "./useRoomsQuery"
import { RoomCard } from "./RoomCard";
import { CreateRoomForm } from "./CreateRoomForm";
import { ShowModalButton } from "../utils/ShowModalButton";
import { useRef, useState } from "react";
import { Add, Search } from "@mui/icons-material"
import { useAuth } from "../auth/useAuth";
import { RoomCardPlaceholder } from "./RoomCardPlaceholder";

export const RoomsPage = () => {

    const {user} = useAuth();

    const [searchField, setSearchField] = useState<string>("");

    const {data, isLoading} = useRoomsQuery(searchField);
    
    const textFieldRef = useRef<string>("")

    const search = () => {
        setSearchField(textFieldRef.current);
    }

    return (
        <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h4">Let's watch something !</Typography>
            <Stack  direction="row" alignItems="center" justifyContent="center"  padding="15px" boxShadow="0px 6px 18px rgba(0,0,0,0.5)" borderRadius="5px" >
                <ButtonGroup size="small" >
                    <TextField onChange={(e) => textFieldRef.current = e.target.value}  label="Room title" onKeyDown={(e) => {if(e.code === "Enter" && !isLoading) search()}} />
                    <Button variant="outlined" style={{aspectRatio: 1}} onClick={search} ><Search/></Button>       
                </ButtonGroup>
            </Stack>
            <Box
            sx={{
                width: '95%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
                gap: 2,
                padding: "10px"
            }}
            >
                {isLoading && Array(4).map(_ => <RoomCardPlaceholder/>)}
                {!isLoading && data?.map(room => (
                    <RoomCard key={room._id.toString()} {...room} />
                    // <RoomCardPlaceholder/>
                ))}
            </Box>
            {user && (<ShowModalButton variant="contained" text={<Add />} title="Create a new room" style={{aspectRatio: "1/1", borderRadius: "40px", position: "fixed", right: "10px", bottom: "20px"}} >
                <CreateRoomForm/>
            </ShowModalButton>)}
        </Stack>
)}
