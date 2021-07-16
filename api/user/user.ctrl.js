// api 로직.  컨트롤러 로직만 담당

// var users = [
//   { id: 1, name: "alice" },
//   { id: 2, name: "white" },
//   { id: 3, name: "hello" },
// ]; // 메모리상의 데이터. 기존 데이터의 변경사항을 저장할 수 없음. 그래서 DB를 사용하는 것

const models = require("../../models");

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  models.User.findAll({
    limit: limit // 조건 걸어주기
  }) // 조건을 파라미터로 주게 됨.
    .then((users) => {
      //promise 안의 콜백 함수의 parameter로 user객체를 반환받을 수 있다.
      res.json(users); // 반환
    });
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end(); // 숫자가 아니면 400 에러

  models.User.findOne({
    where: {id}
  }).then(user=>{ // 돌아오는 값을 user로 잡음
  if (!user) return res.status(404).end();
    res.json(user);
  })
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  models.User.destroy({
    where:{id}
  }).then(()=>{ // 콜백함수
  res.status(204).end();
  })
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();
 // const isDuplicate = users.filter((user) => user.name === name).length;

  models.User.create({ name })
    .then((user) => {
      // 만든 user 객체 응답
      res.status(201).json(user);
    }) // db에서 알아서 id를 다 만들어줌.

    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).end();
      }
      res.status(500).end(); // 서버 internal error
    });
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end(); // 정수 아닌 파라미터
  
  const name = req.body.name;
  if (!name) return res.status(400).end(); // 파라미터가 비어 있을 때

  models.User.findOne({where:{id}}) // 바로 업데이트 메소드를 써도 되지만 
  .then(user=>{
    if(!user) return res.status(404).end(); // 오버된 인덱스가 있을 때
    if(user.name === name) return res.status(409).end();

    user.name = name;
    user.save() // save 쿼리 시행 => 저장 시 user로 값 넘어옴. 
    .then(_=>{
        res.json(user);
              console.log(user.name + "" + name);

    })
    .catch(err=>{ // save 시행되지 못했을 경우
        return res.status(500).end();
    });
});
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update,
};
