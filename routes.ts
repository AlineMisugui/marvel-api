import { Router } from 'express';
import populateController from './src/domain/populate-database/populate.controller';

const routes = Router();

routes.get("/events", populateController.getEvents)
routes.get("/comics", populateController.getComics)
routes.get("/creators", populateController.getCreators)
routes.get("/characters", populateController.getCharacters)

export {
    routes
}