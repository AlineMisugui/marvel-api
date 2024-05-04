import { Router } from 'express';
import characterController from '../domain/character/character.controller';
import { characterValidatorMiddleware } from '../middlewares/characterValidatorMiddleware';

const characterRouter = Router();

characterRouter.get("/character/by-name-lenght", characterController.getCharacterOrderedByNameLenght)
characterRouter.get("/character/ordered-by-image-type", characterController.getCharacterOrganizeByImageType)
characterRouter.get("/character", characterController.getCharacter)
characterRouter.get("/character/:id", characterController.getCharacterById)
characterRouter.post("/character", characterValidatorMiddleware, characterController.createCharacter)
characterRouter.put("/character/:id", characterValidatorMiddleware, characterController.updateCharacter)
characterRouter.delete("/character/:id", characterController.deleteCharacter)

export default characterRouter;