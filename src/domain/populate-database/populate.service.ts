export interface PopulateService {
    constructQueryParams(): string;
    getEventOriginalSin(): Promise<any>;
    getComics(): Promise<void>;
    getCreators(): Promise<void>;
    getCharacters(): Promise<void>;
}