import { ComicService } from "./comic.service";
import comicRepository from "./comic.schema";
import { NotFoundException } from "../../../src/exceptions/notFoundException";
import { ComicRequestDTO } from "./comic.dto";

class ComicServiceImpl implements ComicService {
    async getComics(page: number, limit: number): Promise<any> {
        const comics = await comicRepository.find().skip((page - 1) * limit).limit(limit);
        return comics;
    }

    async getComicById(id: string): Promise<any> {
        const comic = await comicRepository.findById(id);
        if (!comic) {
            throw new NotFoundException("Comic not found");
        }
        return comic;
    }

    async createComic(comic: ComicRequestDTO): Promise<any> {
        const newComic = await comicRepository.create(comic);
        return newComic;
    }

    async updateComic(id: string, comic: ComicRequestDTO): Promise<any> {
        const comicFinded = await this.getComicById(id);
        const updatedComicSave = comicFinded.set(comic);
        const updatedComic = await updatedComicSave.save();
        return updatedComic;
    }

    async deleteComic(id: string): Promise<void> {
        const comic = await this.getComicById(id);
        await comicRepository.deleteOne(comic);
    }

    async getComicsOrderedByPublicationDate(page: number, limit: number){
        const comics = await comicRepository.find().sort({ publicationDate: 1 }).skip((page - 1) * limit).limit(limit);
        return comics;
    }
}

export default new ComicServiceImpl();