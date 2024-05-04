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

    getComics = this.executeAction(async (req: Request, res: Response) => {
        await this.populateService.getComics()
        res.status(200).send({message: "Comics were saved on database."})
    })

    getCreators = this.executeAction(async (req: Request, res: Response) => {
        await this.populateService.getCreators()
        res.status(200).send({message: "Creators were saved on database."})
    }) 

    getCharacters = this.executeAction(async (req: Request, res: Response) => {
        await this.populateService.getCharacters()
        res.status(200).send({message: "Characters were saved on database."})
    })

}

const populateService = PopulateServiceImpl
export default new PopulateController(populateService)