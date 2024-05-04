import { Router } from 'express';
import populateController from '../domain/populate-database/populate.controller';

const populateRouter = Router();

populateRouter.get("/populate/comics", populateController.getComics)
populateRouter.get("/populate/creators", populateController.getCreators)
populateRouter.get("/populate/characters", populateController.getCharacters)

export default populateRouter;