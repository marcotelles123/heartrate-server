const request = require("supertest");
const app = require('../../app');

var token;
beforeAll(async () => {
    var response = await request(app.server).post("/api/auth/signin").send({ "username": "marcotelles123", "password": "" });
    token = response.body.accessToken;
});

describe("Test Bills controller", () => {
    test('GET - Should get bills', async() => {
        const response = await request(app.server)
            .get("/bills")
            .set('x-access-token', token);
            
        expect(response.status).toBe(200);
        expect(response.body[0].bill).toEqual(expect.any(String));
        expect(response.body[0].dueDate).toEqual(expect.any(Number));
        expect(response.body[0].paid).toEqual(expect.any(Boolean));
    }, 28000);
});

afterAll(async () => {
    app.mongoose.connection.close();
    app.server.close();
});