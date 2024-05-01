import MD5 from "crypto-js/md5";
import { PopulateService } from "./populate.service";

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
        const url = process.env.BASE_URL + this.eventsURI+ this.constructQueryParams() + `&id=${this.originalSinId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async getComics(): Promise<any> {
        const url = process.env.BASE_URL + this.comicsURI + this.constructQueryParams();
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async getCreators(): Promise<any> {
        const url = process.env.BASE_URL + this.creatorsURI + this.constructQueryParams();
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async getCharacters(): Promise<any> {
        const url = process.env.BASE_URL + this.charactersURI + this.constructQueryParams();
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

export default new PopulateServiceImpl()