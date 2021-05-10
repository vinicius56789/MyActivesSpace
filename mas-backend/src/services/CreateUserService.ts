import {User} from '../models/User'
import {hash} from 'bcryptjs'
import {getRepository} from 'typeorm'
import {v4 as uuid} from 'uuid'

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
            id: uuid(),
            name,
            email,
            password: hashPassword
        }

        try{
            await usersRepository.save(user)
        }catch(exception){
            console.log(exception)
        }

        return user

    }

}

export {CreateUserService}