import { CreatorService } from "./creator.service";
import creatorRepository from "./creator.schema";
import { NotFoundException } from "../../exceptions/notFoundException";
import { CreatorByComicCountResponseDTO, CreatorGroupByRoleResponseDTO, CreatorRequestDTO } from "./creator.dto";

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

    async getCreatorsByComicsCount(page: number, limit: number){
        const creators = await creatorRepository.aggregate([
            { $project: { _id: 1, name: 1, role: 1, comicsCount: { $size: "$comics" } } },
            { $sort: { comicsCount: 1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);

        return creators as CreatorByComicCountResponseDTO[];
    }

    async getCreatorGoupByRole(){
        const creators = await creatorRepository.aggregate([
            { $group: { _id: "$role", creators: { $push: "$$ROOT" } } },
            { $project: { role: "$_id", creators: 1, _id: 0 } },
            { $sort: { role: 1 } }
        ]);
        return creators as CreatorGroupByRoleResponseDTO[];
    }
} 

export default new CreatorServiceImpl();