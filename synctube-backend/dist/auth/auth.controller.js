import { Router } from "express";
import { authService } from "./auth.service.js";
import { LoginUserDtoSchema, RegisterUserDtoSchema } from "shared";
// import { LoginUserDto } from "shared/dtos/authDtos.js";
const authRouter = Router();
authRouter.get('/me', (req, res) => {
    res.send(authService.getCurrentUser());
});
authRouter.post('/register', async (req, res) => {
    await authService.registerUser(RegisterUserDtoSchema.parse(req.body));
    res.status(201).send();
});
authRouter.post('/login', async (req, res) => {
    await authService.logInUser(LoginUserDtoSchema.parse(req.body));
    res.status(200).send();
});
authRouter.post('/logout', async (req, res) => {
    await authService.logOutUser();
    res.status(200).send();
});
export { authRouter };
//# sourceMappingURL=auth.controller.js.map