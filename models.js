const Sequelize = require("sequelize"); // 클래스
const sequelize = new Sequelize({
  // 객체 생성
  dialect: "sqlite",
  storage: "./db.sqlite", // 파일로 저장할 경로명
  logging: false, //console.log 함수와 바인딩되어 있음.
});

const User = sequelize.define("User", {
  name: {
    type: Sequelize.STRING, // varchar 255 생성
    unique: true,
  },
});
// User모델 정의(define)
// 파라미터 : 테이블명, 속성 정의(id 자동 생성)

module.exports = { Sequelize, sequelize, User };
// sqlite db에 테이블을 만들기 : sync 함수
