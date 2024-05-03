export interface CreatorDTO {
    marvelId: string;
    name: string;
    role: string;
    comics: string[];
}

export interface CreatorRequestDTO {
    name: string;
    role: string;
    comics: string[];
}

export interface CreatorByComicCountResponseDTO {
    _id: string;
    name: string;
    role: string;
    comicsCount: number;
}

export interface CreatorGroupByRoleResponseDTO {
    role: string;
    creators: CreatorDTO[];
}