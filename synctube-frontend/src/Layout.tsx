import {  Button, Stack, Typography } from "@mui/material"
import type { PropsWithChildren } from "react"
import logo from "./assets/SyncTubeLogo.png"
import { useAuth } from "./auth/useAuth"
import { ShowModalButton } from "./utils/ShowModalButton"
import { SignUpForm } from "./auth/SignUpForm"
import { SignInForm } from "./auth/SignInForm"
import { GlobalAlertProvider } from "./utils/useAlert"
import { useLocation } from "react-router"

type LayoutProps = PropsWithChildren<{}>

export const Layout = ({ children }: LayoutProps) => {

  const location = useLocation()

  const {user, logOut} = useAuth();

  console.log(location.pathname)


  return (
    <Stack justifyContent="start" p="10px" height="100vh" maxHeight="100vh" >
            { (!location.pathname.includes("/room/")) && (<Stack direction="row" justifyContent="space-between"  alignItems="center" height="60px" width="100%" m="5px" mb="50px"  py="10px" px="10px"  boxShadow="0px 6px 18px rgba(0,0,0,0.5)" borderRadius="5px">
              <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} height="100%" gap={2}>
                  <img src={logo} style={{backgroundColor: "white", height: "100%", aspectRatio: "1", borderRadius: "5px"}} />
                <Typography variant="h5">SyncTube</Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} height="100%" gap={2}>
                  {/* <Button variant="outlined" onClick={() => axiosInstance.get("/api/foo", {withCredentials: true})} >Foo</Button> */}
                  {
                    user ?
                    <>
                      <Typography variant="body1">Hello {user.username}</Typography>
                      <Button variant="outlined" color="error" onClick={logOut} >Log Out</Button>
                    </>
                    
                    :
                    (
                      <>
                        <ShowModalButton text="Log In" variant="contained" title="Log In" >
                          <SignInForm/>
                        </ShowModalButton>                    
                        <ShowModalButton text="Register" variant="outlined" title="Please register" >
                          <SignUpForm/>
                        </ShowModalButton>
                      </>
                    
                    )
                  }
              </Stack>
              
            </Stack>)}
        
        <Stack height="100%" maxHeight="100%" justifyContent="flex-start" >
          <GlobalAlertProvider>
            {children}
          </GlobalAlertProvider>
        </Stack>
    </Stack>
  )
}
