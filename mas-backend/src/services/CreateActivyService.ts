import {getRepository} from 'typeorm'
import {Activy} from '../models/Activy'
import { CourseUnit } from '../models/CourseUnit'

interface ActivyData{
    name: string
    activy_date: string
    course_unit: CourseUnit
}

class CreateActivyService {

    public async execute({name, activy_date, course_unit} : ActivyData) {
        const activyRepository = getRepository(Activy)
        const checkActivyExists = await activyRepository.findOne({name})

        if(checkActivyExists){
            throw new Error('Já existe atividade com esse nome')
        }
        const activy = activyRepository.create({
            course_unit,
            name,
            activy_date
        })

        await activyRepository.save(activy)

        return activy
    }
}

export {CreateActivyService}