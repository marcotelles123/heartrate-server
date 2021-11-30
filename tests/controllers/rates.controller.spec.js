const request = require("supertest");
const app = require('../../app');

var token;
beforeAll(async () => {
    var response = await request(app.server).post("/api/auth/signin").send({ "username": "marcotelles123", "password": "" });
    token = response.body.accessToken;
});

describe("Test Rates controller", () => {
    test('GET - Should get rates', async() => {
        const response = await request(app.server)
            .get("/rates")
            .set('x-access-token', token);
    
        expect(response.body[0].rates).toEqual(expect.any(Array));
        expect(response.body[0].obs).toEqual(expect.any(Array));
        expect(response.body[0].date).toEqual(expect.any(String));
        expect(response.status).toBe(200);
    }, 28000);
});

afterAll(async () => {
    app.mongoose.connection.close();
    app.server.close();
});