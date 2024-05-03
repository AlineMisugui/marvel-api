import { CreatorService } from "./creator.service";
import creatorRepository from "./creator.schema";
import { NotFoundException } from "../../exceptions/notFoundException";
import { CreatorRequestDTO } from "./creator.dto";

class CreatorServiceImpl implements CreatorService {
    async getCreators(page: number, limit: number): Promise<any> {
        const creators = await creatorRepository.find().skip((page - 1) * limit).limit(limit);
        return creators;
    }

    async getCreatorById(id: string): Promise<any> {
        const creatorFinded = await creatorRepository.findById(id);
        if (!creatorFinded) {
            throw new NotFoundException("Creator not found");
        }
        return creatorFinded;
    }

    async createCreator(creator: CreatorRequestDTO): Promise<any> {
        const newCreator = await creatorRepository.create(creator);
        return newCreator;
    }

    async updateCreator(id: string, creator: any): Promise<any> {
        const creatorFinded = await this.getCreatorById(id);
        const updatedCreatorSave = creatorFinded.set(creator);
        const updatedCreator = await updatedCreatorSave.save();
        return updatedCreator;
    }

    async deleteCreator(id: string): Promise<void> {
        const creator = await this.getCreatorById(id);
        await creatorRepository.deleteOne(creator);
    }
} 

export default new CreatorServiceImpl();