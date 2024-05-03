import { ComicRequestDTO } from "./comic.dto";

export interface ComicService {
    getComics(page: number, limit: number): Promise<any>;
    getComicById(id: string): Promise<any>;
    createComic(comic: ComicRequestDTO): Promise<any>;
    updateComic(id: string, comic: ComicRequestDTO): Promise<any>;
    deleteComic(id: string): Promise<void>;
    getComicsOrderedByPublicationDate(page: number, limit: number): Promise<any>;
}