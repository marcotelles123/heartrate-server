const request = require("supertest");
const app = require('../../app');

var token;
beforeAll(async () => {
    var response = await request(app.server).post("/api/auth/signin").send({ "username": "marcotelles123", "password": "" });
    token = response.body.accessToken;
});

describe("Test Annotation controller", () => {
    test('GET - Should get annotation', async() => {
        const response = await request(app.server)
            .get("/annotation")
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    }, 28000);
});

afterAll(async () => {
    app.mongoose.connection.close();
    app.server.close();
});