import { CreatorRequestDTO } from "./creator.dto";

export interface CreatorService {
    getCreators(page: number, limit: number): Promise<any>;
    getCreatorById(id: string): Promise<any>;
    createCreator(creator: CreatorRequestDTO): Promise<any>;
    updateCreator(id: string, creator: CreatorRequestDTO): Promise<any>;
    deleteCreator(id: string): Promise<void>;
}