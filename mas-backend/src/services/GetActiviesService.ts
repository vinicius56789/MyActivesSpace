import { getRepository } from "typeorm"
import { Activy } from "../models/Activy"

interface UserId{
    id?: string
}

class GetActiviesService {

    public async execute({id}: UserId){

        const activyRepository = getRepository(Activy)
        const activies = activyRepository.find()

        if(!activies){
            return{
                message: 'Não foi possível encontrar atividades'
            }
        }

        return activies
    }

}

export {GetActiviesService}