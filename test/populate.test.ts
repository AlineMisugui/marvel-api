import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";

describe("Testing populate endpoints", () => {
    it("Must populate the database with comics", async () => {
        const response = await request.default(app).get("/populate/comics")

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Comics were saved on database.")
    }, 10000)

    it("Must populate the database with creators", async () => {
        const response = await request.default(app).get("/populate/creators")

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Creators were saved on database.")
    }, 10000)

    it("Must populate the database with characters", async () => {
        const response = await request.default(app).get("/populate/characters")

        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Characters were saved on database.")
    }, 10000)
})