import {Request, Response} from 'express'
import { CreateActivyService } from '../services/CreateActivyService'

class ActivyController{

    async create(request: Request, response: Response){
        const ActivyData = request.body
        const createActivy = new CreateActivyService()
        const activy = await createActivy.execute(ActivyData)
        return response.json(activy)
    }
}
export {ActivyController}