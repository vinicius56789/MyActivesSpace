import { compare } from "bcryptjs"
import {sign} from 'jsonwebtoken'
import { getRepository } from "typeorm"
import { User } from "../models/User"
import authConfig from '../config/auth'

interface AuthData{
    email: string
    password: string
}

class AuthenticateUserService{

    public async execute({email, password}:AuthData): Promise<String | {}>{

        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({email})
        if(!user){
            return {
                erro: "Usuário não encontrado"
            }
        }

        const comparePassword = compare(password, user.password)

        if(!comparePassword){
            return {
                erro: "Senha ou e-mail incorreto(a)"
            }
        }

        const {privateKey, expiresIn} = authConfig.jwt

        const token = sign({"role": "user"}, privateKey, {
            algorithm: 'RS256',
            subject: user.id,
            expiresIn
        })

        return token
    }

}

export {AuthenticateUserService}