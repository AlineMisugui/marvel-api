export interface PopulateService {
    constructQueryParams(): string;
    getEventOriginalSin(): Promise<any>;
    getComics(): Promise<any>;
    getCreators(): Promise<any>;
    getCharacters(): Promise<any>;
}