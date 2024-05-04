import { Router } from 'express';
import comicController from '../domain/comic/comic.controller';
import { comicValidatorMiddleware } from '../middlewares/comicValidatorMiddleware';


const comicRouter = Router();

comicRouter.get("/comic/by-publication-date", comicController.getComicsOrderedByPublicationDate)
comicRouter.get("/comic", comicController.getComics) 
comicRouter.get("/comic/:id", comicController.getComicById)
comicRouter.post("/comic", comicValidatorMiddleware, comicController.createComic)
comicRouter.put("/comic/:id", comicValidatorMiddleware, comicController.updateComic)
comicRouter.delete("/comic/:id", comicController.deleteComic)


export default comicRouter;