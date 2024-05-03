import { CreatorRequestDTO } from "../src/domain/creator/creator.dto";
import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";

const creatorMock: CreatorRequestDTO = {
    name: "Creator test",
    role: "Creator test role",
    comics: ["Comic test 1", "Comic test 2"]
}
let creatorId: string;

describe("Testing creator endpoints", () => {
    it("Must insert a creator in the database", async () => {
        const response = await request.default(app).post("/creator").send(creatorMock)

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Creator created successfully")
        creatorId = response.body.data._id
    })

    it("Must return all creators", async () => {
        const response = await request.default(app).get("/creator?page=1&limit=10")

        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body.length).toBeLessThanOrEqual(10)
    })

    it("Must return a creator by id", async () => {
        const response = await request.default(app).get(`/creator/${creatorId}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("_id")
        expect(response.body._id).toEqual(creatorId)
    })

    it("Must update a creator", async () => {
        creatorMock.name = "Creator test updated"
        const response = await request.default(app).put(`/creator/${creatorId}`).send(creatorMock)

        expect(response.status).toEqual(202)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Creator updated successfully")
        expect(response.body.data.name).toEqual("Creator test updated")
    })

    it("Must delete a creator", async () => {
        const response = await request.default(app).delete(`/creator/${creatorId}`)
        const responseGet = await request.default(app).get(`/creator/${creatorId}`)

        expect(response.status).toEqual(204)
        expect(responseGet.status).toEqual(404)
    })
})