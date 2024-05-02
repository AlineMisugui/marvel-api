import MD5 from "crypto-js/md5";
import { PopulateService } from "./populate.service";
import { CreatorDTO } from "../creator/creator.dto";
import creatorRepository from "../creator/creator.schema"
import comicRepository from "../comic/comic.schema"
import characterRepository from "../character/character.schema"
import { ComicDTO } from "../comic/comic.dto";
import { CharacterDTO } from "../character/character.dto";

class PopulateServiceImpl implements PopulateService {

    private eventsURI = "/v1/public/events";

    private originalSinId = 319;

    private comicsURI = `${this.eventsURI}/${this.originalSinId}/comics`;

    private creatorsURI = `${this.eventsURI}/${this.originalSinId}/creators`;

    private charactersURI = `${this.eventsURI}/${this.originalSinId}/characters`;

    constructQueryParams(): string {
        const privateKey = process.env.PRIVATE_KEY || "";
        const publicKey = process.env.PUBLIC_KEY || "";
        const timestamp = Date.now();
        const stringToHash = `${timestamp}${privateKey}${publicKey}`;
        const hash = MD5(stringToHash);
        const queryParams = `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
        return queryParams;
    }

    async getEventOriginalSin(): Promise<any> {
        const url = process.env.BASE_URL + this.eventsURI + this.constructQueryParams() + `&id=${this.originalSinId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async getComics(): Promise<void> {
        const url = process.env.BASE_URL + this.comicsURI + this.constructQueryParams() + "&limit=70";
        const response = await fetch(url);
        const data = await response.json();
        const comicsResume = data.data.results;
        comicsResume.forEach(async (comic: any) => {
            const comicExists = await comicRepository.find({ marvelId: comic.id })
            if (comicExists.length == 0) {
                const newComic: ComicDTO = {
                    marvelId: comic.id,
                    title: comic.title,
                    description: comic.description,
                    publicationDate: comic.dates[0].date,
                    coverImage: comic.thumbnail.path + "." + comic.thumbnail.extension
                }
                await comicRepository.create(newComic)
            }
        });
    }

    async getCreators(): Promise<void> {
        const eventResume = await this.getEventOriginalSin();
        const creatorsResume = eventResume.data.results[0].creators.items;
        creatorsResume.forEach(async (creator: any) => {
            const comics: string[] = [];
            const creatorDetailResponse = await fetch(`${creator.resourceURI}${this.constructQueryParams()}`);
            const creatorDetail = await creatorDetailResponse.json();
            const creatorMarvelId = creatorDetail.data.results[0].id;
            const comicsFromCreator = creatorDetail.data.results[0].comics.items;
            comicsFromCreator.forEach(async (comic: any) => {
                const comicName = comic.name;
                comics.push(comicName)
            });
            const newCreator: CreatorDTO = {
                marvelId: creatorMarvelId,
                name: creator.name,
                role: creator.role,
                comics: comics
            }
            const creatorExists = await creatorRepository.find({ marvelId: creatorMarvelId })
            if (creatorExists.length == 0) {
                await creatorRepository.create(newCreator)
            }
        });
    }

    async getCharacters(): Promise<void> {
        const url = process.env.BASE_URL + this.charactersURI + this.constructQueryParams() + "&limit=50";
        const response = await fetch(url);
        const data = await response.json();
        const charactersResume = data.data.results;
        charactersResume.forEach(async (character: any) => {
            const characterExists = await characterRepository.find({ marvelId: character.id })
            if (characterExists.length == 0) {
                const newCharacter: CharacterDTO = {
                    marvelId: character.id,
                    name: character.name,
                    description: character.description,
                    image: character.thumbnail.path + "." + character.thumbnail.extension,
                }
                await characterRepository.create(newCharacter)
            }
        });
    }
}

export default new PopulateServiceImpl()