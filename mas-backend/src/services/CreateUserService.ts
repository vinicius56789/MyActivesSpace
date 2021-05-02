import {User} from '../models/User'
import {hash} from 'bcryptjs'
import {getRepository} from 'typeorm'

interface UserData{
    name: string
    email: string
    password: string
}

class CreateUserService{

    public async execute({name, email, password} : UserData){
        const usersRepository = getRepository(User)
        const checkUserExists = await usersRepository.findOne({email})

        if(checkUserExists){
            throw new Error('E-mail já cadastrado')
        }

        const hashPassword = await hash(password, 8)

        const user = {
            name,
            email,
            password: hashPassword
        }

        await usersRepository.save(user)

        return user

    }

}

export {CreateUserService}