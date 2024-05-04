import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";
import { CharacterRequestDTO } from "../src/domain/character/character.dto";

const characterMock: CharacterRequestDTO = {
    name: "Character test",
    description: "Character test description",
    image: "https://th.bing.com/th/id/OIP.Agn7z2F3Z3FjL6VisKvRQAHaE7?rs=1&pid=ImgDetMain.jpg"
}
let characterId: string;

describe("Testing character endpoints", () => {
    it("Must insert a character in the database", async () => {
        const response = await request.default(app).post("/character").send(characterMock)

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Character created successfully")
        characterId = response.body.data._id
    })

    it("Must return all characters", async () => {
        const response = await request.default(app).get("/character?page=1&limit=10")

        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
    })

    it("Must return all characters ordered by name length", async () => {
        const response = await request.default(app).get("/character/by-name-lenght")

        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
        expect(response.body[0].name.length).toBeLessThanOrEqual(response.body[response.body.length - 1].name.length)
    })

    it("Must return all characters ordered by image type", async () => {
        const response = await request.default(app).get("/character/ordered-by-image-type")
    
        const allowedImageTypes = ["jpg", "jpeg", "png", "gif", "svg", "webp", "unknown extension"];
        const imageType = response.body[0]._id.split('.').pop();
    
        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
        expect(allowedImageTypes).toContain(imageType)
    })

    it("Must return a character by id", async () => {
        const response = await request.default(app).get(`/character/${characterId}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body._id).toEqual(characterId)
    })

    it("Must update a character", async () => {
        characterMock.name = "Character test updated"
        const response = await request.default(app).put(`/character/${characterId}`).send(characterMock)

        expect(response.status).toEqual(202)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Character updated successfully")
        expect(response.body.data.name).toEqual("Character test updated")
    })

    it("Must delete a character", async () => {
        const response = await request.default(app).delete(`/character/${characterId}`)
        const responseGet = await request.default(app).get(`/character/${characterId}`)

        expect(response.status).toEqual(204)
        expect(responseGet.status).toEqual(404)
    })
})