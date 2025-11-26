import type { LoginUserDto, RegisterUserDto, UserDto } from 'shared';
import { userRepository } from './user.repository.js';
import argon2 from 'argon2';
import { context } from '../sessions/sessionAsyncLocalStorage.js';
import type { WithId } from 'mongodb';
import type { User } from './user.model.js';

const registerUser = async (user: RegisterUserDto) => {
    if(await userRepository.findOne({ username: user.username })) {
        throw new Error('Username already exists');
    }
    const passwordHash = await argon2.hash(user.password);
    const createUserResult = await userRepository.insertOne({
        username: user.username,
        passwordHash,
    })
    if(!createUserResult.acknowledged) {
        throw new Error('Failed to create user');
    }
}


const logInUser = async (user: LoginUserDto) => {
    const foundUser = await userRepository.findOne({ username: user.username });
    if(!foundUser) {
        throw new Error('Invalid username or password');
    }

    const isPasswordValid = await argon2.verify(foundUser.passwordHash, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    context.getStore()!.session.user = foundUser;
}

const getCurrentUser = (): UserDto | null => {
    console.log("me: ", !context.getStore()!.session.user)
    if(!context.getStore()!.session.user) {
        return null;
    }

    const user : UserDto = {
        username: context.getStore()!.session.user!.username
    }

    return user;
}

const logOutUser = async () => {
    delete context.getStore()!.session["user"];
}

const authService = {
    registerUser,
    logInUser,
    getCurrentUser,
    logOutUser
}

export { authService };