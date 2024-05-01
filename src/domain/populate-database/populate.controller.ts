import BaseController from "../../senior/BaseController";
import { PopulateService } from "./populate.service";
import PopulateServiceImpl from "./populateImpl.service";
import { Request, Response } from "express";

class PopulateController extends BaseController {
    private populateService: PopulateService;

    constructor(populateService: PopulateService) {
        super();
        this.populateService = populateService
    }

    getEvents = this.executeAction(async (req: Request, res: Response) => {
        const events = await this.populateService.getEventOriginalSin()
        res.status(200).send(events)
    })

    getComics = this.executeAction(async (req: Request, res: Response) => {
        const comics = await this.populateService.getComics()
        res.status(200).send(comics)
    })

    getCreators = this.executeAction(async (req: Request, res: Response) => {
        const creators = await this.populateService.getCreators()
        res.status(200).send(creators)
    }) 

    getCharacters = this.executeAction(async (req: Request, res: Response) => {
        const characters = await this.populateService.getCharacters()
        res.status(200).send(characters)
    })

}

const populateService = PopulateServiceImpl
export default new PopulateController(populateService)