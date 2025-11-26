import {  Button, Dialog, DialogContent,  Typography } from "@mui/material";
import { useState, type PropsWithChildren, type ReactNode } from "react"

type ShowModalButtonProps = PropsWithChildren<{}> & {
    variant?: "text" | "outlined" | "contained",
    text: ReactNode,
    title: string,
    style?: React.CSSProperties
}

export const ShowModalButton = ({children, variant = "contained", text, title, style={}} : ShowModalButtonProps) => {

    const [opened, setOpened] = useState<boolean>(false);


    return (
        <>
        <Button variant={variant} onClick={() => setOpened(true)} style={style} >
            {text}
        </Button>
        <Dialog open={opened} onClose={() => setOpened(false)} fullWidth maxWidth="xs" >
            <DialogContent   >
                <Typography variant="h5" align="center" marginBottom={3} >{title}</Typography>
                {children}
            </DialogContent>     
        </Dialog>
        </>
    )
}