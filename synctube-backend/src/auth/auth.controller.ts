import { Router, type Request } from "express";
import { authService } from "./auth.service.js";
import { type LoginUserDto, LoginUserDtoSchema, type RegisterUserDto, RegisterUserDtoSchema } from "shared";
// import { LoginUserDto } from "shared/dtos/authDtos.js";


const authRouter : Router = Router();

authRouter.get('/me', (req, res) => {
    res.send(authService.getCurrentUser());
});

authRouter.post('/register', async (req: Request<{}, {}, RegisterUserDto>, res) => {
    await authService.registerUser(RegisterUserDtoSchema.parse(req.body));
    res.status(201).send();
});

authRouter.post('/login', async (req: Request<{}, {}, LoginUserDto>, res) => {
    await authService.logInUser(LoginUserDtoSchema.parse(req.body));
    res.status(200).send();
});

authRouter.post('/logout', async (req: Request, res) => {
    await authService.logOutUser();
    res.status(200).send();
});

export { authRouter };