/*!
 * getir-case-study-ok
 * Copyright(c) 2021 Oktay Koçak
 * Do What The F*ck You Want To Public Licensed
 */

const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const MongoDB = require("../utils/mongodb");
var MONGODB = new MongoDB();

beforeAll(() => {
  return MONGODB.createConnection();
});

afterAll(() => {
  return MONGODB.closeConnection();
});

describe("/records", () => {
  it("Successful request => Should respond with 200 and code 1", () => {
    return request
      .post("/records")
      .send({
        startDate: "2016-01-28",
        endDate: "2017-12-02",
        minCount: 6000,
        maxCount: 8000,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.code).toEqual(0);
        expect(res.body.msg).toEqual("Success");
      });
  });

  it("Successful request => Should respond with 200 and code 1. ", () => {
    return request
      .post("/records")
      .send({
        startDate: "2016-01-28",
        endDate: "2017-12-02",
        minCount: 6000,
        maxCount: 8000,
      })
      .then((res) => {
        res.body.records.forEach((record) => {
          const createdAt = new Date(record.createdAt);
          const startDate = new Date("2016-01-28");
          const endDate = new Date("2017-12-02");
          expect(createdAt.getTime()).toBeGreaterThanOrEqual(
            startDate.getTime()
          );
          expect(createdAt.getTime()).toBeLessThanOrEqual(endDate.getTime());
          expect(record.totalCount).toBeGreaterThanOrEqual(6000);
          expect(record.totalCount).toBeLessThanOrEqual(8000);
        });
      });
  });

  it("Missing body request => Should respond with 400 and code 3", () => {
    return request
      .post("/records")
      .send(null)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.code).toEqual(3);
      });
  });

  it("Missing or null parameters => Should respond with 400 and code 3", () => {
    return request
      .post("/records")
      .send({
        startDate: "2016-10-20",
        endDate: null,
        minCount: 1000,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.code).toEqual(3);
      });
  });

  it("Invalid parameters => Should respond with 400 and code 4", () => {
    return request
      .post("/records")
      .send({
        startDate: "2016-01-28aaa",
        endDate: "2016-21-28",
        minCount: -2345,
        maxCount: "8000",
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.code).toEqual(4);
      });
  });

  it("Illogical request parameters (minCount is bigger than maxCount or if startDate comes after endDate) => Should respond with 400 and code 5", () => {
    return request
      .post("/records")
      .send({
        startDate: "2017-01-28",
        endDate: "2016-11-28",
        minCount: 12345,
        maxCount: 8000,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.code).toEqual(5);
      });
  });

  it("Method not allowed => Should respond with 404 and code 3", () => {
    return request
      .get("/records")
      .send({
        startDate: "2017-01-28",
        endDate: "2016-11-28",
        minCount: 12345,
        maxCount: 8000,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.code).toEqual(3);
      });
  });

  it("Path not found => Should respond with 404 and code 2", () => {
    return request
      .post("/some-path")
      .send({
        startDate: "2017-01-28",
        endDate: "2016-11-28",
        minCount: 12345,
        maxCount: 8000,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.code).toEqual(2);
      });
  });
});
