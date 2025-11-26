import { Card, CardActionArea, CardContent, Skeleton } from "@mui/material";



export const RoomCardPlaceholder = () => {

    

    return (
        <Card variant="outlined">
            <CardActionArea>
                <Skeleton variant="rectangular" sx={{height: "180px"}} />
                <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}