import { Router } from 'express';
import populateController from './src/domain/populate-database/populate.controller';
import comicController from './src/domain/comic/comic.controller';
import { comicValidatorMiddleware } from './src/middlewares/comicValidatorMiddleware';
import characterController from './src/domain/character/character.controller';
import { characterValidatorMiddleware } from './src/middlewares/characterValidatorMiddleware';
import creatorController from './src/domain/creator/creator.controller';
import { creatorValidatorMiddleware } from './src/middlewares/creatorValidatorMiddleware';

const routes = Router();

routes.get("/populate/events", populateController.getEvents)
routes.get("/populate/comics", populateController.getComics)
routes.get("/populate/creators", populateController.getCreators)
routes.get("/populate/characters", populateController.getCharacters)

routes.get("/comic/by-publication-date", comicController.getComicsOrderedByPublicationDate)
routes.get("/comic", comicController.getComics) 
routes.get("/comic/:id", comicController.getComicById)
routes.post("/comic", comicValidatorMiddleware, comicController.createComic)
routes.put("/comic/:id", comicValidatorMiddleware, comicController.updateComic)
routes.delete("/comic/:id", comicController.deleteComic)

routes.get("/character/by-name-lenght", characterController.getCharacterOrderedByNameLenght)
routes.get("/character/ordered-by-image-type", characterController.getCharacterOrganizeByImageType)
routes.get("/character", characterController.getCharacter)
routes.get("/character/:id", characterController.getCharacterById)
routes.post("/character", characterValidatorMiddleware, characterController.createCharacter)
routes.put("/character/:id", characterValidatorMiddleware, characterController.updateCharacter)
routes.delete("/character/:id", characterController.deleteCharacter)

routes.get("/creator/by-comics-count", creatorController.getCreatorsByComicsCount)
routes.get("/creator/by-roles", creatorController.getCreatorGoupByRole)
routes.get("/creator", creatorController.getCreators)
routes.get("/creator/:id", creatorController.getCreatorById)
routes.post("/creator", creatorValidatorMiddleware, creatorController.createCreator)
routes.put("/creator/:id", creatorValidatorMiddleware, creatorController.updateCreator)
routes.delete("/creator/:id", creatorController.deleteCreator)

export {
    routes
}