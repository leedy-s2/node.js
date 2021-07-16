// 테스트 코드
const request = require('supertest');
const should = require("should");
const app = require("../../index.js");
const models = require("../../models");


describe("GET /users는", () => {
  const users = [
    { id: 1, name: "alice" },
    { id: 2, name: "white" },
    { id: 3, name: "hello" },
  ];
  before(() => models.sequelize.sync({ force: true })); // db 싱크 비동기. 테이블 생성
  before(() => models.User.bulkCreate(users)); // 여러 데이터를 입력하는 역할.

  describe("성공 시", () => {
    it("유저 객체를 담은 배열로 응답", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 개수만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    // 접속 전 실패 체크해서 반환하기 때문에 db에 직접 접근하지 않는다.
    it("limit이 숫자형이 아니면 400을 응답한다", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id는", () => {
   const users = [
      { id: 1, name: "alice" },
      { id: 2, name: "white" },
      { id: 3, name: "hello" },
    ];
    before(() => models.sequelize.sync({ force: true })); // db 싱크 비동기. 테이블 생성
    before(() => models.User.bulkCreate(users)); // 여러 데이터를 입력하는 역할.

  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });

    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("Delete /users/:id는", () => {
   const users = [
      { id: 1, name: "alice" },
      { id: 2, name: "white" },
      { id: 3, name: "hello" },
    ];
    before(() => models.sequelize.sync({ force: true })); // db 싱크 비동기. 테이블 생성
    before(() => models.User.bulkCreate(users)); // 여러 데이터를 입력하는 역할.

  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("Post /users는", () => {
   const users = [
      { id: 1, name: "alice" },
      { id: 2, name: "white" },
      { id: 3, name: "hello" },
    ];
    before(() => models.sequelize.sync({ force: true })); // db 싱크 비동기. 테이블 생성
    before(() => models.User.bulkCreate(users)); // 여러 데이터를 입력하는 역할.

  describe("성공시", () => {
    let name = "daniel",
      body;
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다.", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환한다", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});

describe("Put /users/:id", () => {
  const users = [
    { id: 1, name: "alice" },
    { id: 2, name: "white" },
    { id: 3, name: "hello" },
  ];
  before(() => models.sequelize.sync({ force: true })); // db 싱크 비동기. 테이블 생성
  before(() => models.User.bulkCreate(users)); // 여러 데이터를 입력하는 역할.

  describe("성공시", () => {
    it("변경된 name을 응답한다", (done) => {
      const name = "charlie";
      request(app)
        .put("/users/3")
        .send({ name }) // body데이터로 보내주게 됨
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });

    it("파라미터가 없을 경우 400을 응답한다", (done) => {
      request(app).put("/users/1").send({}).expect(400).end(done);
    });
    it("아이디가 없는 유저일 경우 404을 응답한다", (done) => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 409를 응답한다", (done) => {
      request(app)
        .put("/users/2")
        .send({ name: "white" })
        .expect(409)
        .end(done);
    });
  });
});
