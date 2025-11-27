import { Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import type { RoomDto } from "shared";
import { useRoomsMutations } from "./useRoomsMutations";
import { useAuth } from "../auth/useAuth";
import {  useGlobalAlert } from "../utils/useAlert";
import { useNavigate } from "react-router";
import { ShowModalButton } from "../utils/ShowModalButton";
import { UpdateRoomForm } from "./UpdateRoomForm";

function getYouTubeVideoId(urlStr: string): string | null {
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname.toLowerCase();

    // Short URL
    if (hostname === "youtu.be") {
      const videoId = url.pathname.slice(1); // remove leading '/'
      return videoId.length === 11 ? videoId : null;
    }

    // Standard URL
    if (hostname === "youtube.com" || hostname === "www.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        return videoId && videoId.length === 11 ? videoId : null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(urlStr: string, quality: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault" = "hqdefault"): string | null {
  const videoId = getYouTubeVideoId(urlStr);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export const RoomCard = (roomDto: RoomDto) => {

  const {user} = useAuth();

  const { alert } = useGlobalAlert()

  const navigate = useNavigate()

  const {deleteRoomMutation} = useRoomsMutations();

  const thumbnailUrl = getYouTubeThumbnail(roomDto.youtubeVideoUrl, "maxresdefault");

  const deleteRoomHandler = () => {
      deleteRoomMutation.mutate(roomDto._id)
  }

  const joinRoomHandler = () => {
    if(user) return navigate("/room/"+roomDto._id);
    alert("Please log in before trying to join a room !", "error")
  }
  
  return (
      <Card variant="outlined">
          <CardActionArea >
              <CardMedia
              component="img"
              image={thumbnailUrl ?? ""}
              alt="green iguana"

              onClick={joinRoomHandler}
              />
              <CardContent onClick={joinRoomHandler}>
                  <Typography gutterBottom variant="h5" component="div">
                      {roomDto.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Participants: {roomDto.participants}
                  </Typography>
              </CardContent>
            </CardActionArea>
                <Stack direction='row' justifyContent="end" >
                    {(user?.username === roomDto.owner.username) && (
                      <>
                      <Button variant="text"  onClick={deleteRoomHandler} >DELETE</Button>
                      <ShowModalButton text="UPDATE" variant="text" title="Update room" >
                        <UpdateRoomForm room={roomDto} />
                      </ShowModalButton>
                      </>
                    )}
                </Stack>
      </Card>
  );
}