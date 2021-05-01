import {Router} from 'express';

const routes = Router();

routes.get('/user', (request, response) => response.json({
    personagem: "Roronoa Zoro"
}))

export default routes;