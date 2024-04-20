import express from 'express';
import request from 'supertest';
import App from "../../src/services/ExpressApp.js";

const app = express();
await App(app);

describe("Integration tests for tasks related activities", () => {
    it("GET /api/v1/tasks/test - Success - Test", async () => {
        const { body, statusCode } = await request(app).get("/api/v1/tasks/test");
        
        let expectedBody = {
            "message": "Hello World!"
        }
        let expectedStatusCode = 200;

        expect(body).toEqual(expectedBody);
        expect(statusCode).toBe(expectedStatusCode);
    });
})