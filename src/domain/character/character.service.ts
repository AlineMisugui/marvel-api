import { CharacterRequestDTO } from "./character.dto";

export interface CharacterService {
    getCharacter(page: number, limit: number): Promise<any>;
    getCharacterById(id: string): Promise<any>;
    createCharacter(character: CharacterRequestDTO): Promise<any>;
    updateCharacter(id: string, character: CharacterRequestDTO): Promise<any>;
    deleteCharacter(id: string): Promise<void>;
}