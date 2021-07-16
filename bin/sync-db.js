// database를 싱크하는 역할을 하는 모듈

const models = require('../models'); // 모듈 가져오기
models.sequelize.sync({force: true}) // sequelize 객체에 sync 함수 사용
// 파라미터 force : true 는 기존의 db가 있더라도 db를 날리고 새로 만든다는 의미.

module.exports = () =>{ // 함수 export
  return models.sequelize.sync({force : true}) // sync 동작하도록. sync는 내부적으로 promise를 리턴하게 되어  있음.
  // 비동기 처리를 완료할 수 있도로 인터페이스 제공.
}