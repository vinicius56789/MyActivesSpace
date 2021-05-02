import {getRepository} from 'typeorm'
import {CourseUnit} from '../models/CourseUnit'

interface CourseUnitData{
    name: string
    description: string
}

class CreateCourseUnitService {

    public async execute({name, description} : CourseUnitData) {
        const courseRepository = getRepository(CourseUnit)
        const checkCourseUnitExists = await courseRepository.findOne({name})

        if(checkCourseUnitExists){
            throw new Error('Já existe atividade com esse nome')
        }
        const courseUnit = courseRepository.create({
            name,
            description
        })

        await courseRepository.save(courseUnit)

        return courseRepository
    }
}

export {CreateCourseUnitService}