import { Router } from 'express';
import populateController from './src/domain/populate-database/populate.controller';

const routes = Router();

routes.get("populate/events", populateController.getEvents)
routes.get("populate/comics", populateController.getComics)
routes.get("populate/creators", populateController.getCreators)
routes.get("populate/characters", populateController.getCharacters)

export {
    routes
}