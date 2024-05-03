import BaseController from "../../../src/senior/BaseController";
import { ComicService } from "./comic.service";
import ComicServiceImpl from "./comicImpl.service";
import { Request, Response } from "express";

class ComicController extends BaseController {
    private comicService: ComicService;

    constructor(comicService: ComicService) {
        super();
        this.comicService = comicService
    }

    getComics = this.executeAction(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const comics = await this.comicService.getComics(page, limit);
        res.status(200).send(comics);
    });

    getComicById = this.executeAction(async (req: Request, res: Response) => {
        const comic = await this.comicService.getComicById(req.params.id);
        res.status(200).send(comic);
    });

    createComic = this.executeAction(async (req: Request, res: Response) => {
        const newComic = await this.comicService.createComic(req.body);
        res.status(201).send({ message: "Comic created successfully", data: newComic });
    });

    updateComic = this.executeAction(async (req: Request, res: Response) => {
        const updatedComic = await this.comicService.updateComic(req.params.id, req.body);
        res.status(202).send({ message: "Comic updated successfully", data: updatedComic });
    });

    deleteComic = this.executeAction(async (req: Request, res: Response) => {
        await this.comicService.deleteComic(req.params.id);
        res.status(204).send();
    });

    getComicsOrderedByPublicationDate = this.executeAction(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const comics = await this.comicService.getComicsOrderedByPublicationDate(page, limit);
        res.status(200).send(comics);
    });

}

const comicService = ComicServiceImpl
export default new ComicController(comicService)