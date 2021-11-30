const request = require("supertest");
const app = require('../../app');

var token;
beforeAll(async () => {
    var response = await request(app.server).post("/api/auth/signin").send({ "username": "marcotelles123", "password": "" });
    token = response.body.accessToken;
});

describe("Test Lottteries controller", () => {
    test('POST - Should calcule hits', async () => {
        const response = await request(app.server)
            .post("/lottery")
            .send({ "lotterykind": "1", "drawnumbers": ["1","2","4","5"], "concoursenumber": "123" });

        expect(response.status).toBe(200);

        expect(response.body.hits).toEqual(expect.any(Array));
        expect(response.body.hitsCount).toEqual(expect.any(Number));
        expect(response.body.concourseNumber).toEqual(expect.any(Number));
        expect(response.body.concourseDate).toEqual(expect.any(String));
    }, 28000);
});

afterAll(async () => {
    app.mongoose.connection.close();
    app.server.close();
});