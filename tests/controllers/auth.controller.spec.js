const request = require("supertest");
const app = require('../../app');

describe("Test Auth controller", () => {
    test('POST - Should login succesfully', async () => {
        const response = await request(app.server)
            .post("/api/auth/signin")
            .send({ "username": "marcotelles123", "password": "" });

        expect(response.status).toBe(200);
        expect(response.body.accessToken).not.toBe('');
    }, 28000);

    test('POST - Should return error with wrong password', async () => {
        const response = await request(app.server)
            .post("/api/auth/signin")
            .send({ "username": "marcotelles123", "password": "1" });
        console.log(response.error);
        expect(response.error.status).toBe(401);
        expect(response.error.text).toMatch(/(Invalid Password!)/i)
    }, 28000);
});

afterAll(async () => {
    app.mongoose.connection.close();
    app.server.close();
});