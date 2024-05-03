import BaseController from "../../senior/BaseController";
import { CreatorService } from "./creator.service";
import creatorImplService from "./creatorImpl.service";

class CreatorController extends BaseController {
    private creatorService: CreatorService;

    constructor(creatorService: CreatorService) {
        super();
        this.creatorService = creatorService;
    }

    getCreators = this.executeAction(async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const creators = await this.creatorService.getCreators(page, limit);
        res.status(200).send(creators);
    });

    getCreatorById = this.executeAction(async (req, res) => {
        const creator = await this.creatorService.getCreatorById(req.params.id);
        res.status(200).send(creator);
    });

    createCreator = this.executeAction(async (req, res) => {
        const newCreator = await this.creatorService.createCreator(req.body);
        res.status(201).send({ message: "Creator created successfully", data: newCreator });
    });

    updateCreator = this.executeAction(async (req, res) => {
        const updatedCreator = await this.creatorService.updateCreator(req.params.id, req.body);
        res.status(202).send({ message: "Creator updated successfully", data: updatedCreator });
    });

    deleteCreator = this.executeAction(async (req, res) => {
        await this.creatorService.deleteCreator(req.params.id);
        res.status(204).send();
    });
}

const creatorService = creatorImplService
export default new CreatorController(creatorService);