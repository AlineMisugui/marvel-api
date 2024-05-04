import { Router } from 'express';
import creatorController from '../domain/creator/creator.controller';
import { creatorValidatorMiddleware } from '../middlewares/creatorValidatorMiddleware';

const creatorRouter = Router();

creatorRouter.get("/creator/by-comics-count", creatorController.getCreatorsByComicsCount)
creatorRouter.get("/creator/by-roles", creatorController.getCreatorGoupByRole)
creatorRouter.get("/creator", creatorController.getCreators)
creatorRouter.get("/creator/:id", creatorController.getCreatorById)
creatorRouter.post("/creator", creatorValidatorMiddleware, creatorController.createCreator)
creatorRouter.put("/creator/:id", creatorValidatorMiddleware, creatorController.updateCreator)
creatorRouter.delete("/creator/:id", creatorController.deleteCreator)

export default creatorRouter;