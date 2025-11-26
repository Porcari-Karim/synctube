import { userRepository } from './user.repository.js';
import argon2 from 'argon2';
import { context } from '../sessions/sessionAsyncLocalStorage.js';
const registerUser = async (user) => {
    if (await userRepository.findOne({ username: user.username })) {
        throw new Error('Username already exists');
    }
    const passwordHash = await argon2.hash(user.password);
    const createUserResult = await userRepository.insertOne({
        username: user.username,
        passwordHash,
    });
    if (!createUserResult.acknowledged) {
        throw new Error('Failed to create user');
    }
};
const logInUser = async (user) => {
    const foundUser = await userRepository.findOne({ username: user.username });
    if (!foundUser) {
        throw new Error('Invalid username or password');
    }
    const isPasswordValid = await argon2.verify(foundUser.passwordHash, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    context.getStore().session.user = foundUser;
};
const getCurrentUser = () => {
    console.log("me: ", !context.getStore().session.user);
    if (!context.getStore().session.user) {
        return null;
    }
    const user = {
        username: context.getStore().session.user.username
    };
    return user;
};
const logOutUser = async () => {
    delete context.getStore().session["user"];
};
const authService = {
    registerUser,
    logInUser,
    getCurrentUser,
    logOutUser
};
export { authService };
//# sourceMappingURL=auth.service.js.map