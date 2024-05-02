import { Router } from 'express';
import populateController from './src/domain/populate-database/populate.controller';
import comicController from './src/domain/comic/comic.controller';
import { comicValidatorMiddleware } from './src/middlewares/comicValidatorMiddleware';
import characterController from 'src/domain/character/character.controller';
import { characterValidatorMiddleware } from 'src/middlewares/characterValidatorMiddleware';

const routes = Router();

routes.get("/populate/events", populateController.getEvents)
routes.get("/populate/comics", populateController.getComics)
routes.get("/populate/creators", populateController.getCreators)
routes.get("/populate/characters", populateController.getCharacters)

routes.get("/comic", comicController.getComics) 
routes.get("/comic/:id", comicController.getComicById)
routes.post("/comic", comicValidatorMiddleware, comicController.createComic)
routes.put("/comic/:id", comicValidatorMiddleware, comicController.updateComic)
routes.delete("/comic/:id", comicController.deleteComic)

routes.get("/character", characterController.getCharacter)
routes.get("/character/:id", characterController.getCharacterById)
routes.post("/character", characterController.createCharacter)
routes.put("/character/:id", characterController.updateCharacter)
routes.delete("/character/:id", characterController.deleteCharacter)

export {
    routes
}