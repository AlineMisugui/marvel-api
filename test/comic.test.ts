import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";
import { ComicRequestDTO } from "src/domain/comic/comic.dto";

const comicMock: ComicRequestDTO = {
    title: "Comic test",
    description: "Comic test description",
    publicationDate: new Date("2024-05-02T04:00:00.000+00:00"),
    coverImage: "https://th.bing.com/th/id/OIP.Agn7z2F3Z3FjL6VisKvRQAHaE7?rs=1&pid=ImgDetMain"
}
let comicId: string;

describe("Testing comic endpoints", () => {
    it("Must insert a comic in the database", async () => {
        const response = await request.default(app).post("/comic").send(comicMock)

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Comic created successfully")

        comicId = response.body.data._id
    })

    it("Must return all comics", async () => {
        const response = await request.default(app).get("/comic?page=1&limit=10")

        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
    })

    it("Must return all comics ordered by publication date", async () => {
        const response = await request.default(app).get("/comic/by-publication-date")
    
        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
        expect(new Date(response.body[0].publicationDate).getTime()).toBeLessThanOrEqual(new Date(response.body[response.body.length - 1].publicationDate).getTime())
    })

    it("Must return a comic by id", async () => {
        const response = await request.default(app).get(`/comic/${comicId}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body._id).toEqual(comicId)
    })

    it("Must update a comic", async () => {
        comicMock.title = "Comic test updated"
        const response = await request.default(app).put(`/comic/${comicId}`).send(comicMock)

        expect(response.status).toEqual(202)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Comic updated successfully")
        expect(response.body.data.title).toEqual("Comic test updated")
    })

    it("Must delete a comic", async () => {
        const response = await request.default(app).delete(`/comic/${comicId}`)
        const responseGet = await request.default(app).get(`/comic/${comicId}`)

        expect(response.status).toEqual(204)
        expect(responseGet.status).toEqual(404)
    })

})