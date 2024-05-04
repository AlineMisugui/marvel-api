import { CharacterService } from "./character.service";
import characterRepository from "./character.schema"
import { NotFoundException } from "../../exceptions/notFoundException";
import { CharacterRequestDTO } from "./character.dto";

class CharaterServiceImpl implements CharacterService {

    async getCharacter(page: number, limit: number): Promise<any> {
        const character = await characterRepository.find().skip((page - 1) * limit).limit(limit);
        return character;
    }

    async getCharacterById(id: string): Promise<any> {
        const character = await characterRepository.findById(id);
        if (!character) {
            throw new NotFoundException("Character not found");
        }
        return character;
    }

    async createCharacter(character: CharacterRequestDTO): Promise<any> {
        const newCharacter = await characterRepository.create(character);
        return newCharacter;
    }

    async updateCharacter(id: string, character: CharacterRequestDTO): Promise<any> {
        const characterFinded = await this.getCharacterById(id);
        const updatedCharacterSave = characterFinded.set(character);
        const updatedCharacter = await updatedCharacterSave.save();
        return updatedCharacter;
    }

    async deleteCharacter(id: string): Promise<void> {
        const character = await this.getCharacterById(id);
        await characterRepository.deleteOne(character);
    }

    async getCharacterOrderedByNameLenght(page: number, limit: number): Promise<any>{
        const characters = await characterRepository.aggregate([
            { 
                $addFields: { 
                    nameLength: { $strLenCP: "$name" } 
                } 
            },
            { $sort: { nameLength: 1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);
        return characters;
    }

    async getCharacterOrganizeByImageType(page: number, limit: number): Promise<any> {
        const extensions = ["jpg", "jpeg", "png", "gif", "svg", "webp"];
        // se não tiver uma das extensões acima, o valor será unknown

        const characters = await characterRepository.aggregate([
            {$addFields: {
                    imageExtension: { $split: ["$image", "."] }}},
            {$addFields: {
                    imageExtension: { $arrayElemAt: ["$imageExtension", -1] }}},
            {$addFields: {
                    imageExtension: { $cond: { if: { $in: ["$imageExtension", extensions] } , then: "$imageExtension", else: "unknown extension" } }}},
            {$group: {
                    _id: "$imageExtension", 
                    characters: { $push: "$$ROOT" }}},
            {$skip: (page - 1) * limit},
            {$limit: limit}
        ]);
        return characters;
    }

}

export default new CharaterServiceImpl();