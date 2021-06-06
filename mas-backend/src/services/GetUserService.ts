import { getRepository } from "typeorm";
import { User } from "../models/User";

interface UserData{
    id: string 
}

class GetUserService{

    public async execute({id}:UserData): Promise<User | {}>{

        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({id})

        if(!user){
            return{
                erro: "Usuário não encontrado"
            }
        }

        return{
            id: user.id,
            name: user.name,
            email: user.email
        }

    }

}

export {GetUserService}