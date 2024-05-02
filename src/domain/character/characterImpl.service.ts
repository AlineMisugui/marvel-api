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

}

export default new CharaterServiceImpl();