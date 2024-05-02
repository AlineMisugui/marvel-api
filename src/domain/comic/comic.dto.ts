export interface ComicDTO {
    marvelId: string;
    title: string;
    description: string;
    publicationDate: Date;
    coverImage: string;
}

export interface ComicRequestDTO {
    title: string;
    description: string;
    publicationDate: Date;
    coverImage: string;
}