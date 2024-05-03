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