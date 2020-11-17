const {} = require("lodash");
const app = require("../server");
const request = require("supertest"); //permite probar fácilmente las apis

describe("End point /count", () => {
  const url = "/count";

  describe("The request returns the number of times the end point are called", () => {
    it("The first call return 1", async () => {
      const res = await request(app).get(url);
      expect(res.body.count).toEqual(1);
    });
    it("The second call return 2", async () => {
      const res = await request(app).get(url);
      expect(res.body.count).toEqual(2);
    });
    it("The second call return 3", async () => {
      const res = await request(app).get(url);
      expect(res.body.count).toEqual(3);
    });
  });
  it("The message is success", async () => {
    const res = await request(app).get(url);
    expect(res.body.message).toEqual("success");
  });
  it("The status returned is 200", async () => {
    const res = await request(app).get(url);
    expect(res.body.code).toEqual(200);
  });
});

describe("End point /sum/:numbers", () => {
  const values = "1,2,3.1";
  const url = `/sum/${values}`;

  it("Ignore the params Nan", async () => {
    const values = "a,1,*,2,3.1";
    const url = `/sum/${values}`;
    const res = await request(app).get(url);

    expect(res.body.sum).toEqual(6.1);
  });
  it("sum the numbers passed by url", async () => {
    const res = await request(app).get(url);
    expect(res.body.sum).toEqual(6.1);
  });
  it("The message is success when params are passed ", async () => {
    const res = await request(app).get(url);
    expect(res.body.message).toEqual("success");
  });
  it("The message is 'error, params needed' when params are not passed ", async () => {
    const url = `/sum/`;
    const res = await request(app).get(url);
    expect(res.body.message).toEqual("error, params needed");
  });
  it("The status returned is 200 when params are passed", async () => {
    const res = await request(app).get(url);
    expect(res.body.code).toEqual(200);
  });
});
