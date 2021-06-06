import {getRepository} from 'typeorm';
import {sign} from 'jsonwebtoken';
import {compare} from 'bcryptjs';
import authConfig from '../config/auth';
import {User} from '../models/User';

interface AuthData {
    email: string;
    password: string;
}

class AuthenticateUserService{

    public async execute({email,password}: AuthData): Promise<String | {}> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({email});

        if(!user) {
            return {
                error: 'user not exist'
            }
        }

        const comparePassword = await compare(password, user.password);

        if(!comparePassword) {
            return {
                error: 'incorrect password'
            }
        }

        const { privateKey, expiresIn } = authConfig.jwt;

        const token = sign({"role":"user"}, privateKey, {
            algorithm: 'RS256',
            subject: user.id,
            expiresIn
        })

        const {id, name, email:emailUser} = user

        return {
            user:{
                id,
                name,
                email: emailUser
            },
            token
        };
    }

}

export {AuthenticateUserService};