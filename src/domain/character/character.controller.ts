import BaseController from "src/senior/BaseController";
import { CharacterService } from "./character.service";
import characterServiceImpl from "./characterImpl.service";
import { Request, Response } from "express";

class CharacterController extends BaseController {
    private characterService : CharacterService;

    constructor(characterService: CharacterService){
        super();
        this.characterService = characterService;
    }

    getCharacter = this.executeAction(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const characters = await this.characterService.getCharacter(page, limit);
        res.status(200).send(characters);
    });

    getCharacterById = this.executeAction(async (req: Request, res: Response) => {
        const character = await this.characterService.getCharacterById(req.params.id);
        res.status(200).send(character);
    });

    createCharacter = this.executeAction(async (req: Request, res: Response) => {
        const newCharacter = await this.characterService.createCharacter(req.body);
        res.status(201).send({ message: "Character created successfully", data: newCharacter });
    });

    updateCharacter = this.executeAction(async (req: Request, res: Response) => {
        const updatedCharacter = await this.characterService.updateCharacter(req.params.id, req.body);
        res.status(202).send({ message: "Character updated successfully", data: updatedCharacter });
    });

    deleteCharacter = this.executeAction(async (req: Request, res: Response) => {
        await this.characterService.deleteCharacter(req.params.id);
        res.status(204).send();
    });
}

const characterService = characterServiceImpl;
export default new CharacterController(characterService);